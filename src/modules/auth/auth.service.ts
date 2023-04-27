import {HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CollaborateurService } from '../collaborateur/collaborateur.service'
import { JwtService } from '@nestjs/jwt'
import {compare} from 'bcrypt'
import { OAuth2Client } from 'google-auth-library';

const googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
);

@Injectable()
export class AuthService {
    constructor(
        private collaborateur: CollaborateurService,     
        private JwtService: JwtService
    ) {}

    async validateCollaborateur(login: string, password: string){
        const fetched_collaborateur = await this.collaborateur.findByLogin(login)
        if(fetched_collaborateur){
            const isMatch = await compare(password,fetched_collaborateur.password)
            if(isMatch){
                return fetched_collaborateur
            }else{
                return null
            }
        }
        return null
    }

    async googleLogin(token : string){
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const fetched_collaborateur = await this.collaborateur.findByLogin(ticket.getPayload().email)
        if(!fetched_collaborateur){
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
        }
        return this.login(fetched_collaborateur)
    }

    async login(collaborateur: any) {
        const payload = { login: collaborateur.login, sub: collaborateur.id, is_admin: collaborateur.is_admin, role : collaborateur.role }
        const current_user = {
            login : collaborateur.login,
            firstname : collaborateur.firstname,
            lastname : collaborateur.lastname,
            is_admin : collaborateur.is_admin,
            role : collaborateur.role
        }
        return {access_token: this.JwtService.sign(payload),current_user}
    }

    async validateRole(user: any){
        const collaborateur = await this.collaborateur.findByID(user.id.toString())
        if (collaborateur.is_admin === user.is_admin && collaborateur.role === user.role){
            return true
        }
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }

}
