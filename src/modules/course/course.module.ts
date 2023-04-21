import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ActivityModule } from '../activity/activity.module';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseRepository } from './course.repository';

@Module({
  imports: [PrismaModule, ActivityModule],
  controllers: [CourseController],
  providers: [CourseService, CourseRepository],
})
export class CourseModule {}
