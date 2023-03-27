import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CollaboratorDto } from './dto/Collaborator.dto';
import { UpdateCollaboratorDto } from './dto/UpdateCollaborator.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class CollaboratorRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createCollaborator(collaborator : CollaboratorDto) {
        collaborator.password = await bcrypt.hash(collaborator.password,8)
        return await this.prisma.collaborator.create({
            data:collaborator,
        })
    }

    async findCollaborator(email : string){
        return  await this.prisma.collaborator.findUnique({
            where:{email}
        })
    }

    async updateCollaborator(id:string,collaborator: UpdateCollaboratorDto){
        if(collaborator.password){
            collaborator.password = await bcrypt.hash(collaborator.password,8)
        }
        return  await this.prisma.collaborator.update({
            where:{id:+id},
            data: collaborator
        })
    }

    async deleteCollaborator(id: string){
        return  await this.prisma.collaborator.delete({
            where:{id:+id}
        })
    }

    async findAll(){
        return  await this.prisma.collaborator.findMany()
    }
}
