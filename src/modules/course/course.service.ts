import { Injectable } from '@nestjs/common';
import { CourseRepository } from './course.repository';

@Injectable()
export class CourseService {
    constructor(private courseRepo : CourseRepository){}

    findMany(searchString?: string, id?: string, take? : string) {
        return this.courseRepo.findMany(searchString, +id, +take)
    }

    findByID(id: string){
        return this.courseRepo.findByID(+id)
    }

    createOne(record:any){
        return this.courseRepo.createOne(record)
    }

    deleteOne(id:string){
        return this.courseRepo.deleteOne(+id)
    }

    updateOne(id:string, record:any){
        return this.courseRepo.updateOne(+id,record)
    }
}
