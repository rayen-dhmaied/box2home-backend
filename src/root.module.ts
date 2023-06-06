import { Module } from '@nestjs/common';
import { CollaborateurModule } from './modules/collaborateur/collaborateur.module';
import { AuthModule } from './modules/auth/auth.module';
import { ActivityModule } from './modules/activity/activity.module';
import { ClientModule } from './modules/client/client.module';
import { AvisModule } from './modules/avis/avis.module';
import { CanalVenteModule } from './modules/canalVente/canalVente.module';
import { ChauffeurModule } from './modules/chauffeur/chauffeur.module';
import { CourseModule } from './modules/course/course.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { CommandeModule } from './modules/commande/commande.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';

@Module({
    imports : [
        AvisModule,
        AnalyticsModule, 
        CollaborateurModule, 
        ClientModule, 
        CanalVenteModule, 
        ChauffeurModule, 
        CourseModule, 
        ActivityModule, 
        AuthModule,
        CommandeModule,

        MailerModule.forRoot({
            transport: {
              host: process.env.STMP_HOST ?? '',
              port: parseInt(process.env.STMP_PORT ?? '587', 10),
              auth: {
                user: process.env.STMP_USER ?? '',
                pass: process.env.STMP_PASSWORD ?? ''
              },
            }
          }),
    ]
})
export class RootModule {}
