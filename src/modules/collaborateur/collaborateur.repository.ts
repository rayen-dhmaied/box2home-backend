import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { hash } from "bcrypt";

@Injectable()
export class CollaborateurRepository {
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
                    }
                }
            }else{
                query = {
                    where:{
                        OR : [
                            {id : {equals : +searchString}},
                            {tentative : {equals : +searchString}}
                        ]
                        
                    }
                }
            }
        }

        if(typeof cursor === 'undefined' || isNaN(cursor)){
            const default_cursor = await this.prisma.$queryRaw`SELECT MAX(id) FROM collaborateur;`
            cursor = {id :default_cursor[0]['MAX(id)']}
        }else{
            cursor = { id: cursor}
        }

        if(typeof take === 'undefined' || isNaN(take)){
            take = 50
        }

        const result =  await this.prisma.collaborateur.findMany({
            ...query,
            take,
            cursor,
            orderBy: {
                id: 'desc'
            }
        })

        if(result.length===0){
            throw new HttpException('Collaborateur non trouvé!', HttpStatus.NOT_FOUND)
        }

        return { data : result, count: await this.prisma.collaborateur.count({...query})}
        
    }

    async findByLogin(login: string){
        return await this.prisma.collaborateur.findUnique({
            where:{login}
        })
    }

    async findByID(id: number){
        return await this.prisma.collaborateur.findUnique({
            where:{id}
        })
    }

    async createOne(record: any){
        record.password = await hash(record.password,8)
        return  await this.prisma.collaborateur.create({
            data:record
        })
    }

    async deleteOne(id: number){
        return  await this.prisma.collaborateur.delete({
            where:{id},
        })
    }
    
    async updateOne(id: number, record: any){
        if(record.password){
            record.password = await hash(record.password,8)
        }
        return  await this.prisma.collaborateur.update({
            where:{id},
            data:record
        })
    }
}