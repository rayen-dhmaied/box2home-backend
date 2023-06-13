import {HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CollaborateurService } from '../collaborateur/collaborateur.service'
import { JwtService } from '@nestjs/jwt'
import {compare} from 'bcrypt'
import { OAuth2Client } from 'google-auth-library';
import { MailerService } from '@nestjs-modules/mailer';
import * as path from 'path';
import * as fs from 'fs'
import handlebars from 'handlebars';

const googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
);

@Injectable()
export class AuthService {
    constructor(
        private collaborateur: CollaborateurService,     
        private JwtService: JwtService,
        private mailerService : MailerService
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
            this.collaborateur.updateOne(collaborateur.id.toString(), {last_time_logged : new Date().toISOString()})
            return true
        }
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }

    async sendResetPwEmail(email: string){
        const fetched_collaborateur = await this.collaborateur.findByLogin(email)
        if(fetched_collaborateur){
            const token = this.JwtService.sign({id: fetched_collaborateur.id}, {
                secret : process.env.JWT_PW_RESET_SECRET,
                expiresIn : process.env.JWT_PW_RESET_EXP
            })
            const source = fs.readFileSync(path.join(__dirname, "../../reset-password.hbs"), "utf8")
            const template = handlebars.compile(source)
            await this.mailerService.sendMail({
                to:email,
                from: process.env.FROM_EMAIL,
                subject: 'Réinitialiser votre mot de passe',
                html : template({name : fetched_collaborateur.firstname, token})
            })
        }
    }

    async validateResetPWToken(token : string){
        try{
            return await this.JwtService.verify(token,{
                secret : process.env.JWT_PW_RESET_SECRET,
            },)
        }catch(error){
            return false
        } 
    }

    async changePassword(token: string,password : string){
        const payload = await this.validateResetPWToken(token)
        if(payload.id){
            this.collaborateur.updateOne(payload.id,{password})
        }else{
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
        }
    }

}
