import { Injectable } from '@nestjs/common';
import { CourseRepository } from './course.repository';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
    constructor(private courseRepo : CourseRepository){}

    findMany(ss?: string, id?: string, take? : string) {
        return this.courseRepo.findMany(ss, +id, +take)
    }

    findById(id: string){
        return this.courseRepo.findById(+id)
    }

    createOne(createCourseDto:CreateCourseDto){
        return this.courseRepo.createOne(createCourseDto)
    }

    deleteOne(id:string){
        return this.courseRepo.deleteOne(+id)
    }

    updateOne(id:string, updateCourseDto:UpdateCourseDto){
        return this.courseRepo.updateOne(+id,updateCourseDto)
    }

    /*searchByString(ss: string){
        return this.courseRepo.searchByString(ss)
    }*/
}
