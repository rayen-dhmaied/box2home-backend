import { Module } from '@nestjs/common';
import { CollaborateurModule } from './modules/collaborateur/collaborateur.module';
import { AuthModule } from './modules/auth/auth.module';
import { ActivityModule } from './modules/activity/activity.module';

@Module({
    imports : [CollaborateurModule, ActivityModule, AuthModule]
})
export class RootModule {}
