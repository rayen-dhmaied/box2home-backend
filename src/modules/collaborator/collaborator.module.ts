import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CollaboratorController } from './collaborator.controller';
import { CollaboratorRepository } from './collaborator.repository';
import { CollaboratorService } from './collaborator.service';

@Module({
  imports: [PrismaModule],
  controllers: [CollaboratorController],
  providers: [CollaboratorService, CollaboratorRepository],
  exports: [CollaboratorService]
})
export class CollaboratorModule {}