import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ActivityModule } from '../activity/activity.module';
import { ChauffeurController } from './chauffeur.controller';
import { ChauffeurService } from './chauffeur.service';
import { ChauffeurRepository } from './chauffeur.repository';

@Module({
  imports: [PrismaModule, ActivityModule],
  controllers: [ChauffeurController],
  providers: [ChauffeurService, ChauffeurRepository],
})
export class ChauffeurModule {}
