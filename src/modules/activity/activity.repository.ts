import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ActivityRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findMany(searchString? : string){
        let query = {}
        if(typeof searchString !== 'undefined' && searchString.trim().length>0){
            if(isNaN(+searchString)){
                query = {
                    where:{
                        collaborateur_name : {search :searchString},
                        action : {search :searchString},
                    }
                }
            }else{
                query = {
                    where:{
                        object : {equals : +searchString}
                    }
                }
            }
        }
        const result =  await this.prisma.activity.findMany({
            orderBy: {id: 'desc'},
            ...query
        })

        if(result.length===0){
            throw new HttpException('Aucune activité trouvée!', HttpStatus.NOT_FOUND)
        }

        return result
    }

    async createOne(data : any){
        return await this.prisma.activity.create({data})
    }

}