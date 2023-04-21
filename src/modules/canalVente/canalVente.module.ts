import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ActivityModule } from '../activity/activity.module';
import { CanalVenteController } from './canalVente.controller';
import { CanalVenteService } from './canalVente.service';
import { CanalVenteRepository } from './canalVente.repository';

@Module({
  imports: [PrismaModule, ActivityModule],
  controllers: [CanalVenteController],
  providers: [CanalVenteService, CanalVenteRepository],
})
export class CanalVenteModule {}
