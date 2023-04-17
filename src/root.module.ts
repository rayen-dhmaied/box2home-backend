import { Module } from '@nestjs/common';
import { CollaborateurModule } from './modules/collaborateur/collaborateur.module';
import { AuthModule } from './modules/auth/auth.module';
import { ActivityModule } from './modules/activity/activity.module';
import { CourseModule } from './modules/course/course.module';

@Module({
    imports : [CollaborateurModule, ActivityModule, AuthModule, CourseModule]
})
export class RootModule {}
