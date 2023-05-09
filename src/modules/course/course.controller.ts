import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ActivityService } from '../activity/activity.service';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/createCourse.dto';
import { collaborateur_role as roles } from '@prisma/client';
import { Role } from '../auth/decorator/role.decorator';
import { UpdateCourseDto } from './dto/updateCourse.dto';

@Controller('course')
@Role(roles.res_course)
export class CourseController {
    constructor(private courseService : CourseService, private activityService : ActivityService) {}

    @Get()
    findMany(@Req() req: any, @Query('s') searchString?: string, @Query('cursor') cursor?: string, @Query('limit') limit?: string){
        return this.courseService.findMany(searchString,cursor,limit)
    }

    @Post()
    createOne(@Req() req: any, @Body() record: CreateCourseDto){
        return this.courseService.createOne(record).then((data)=>{
            const activity= {
                object : data.id,
                action : " a créé course #",
                collaborateur_id : req.user.id
            }
            this.activityService.createOne(activity)
            return data
        })
    }

    @Delete(':id')
    deleteOne(@Req() req: any, @Param('id') id: string){
        return this.courseService.deleteOne(id).then((data)=>{
            const activity= {
                object : data.id,
                action : " a supprimé course #",
                collaborateur_id : req.user.id
            }
            this.activityService.createOne(activity)
            return data
        })
    }

    @Patch(':id')
    updateOne(@Req() req: any, @Param('id') id: string, @Body() record: UpdateCourseDto){
        return this.courseService.updateOne(id,record).then((data)=>{
            const activity= {
                object : data.id,
                action : " a modifié course #",
                collaborateur_id : req.user.id
            }
            this.activityService.createOne(activity)
            return data
        })
    }

    
}
