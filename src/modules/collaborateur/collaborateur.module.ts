import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CollaborateurController } from './collaborateur.controller';
import { CollaborateurRepository } from './collaborateur.repository';
import { CollaborateurService } from './collaborateur.service';
import { ActivityModule } from '../activity/activity.module';

@Module({
  imports: [PrismaModule, ActivityModule],
  controllers: [CollaborateurController],
  providers: [CollaborateurService, CollaborateurRepository],
  exports: [CollaborateurService]
})
export class CollaborateurModule {}
