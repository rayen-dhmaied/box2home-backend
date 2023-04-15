import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { hash } from "bcrypt";

@Injectable()
export class CollaborateurRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(cursor? : any, take? : number){
        if(typeof cursor === 'undefined' || isNaN(cursor)){
            const default_cursor = await this.prisma.collaborateur.findFirst({select : {id : true}})
            cursor = default_cursor
        }
        if(typeof take === 'undefined' || isNaN(take)){
            take = 100
        }
        return  await this.prisma.collaborateur.findMany({
            take,
            skip : 1,
            cursor
        })
        
    }

    async findByLogin(login: string){
        return await this.prisma.collaborateur.findUnique({
            where:{login}
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

    async searchByString(ss : string){
        const result =  await this.prisma.collaborateur.findMany({
            where:{
                    login : {search :ss},
                    firstname : {search :ss},
                    lastname : {search :ss},
            }
        })

        if(result.length===0){
            throw new HttpException('Collaborateur not found!', HttpStatus.NOT_FOUND)
        }

        return result
    }
}