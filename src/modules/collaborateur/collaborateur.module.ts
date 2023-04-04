import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CollaborateurController } from './collaborateur.controller';
import { CollaborateurRepository } from './collaborateur.repository';
import { CollaborateurService } from './collaborateur.service';

@Module({
  imports: [PrismaModule],
  controllers: [CollaborateurController],
  providers: [CollaborateurService, CollaborateurRepository],
  exports: [CollaborateurService]
})
export class CollaborateurModule {}
