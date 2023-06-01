import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ActivityModule } from '../activity/activity.module';
import { CommandeController } from './commande.controller';
import { CommandeService } from './commande.service';
import { CommandeRepository } from './commande.repository';

@Module({
  imports: [PrismaModule, ActivityModule],
  controllers: [CommandeController],
  providers: [CommandeService, CommandeRepository],
})
export class CommandeModule {}
