import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CourseRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findMany(searchString?: string, cursor? : any, take? : number){
        let query = {}
        if(typeof searchString !== 'undefined' && searchString.trim().length>0){
            if(isNaN(+searchString)){
                query = {
                    where:{
                        login : {search :searchString},
                        firstname : {search :searchString},
                        lastname : {search :searchString},
                    }
                }
            }else{
                query = {
                    where:{
                        id : {equals : +searchString}
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

    async findByID(id: number){
        return await this.prisma.course.findUnique({
            where:{id}
        })
    }

    async createOne(record: any){
        return  await this.prisma.course.create({
            data:record
        })
    }

    async deleteOne(id: number){
        return  await this.prisma.course.delete({
            where:{id},
        })
    }
    
    async updateOne(id: number, record: any){
        return  await this.prisma.course.update({
            where:{id},
            data:record
        })
    }

    // async searchByString(ss : string){
    //     const result =  await this.prisma.collaborateur.findMany({
    //         where:{
    //                 login : {search :ss},
    //                 firstname : {search :ss},
    //                 lastname : {search :ss},
    //         }
    //     })

    //     if(result.length===0){
    //         throw new HttpException('Collaborateur not found!', HttpStatus.NOT_FOUND)
    //     }

    //     return result
    // }
}