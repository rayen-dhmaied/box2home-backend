import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CollaboratorModule } from '../collaborator/collaborator.module';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './guard/role.guard';
import { env } from 'process';

@Module({
  imports: [CollaboratorModule, PassportModule, JwtModule.register({
    secret: env.JWT_SECRET,
    signOptions: { expiresIn: env.JWT_EXP_30MIN },
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy, 
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    }],
  controllers: [AuthController],
  
})
export class AuthModule {}
