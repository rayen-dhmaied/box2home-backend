import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CourseRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findMany(searchString?: string, cursor? : any, take? : number){
        let query = {}
        if(typeof searchString !== 'undefined' && searchString.trim().length>0){
            if(isNaN(+searchString)){
                searchString.replace('"','')
                query = {
                    where:{
                        code :  {search :searchString},
                        observation :  {search :searchString},
                        factures :  {search :searchString},
                        course_source :  {search :searchString},
                        vehicule_type :  {search :searchString},
                        nom_societe :  {search :searchString},
                        tracking_number :  {search :searchString},
                        receipt_number :  {search :searchString},
                        failure_reason :  {search :searchString},
                        driver_comment :  {search :searchString},
                        secret_code :  {search :searchString},
                        delivery_related :  {search :searchString},
                        motif_annulation :  {search :searchString},
                        note_interne :  {search :searchString},
                        observation_arrivee :  {search :searchString},
                        point_enlevement :  {search :searchString},
                    }
                }
            }else{
                query = {
                    where:{
                        OR :[
                            {id : {equals : +searchString}},
                            {adresse_depart : {equals : +searchString}},
                            {adresse_arrivee : {equals : +searchString}},
                            {chauffeur_id : {equals : +searchString}},
                            {lettre_voiture_id : {equals : +searchString}},
                            {contact_arrivee_id : {equals : +searchString}},
                            {status_id : {equals : +searchString}},
                            {commande_id : {equals : +searchString}},
                            {nombre_colis : {equals : +searchString}},
                            {estimated_km : {equals : +searchString}},
                            {montantHT : {equals : +searchString}},
                            {vehicule_id : {equals : +searchString}},
                            {contact_depart_id : {equals : +searchString}},
                            {weight : {equals : +searchString}},
                            {compta_valid : {equals : +searchString}},
                            {reception_status : {equals : +searchString}},
                            {delivery_status : {equals : +searchString}},
                            {volume : {equals : +searchString}},
                            {service_id : {equals : +searchString}},
                        ]
                    }
                }
            }
        }

        if(typeof cursor === 'undefined' || isNaN(cursor)){
            const default_cursor = await this.prisma.$queryRaw`SELECT MAX(id) FROM course;`
            cursor = {id :default_cursor[0]['MAX(id)']}
        }else{
            cursor = { id: cursor}
        }

        if(typeof take === 'undefined' || isNaN(take)){
            take = 50
        }

        const result =  await this.prisma.course.findMany({
            ...query,
            take,
            cursor,
            orderBy: {
                id: 'desc'
            }
        })

        if(result.length===0){
            throw new HttpException('Course not found!', HttpStatus.NOT_FOUND)
        }

        return { data : result, count : await this.prisma.course.count({...query})}
        
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
}