import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private AuthService: AuthService) {
    super({
      usernameField : 'email',
    })
  }

  async validate(email: string, password : string){
    const fetched_collaborator = await this.AuthService.validateCollaborator(email,password)
    if (!fetched_collaborator) {
      throw new UnauthorizedException()
    }
    return fetched_collaborator
  }
}