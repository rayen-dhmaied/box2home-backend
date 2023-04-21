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
                query = {
                    where:{
                        login : {search :searchString},
                        firstname : {search :searchString},
                        lastname : {search :searchString},
                    }
                }
            }else{
                query = {
                    where:{
                        id : {equals : +searchString}
                    }
                }
            }
        }

        if(typeof cursor === 'undefined' || isNaN(cursor)){
            const default_cursor = await this.prisma.chauffeur.findFirst({select : {id : true}})
            cursor = default_cursor
        }else{
            cursor = { id: cursor}
        }

        if(typeof take === 'undefined' || isNaN(take)){
            take = 50
        }

        const result =  await this.prisma.chauffeur.findMany({
            ...query,
            take,
            cursor
        })

        if(result.length===0){
            throw new HttpException('Chauffeur not found!', HttpStatus.NOT_FOUND)
        }

        return { data : result, count: await this.prisma.chauffeur.count()}
        
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

    // async searchByString(ss : string){
    //     const result =  await this.prisma.collaborateur.findMany({
    //         where:{
    //                 login : {search :ss},
    //                 firstname : {search :ss},
    //                 lastname : {search :ss},
    //         }
    //     })

    //     if(result.length===0){
    //         throw new HttpException('Collaborateur not found!', HttpStatus.NOT_FOUND)
    //     }

    //     return result
    // }
}