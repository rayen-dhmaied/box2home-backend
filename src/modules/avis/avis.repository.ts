import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AvisRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findMany(searchString?: string, cursor? : any, take? : number){
        let query = {}
        if(typeof searchString !== 'undefined' && searchString.trim().length>0){
            if(isNaN(+searchString)){
                searchString.replace('"','')
                query = {
                    where:{
                        commentaire : {search :searchString},
                        id_review_product_avis_verifie : {search :searchString},
                        commentaire_commande : {search :searchString},
                        id_review_site_avis_verifie : {search :searchString},
                    }
                }
            }else{
                query = {
                    where:{
                        OR:[
                            {id : {equals : +searchString}},
                            {chauffeur_id : {equals : +searchString}},
                            {client_id : {equals : +searchString}},
                            {nombre_etoile : {equals : +searchString}},
                            {course_id : {equals : +searchString}},
                            {nombre_etoile_commande : {equals : +searchString}}
                        ]
                    }
                }
            }
        }

        if(typeof cursor === 'undefined' || isNaN(cursor)){
            const default_cursor = await this.prisma.$queryRaw`SELECT MAX(id) FROM avis;`
            cursor = {id :default_cursor[0]['MAX(id)']}
        }else{
            cursor = { id: cursor}
        }

        if(typeof take === 'undefined' || isNaN(take)){
            take = 50
        }

        const result =  await this.prisma.avis.findMany({
            ...query,
            take,
            cursor,
            orderBy: {
                id: 'desc'
            }
        })

        if(result.length===0){
            throw new HttpException('Avis not found!', HttpStatus.NOT_FOUND)
        }

        return { data : result, count: await this.prisma.avis.count({...query})}
        
    }

    async findByID(id: number){
        return await this.prisma.avis.findUnique({
            where:{id}
        })
    }

    async createOne(record: any){
        return  await this.prisma.avis.create({
            data:record
        })
    }

    async deleteOne(id: number){
        return  await this.prisma.avis.delete({
            where:{id},
        })
    }
    
    async updateOne(id: number, record: any){
        return  await this.prisma.avis.update({
            where:{id},
            data:record
        })
    }
}