import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CommandeRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findMany(searchString?: string, cursor? : any, take? : number){
        let query = {}
        if(typeof searchString !== 'undefined' && searchString.trim().length>0){
            if(isNaN(+searchString)){
                searchString.replace('"','')
                query = {
                    where:{
                    }
                }
            }else{
                query = {
                    where:{
                        OR :[
                            {id : {equals : +searchString}},
                            {canal_vente_id : {equals : +searchString}},
                            {facture_id : {equals : +searchString}},
                            {client_id : {equals : +searchString}},
                        ]
                    }
                }
            }
        }

        if(typeof cursor === 'undefined' || isNaN(cursor)){
            const default_cursor = await this.prisma.$queryRaw`SELECT MAX(id) FROM commande;`
            cursor = {id :default_cursor[0]['MAX(id)']}
        }else{
            cursor = { id: cursor}
        }

        if(typeof take === 'undefined' || isNaN(take)){
            take = 50
        }

        const result =  await this.prisma.commande.findMany({
            ...query,
            take,
            cursor,
            orderBy: {
                id: 'desc'
            }
        })

        if(result.length===0){
            throw new HttpException('Commande not found!', HttpStatus.NOT_FOUND)
        }

        return { data : result, count : await this.prisma.commande.count({...query})}
        
    }

    async findByID(id: number){
        return await this.prisma.commande.findUnique({
            where:{id}
        })
    }

    async createOne(record: any){
        return  await this.prisma.commande.create({
            data:record
        })
    }

    async deleteOne(id: number){
        return  await this.prisma.commande.delete({
            where:{id},
        })
    }
    
    async updateOne(id: number, record: any){
        return  await this.prisma.commande.update({
            where:{id},
            data:record
        })
    }
}