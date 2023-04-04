import {Injectable } from '@nestjs/common'
import { CollaborateurService } from '../collaborateur/collaborateur.service'
import { JwtService } from '@nestjs/jwt'
import {compare} from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private collaborateur: CollaborateurService,     
        private JwtService: JwtService
    ) {}

    async validateCollaborateur(login: string, password: string){
        const fetched_collaborator = await this.collaborateur.findByLogin(login)
        if(fetched_collaborator){
            const isMatch = await compare(password,fetched_collaborator.password)
            if(isMatch){
                return fetched_collaborator
            }else{
                return null
            }
        }
        return null
    }

    async login(collaborateur: any) {
        const payload = { login: collaborateur.login, sub: collaborateur.id, admin: collaborateur.is_admin }
        return {access_token: this.JwtService.sign(payload)}
    }

}
