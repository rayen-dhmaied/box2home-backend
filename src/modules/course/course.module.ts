import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CourseController } from './course.controller';
import { CourseRepository } from './course.repository';
import { CourseService } from './course.service';
import { ActivityModule } from '../activity/activity.module';


@Module({
  imports: [PrismaModule, ActivityModule],
  controllers: [CourseController],
  providers: [CourseService, CourseRepository],
  exports: [CourseService]
})
export class CourseModule {}
