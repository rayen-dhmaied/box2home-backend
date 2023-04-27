import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from '../decorator/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    const { user } = context.switchToHttp().getRequest()
    if (!requiredRole) {
      return true
    }else if(requiredRole === 'admin'){
      return user.is_admin === true
    }
    return user.role === requiredRole || user.is_admin === true
  }
}