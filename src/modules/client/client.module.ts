import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ActivityModule } from '../activity/activity.module';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { ClientRepository } from './client.repository';

@Module({
  imports: [PrismaModule, ActivityModule],
  controllers: [ClientController],
  providers: [ClientService, ClientRepository],
})
export class ClientModule {}
