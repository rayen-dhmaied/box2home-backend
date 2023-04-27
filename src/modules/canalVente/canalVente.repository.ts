import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CanalVenteRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findMany(searchString?: string, cursor? : any, take? : number){
        let query = {}
        if(typeof searchString !== 'undefined' && searchString.trim().length>0){
            if(isNaN(+searchString)){
                searchString.replace('"','')
                query = {
                    where:{
                        code : {search :searchString},
                        name : {search :searchString},
                        business_unit : {search :searchString},
                    }
                }
            }else{
                query = {
                    where:{
                        id : {equals : +searchString},
                        business_owner : {equals : +searchString},
                        rules_id : {equals : +searchString},
                        macro_canal : {equals : +searchString},
                        billing_accounts_id  : {equals : +searchString},
                    }
                }
            }
        }

        if(typeof cursor === 'undefined' || isNaN(cursor)){
            const default_cursor = await this.prisma.canal_vente.findFirst({select : {id : true}})
            cursor = default_cursor
        }else{
            cursor = { id: cursor}
        }

        if(typeof take === 'undefined' || isNaN(take)){
            take = 50
        }

        const result =  await this.prisma.canal_vente.findMany({
            ...query,
            take,
            cursor
        })

        if(result.length===0){
            throw new HttpException('Canal de Vente not found!', HttpStatus.NOT_FOUND)
        }

        return { data : result, count: await this.prisma.canal_vente.count()}
        
    }

    async findByID(id: number){
        return await this.prisma.canal_vente.findUnique({
            where:{id}
        })
    }

    async createOne(record: any){
        return  await this.prisma.canal_vente.create({
            data:record
        })
    }

    async deleteOne(id: number){
        return  await this.prisma.canal_vente.delete({
            where:{id},
        })
    }
    
    async updateOne(id: number, record: any){
        return  await this.prisma.canal_vente.update({
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