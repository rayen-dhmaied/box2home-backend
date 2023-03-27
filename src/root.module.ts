import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CollaboratorModule } from './modules/collaborator/collaborator.module';

@Module({
    imports : [CollaboratorModule, AuthModule]
})
export class RootModule {}
