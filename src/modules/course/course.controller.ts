import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { Public } from '../auth/decorator/public.decorator';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ActivityService } from '../activity/activity.service';


@Controller('course')
export class CourseController {
  constructor(private courseService : CourseService, private activityService : ActivityService) {}

  @Get()
  findMany(@Req() req: any, @Query('s') searchString?: string, @Query('cursor') cursor?: string, @Query('limit') limit?: string){
    return this.courseService.findMany(searchString,cursor,limit)
  }
  //find(@Req() req: any,@Query('s') ss?: string, @Query('cursor') cursor?: string, @Query('limit') limit?: string){
    //if(typeof ss !== 'undefined' && ss.trim().length>0){
        //return this.course.searchByString(ss)
   // }
    //return this.course.findAll();
  //}

  @Get(':id')
  getCourseById(@Param('id') id: string) {
    return this.courseService.findById(id);
  }

  @Post()
    createOne(@Req() req: any, @Body() createCourseDto: CreateCourseDto){
        return this.courseService.createOne(createCourseDto).then((data)=>{
            const activity= {
                object : data.id,
                action : " created course #",
                collaborateur_id : req.user.id
            }
            this.activityService.createOne(activity)
            return data
        })
    }

  @Delete(':id')
    deleteOne(@Req() req: any, @Param('id') id: string){
        if(req.user.id === +id) {
            throw new HttpException('Forbidden' , HttpStatus.FORBIDDEN)
        }
        return this.courseService.deleteOne(id).then((data)=>{
            const activity= {
                object : data.id,
                action : " deleted course #",
                collaborateur_id : req.user.id
            }
            this.activityService.createOne(activity)
        })
    }

    @Patch(':id')
    updateOne(@Req() req: any, @Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto){
        return this.courseService.updateOne(id,updateCourseDto).then((data)=>{
            const activity= {
                object : data.id,
                action : " updated course #",
                collaborateur_id : req.user.id
            }
            this.activityService.createOne(activity)
            return data
        })
    }
}
