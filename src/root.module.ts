import { Module } from '@nestjs/common';
import { CollaborateurModule } from './modules/collaborateur/collaborateur.module';
import { AuthModule } from './modules/auth/auth.module';
import { ActivityModule } from './modules/activity/activity.module';
import { ClientModule } from './modules/client/client.module';
import { AvisModule } from './modules/avis/avis.module';
import { CanalVenteModule } from './modules/canalVente/canalVente.module';
import { ChauffeurModule } from './modules/chauffeur/chauffeur.module';
import { CourseModule } from './modules/course/course.module';

@Module({
    imports : [AvisModule, CollaborateurModule, ClientModule, CanalVenteModule, ChauffeurModule, CourseModule, ActivityModule, AuthModule]
})
export class RootModule {}
