import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { hash } from "bcrypt";

@Injectable()
export class ClientRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findMany(searchString?: string, cursor? : any, take? : number){
        let query = {}
        if(typeof searchString !== 'undefined' && searchString.trim().length>0){
            if(isNaN(+searchString)){
                searchString.replace('"','')
                query = {
                    where:{
                        login : {search :searchString},
                        firstname : {search :searchString},
                        lastname : {search :searchString},
                        phone : {search :searchString},
                        adresse_facturation : {search :searchString},
                        mail : {search :searchString},
                        reputation : {search :searchString},
                    }
                }
            }else{
                query = {
                    where:{
                        OR: [
                            {id : {equals : +searchString}},
                            {societe_id : {equals : +searchString}}
                        ]
                    }
                }
            }
        }

        if(typeof cursor === 'undefined' || isNaN(cursor)){
            const default_cursor = await this.prisma.$queryRaw`SELECT MAX(id) FROM client;`
            cursor = {id :default_cursor[0]['MAX(id)']}
        }else{
            cursor = { id: cursor}
        }

        if(typeof take === 'undefined' || isNaN(take)){
            take = 50
        }

        const result =  await this.prisma.client.findMany({
            ...query,
            take,
            cursor,
            orderBy: {
                id: 'desc'
            }
        })

        if(result.length===0){
            throw new HttpException('Client not found!', HttpStatus.NOT_FOUND)
        }

        return { data : result, count: await this.prisma.client.count({...query})}
        
    }

    async findByID(id: number){
        return await this.prisma.client.findUnique({
            where:{id}
        })
    }

    async createOne(record: any){
        record.password = await hash(record.password,8)
        return  await this.prisma.client.create({
            data:record
        })
    }

    async deleteOne(id: number){
        return  await this.prisma.client.delete({
            where:{id},
        })
    }
    
    async updateOne(id: number, record: any){
        if(record.password){
            record.password = await hash(record.password,8)
        }
        return  await this.prisma.client.update({
            where:{id},
            data:record
        })
    }
}