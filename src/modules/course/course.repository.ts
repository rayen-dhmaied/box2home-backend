import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { hash } from "bcrypt";
import { course,Prisma } from '@prisma/client';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from "./dto/update-course.dto";

@Injectable()
export class CourseRepository {
    constructor(private readonly prisma: PrismaService) {}
    async findMany(ss?: string, cursor? : any, take? : number){
        let query = {}
        if(typeof ss !== 'undefined' && ss.trim().length>0){
            if(isNaN(+ss)){
                query = {
                    where:{
                        id : {equals : +ss},
                        lettre_voiture_id : {equals : +ss},
                        commande_id : {equals : +ss},
                        status_id : {equals : +ss},
                    }
                }
            }else{
                query = {
                    where:{
                        id : {equals : +ss}
                    }
                }
            }
        }

        if(typeof cursor === 'undefined' || isNaN(cursor)){
            const default_cursor = await this.prisma.course.findFirst({select : {id : true}})
            cursor = default_cursor
        }else{
            cursor = { id: cursor}
        }

        if(typeof take === 'undefined' || isNaN(take)){
            take = 50
        }

        const result =  await this.prisma.course.findMany({
            ...query,
            take,
            cursor
        })

        if(result.length===0){
            throw new HttpException('Course not found!', HttpStatus.NOT_FOUND)
        }

        return { data : result, count: await this.prisma.course.count()}
        
    }

    /*async findAll(cursor? : any, take? : number){
        if(typeof cursor === 'undefined' || isNaN(cursor)){
            const default_cursor = await this.prisma.course.findFirst({select : {id : true}})
            cursor = default_cursor
        }
        if(typeof take === 'undefined' || isNaN(take)){
            take = 100
        }
        const result =  await this.prisma.course.findMany({
            take:300,
            skip : 0,
            cursor
        })
        
        return {data : result, count: await this.prisma.course.count()}

    } */

    async findById(id: number){
        return await this.prisma.course.findUnique({
            where:{ id }
        })
    }

    async createOne(createCourseDto: CreateCourseDto){
        return  await this.prisma.course.create({
            data:createCourseDto
        })
    }

    async deleteOne(id: number){
        return  await this.prisma.course.delete({
            where:{id},
        })
    }

    async updateOne(id:number, course: UpdateCourseDto) {
        return await this.prisma.course.update({
          data:course,
          where:{id},
        });
      }

    //async searchByString(ss : string){
    //    console.log(ss)
    //    const result =  await this.prisma.course.findMany({
    //        where:{
    //                id : {equals : +ss},
    //                lettre_voiture_id : {equals : parseInt(ss)},
    //                commande_id : {equals : parseInt(ss)},
    //                status_id : {equals : parseInt(ss)},
    //        }
    //    })

    //    if(result.length===0){
    //        throw new HttpException('Course not found!', HttpStatus.NOT_FOUND)
    //    }

    //    return  {data: result} 
    //}
}