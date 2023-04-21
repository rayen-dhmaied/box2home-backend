import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ActivityModule } from '../activity/activity.module';
import { AvisController } from './avis.controller';
import { AvisService } from './avis.service';
import { AvisRepository } from './avis.repository';

@Module({
  imports: [PrismaModule, ActivityModule],
  controllers: [AvisController],
  providers: [AvisService, AvisRepository],
})
export class AvisModule {}
