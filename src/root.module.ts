import { Module } from '@nestjs/common';
import { CollaborateurModule } from './modules/collaborateur/collaborateur.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    imports : [CollaborateurModule, AuthModule]
})
export class RootModule {}
