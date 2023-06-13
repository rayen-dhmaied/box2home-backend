import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { hash } from "bcrypt";

@Injectable()
export class ChauffeurRepository {
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
                        code : {search :searchString},
                        device_info : {search :searchString},
                        role : {search :searchString},
                    }
                }
            }else{
                query = {
                    where:{
                        OR:[
                            {id : {equals : +searchString}},
                            {premium_id : {equals : +searchString}},
                            {etat : {equals : +searchString}},
                            {societe_id : {equals : +searchString}},
                            {current_vehicule : {equals : +searchString}},
                            {on_duty : {equals : +searchString}}
                        ]
                    }
                }
            }
        }

        if(typeof cursor === 'undefined' || isNaN(cursor)){
            const default_cursor = await this.prisma.$queryRaw`SELECT MAX(id) FROM chauffeur;`
            cursor = {id :default_cursor[0]['MAX(id)']}
        }else{
            cursor = { id: cursor}
        }

        if(typeof take === 'undefined' || isNaN(take)){
            take = 50
        }

        const result =  await this.prisma.chauffeur.findMany({
            ...query,
            take,
            cursor,
            orderBy: {
                id: 'desc'
            }
        })

        if(result.length===0){
            throw new HttpException('Chauffeur not found!', HttpStatus.NOT_FOUND)
        }

        return { data : result, count: await this.prisma.chauffeur.count({...query})}
        
    }

    async findByID(id: number){
        return await this.prisma.chauffeur.findUnique({
            where:{id}
        })
    }

    async createOne(record: any){
        record.password = await hash(record.password,8)
        return  await this.prisma.chauffeur.create({
            data:record
        })
    }

    async deleteOne(id: number){
        return  await this.prisma.chauffeur.delete({
            where:{id},
        })
    }
    
    async updateOne(id: number, record: any){
        if(record.password){
            record.password = await hash(record.password,8)
        }
        return  await this.prisma.chauffeur.update({
            where:{id},
            data:record
        })
    }
}