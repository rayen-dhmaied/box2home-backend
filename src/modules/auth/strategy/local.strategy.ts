import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField : 'login',
    })
  }

  async validate(login: string, password : string){
    const fetched_collaborateur = await this.authService.validateCollaborateur(login,password)
    if (!fetched_collaborateur) {
      throw new UnauthorizedException()
    }
    return fetched_collaborateur
  }
}