import {Injectable } from '@nestjs/common'
import { CollaboratorService } from '../collaborator/collaborator.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private CollaboratorService: CollaboratorService,     
        private JwtService: JwtService
    ) {}

    async validateCollaborator(email: string, password: string){
        const fetched_collaborator = await this.CollaboratorService.findCollaborator(email)
        if(fetched_collaborator){
            const isMatch = await bcrypt.compare(password,fetched_collaborator.password)
            if(isMatch){
                delete fetched_collaborator.password
                delete fetched_collaborator.createdAt
                delete fetched_collaborator.updatedAt
                
                return fetched_collaborator
            }else{
                return null
            }
        }
        return null
    }

    async login(collaborator: any) {
        const payload = { email: collaborator.email, sub: collaborator.id, role: collaborator.role, admin: collaborator.admin }
        return {access_token: this.JwtService.sign(payload)}
    }

}
