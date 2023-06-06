import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsRepository {
    constructor(private readonly prisma: PrismaService) {}

    async collaborateurAnalytics() {
        const adminCount = await this.prisma.collaborateur.count({
            where: {
              is_admin: true
            }
          });
          
        const nonAdminCount = await this.prisma.collaborateur.count({
            where: {
              is_admin: false
            }
          });

        return {'admin' : adminCount, 'non_admin' : nonAdminCount};
    }

    async avisAnalytics() {
        const avisCounts = await this.prisma.avis.groupBy({
            by: ['nombre_etoile'],
            _count: {
              nombre_etoile: true,
            },
          });
          
        return avisCounts.reduce((acc, group) => {
            acc[group.nombre_etoile] = {nombre_etoile : group.nombre_etoile, count : group._count.nombre_etoile};
            return acc;
        }, []);
    }

    async canalVenteAnalytics () {
        const commandCounts = await this.prisma.commande.groupBy({
            by: ['canal_vente_id'],
            _count: {
              canal_vente_id: true
            },
            orderBy: {
                _count: {
                  canal_vente_id: 'desc'
                }
              },
            take: 5
          });
          
        const canalVenteIds = commandCounts.map((group) => group.canal_vente_id);
        const canal_vente = await this.prisma.canal_vente.findMany({
            select : {
                id : true,
                name : true},
            where: {
                id: {
                    in: canalVenteIds
                }
            }
        });

        const canal_venteMap = {};
        canal_vente.forEach((canal_vente) => {
            canal_venteMap[canal_vente.id] = canal_vente.name;
        });

        const final_result = []

        commandCounts.forEach((group) => {
            const count = group._count.canal_vente_id
            final_result.push({name : canal_venteMap[group.canal_vente_id], count })
        });

        return final_result
    }

    async courseAnalytics() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const count = await this.prisma.course.count({
        where: {
            created_at: {
            gte: today,
            },
        },
        });

        return count
    }


    async chauffeurAnalytics() {
        const currentYear = new Date().getFullYear();

        const mostActiveChauffeurThisYear = await this.prisma.course.groupBy({
            by: ['chauffeur_id'],
            _count: {
                chauffeur_id: true
            },
            where: {
                created_at: {
                    gte: new Date(currentYear, 0, 1)
                }
            },
            orderBy: {
                _count: {
                    chauffeur_id: 'desc'
                }
            },
            take: 3
        })

        const chauffeurIds = mostActiveChauffeurThisYear.map((group) => group.chauffeur_id);
        const chauffeur = await this.prisma.chauffeur.findMany({
            select : {
                id : true,
                firstname : true,
                lastname : true,
            },
            where: {
                id: {
                    in: chauffeurIds
                }
            }
        });

        const chauffeurMap = {};
        chauffeur.forEach((chauffeur) => {
            chauffeurMap[chauffeur.id] = chauffeur.firstname+' '+chauffeur.lastname;
        });

        const this_year = []

        mostActiveChauffeurThisYear.forEach((group) => {
            const count = group._count.chauffeur_id
            this_year.push({id : group.chauffeur_id, name : chauffeurMap[group.chauffeur_id], count}) 
        });

        const mostActiveChauffeurLastYear = await this.prisma.course.groupBy({
            by: ['chauffeur_id'],
            _count: {
                chauffeur_id: true
            },
            where: {
                created_at: {
                    lte: new Date(currentYear, 0, 1),
                    gte: new Date(currentYear-1, 0, 1)
                }
            },
            orderBy: {
                _count: {
                    chauffeur_id: 'desc'
                }
            },
            take: 3
        })

        const chauffeurIds2 = mostActiveChauffeurLastYear.map((group) => group.chauffeur_id);
        const chauffeur2 = await this.prisma.chauffeur.findMany({
            select : {
                id : true,
                firstname : true,
                lastname : true,
            },
            where: {
                id: {
                    in: chauffeurIds2
                }
            }
        });

        const chauffeurMap2 = {};
        chauffeur2.forEach((chauffeur) => {
            chauffeurMap2[chauffeur.id] = chauffeur.firstname+' '+chauffeur.lastname;
        });

        const last_year = []

        mostActiveChauffeurLastYear.forEach((group) => {
            const count = group._count.chauffeur_id
            last_year.push({id : group.chauffeur_id, name : chauffeurMap2[group.chauffeur_id], count}) 
        });

        return {this_year,last_year}
    }


    async commandeAnalytics() {
        const monthsOrdered : any =  await this.prisma.$queryRaw`SELECT MONTH(created_at) AS month, COUNT(*) AS count
        FROM commande
        WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 MONTH)
        GROUP BY MONTH(created_at)
        ORDER BY MONTH(created_at) asc`

        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear(); 

        let final_result = {}

        monthsOrdered.forEach((group)=>{
            final_result[group.month.toString()] = Number(group.count)
        })

        final_result = Object.entries(final_result)
        .map(([key, count]) => ({
            month: parseInt(key),
            year: parseInt(key) <= currentMonth ? currentYear : currentYear - 1,
            count
        }))
        .sort((a, b) => {
            if (a.year !== b.year) {
            return b.year - a.year
            } else {
            return b.month - a.month
            }
        })

        return final_result
    }
}