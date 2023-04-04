import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { hash } from "bcrypt";

@Injectable()
export class CollaborateurRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(){
        return  await this.prisma.collaborateur.findMany({
        })
    }

    async findByLogin(login: string){
        return await this.prisma.collaborateur.findUniqueOrThrow({
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

}