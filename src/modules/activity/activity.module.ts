import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ActivityController } from './activity.controller';
import { ActivityRepository } from './activity.repository';
import { ActivityService } from './activity.service';
import { CollaborateurModule } from '../collaborateur/collaborateur.module';

@Module({
  imports: [PrismaModule, forwardRef(() => CollaborateurModule)],
  controllers: [ActivityController],
  providers: [ActivityService, ActivityRepository],
  exports: [ActivityService]
})
export class ActivityModule {}
