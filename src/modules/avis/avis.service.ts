import { Injectable } from '@nestjs/common';
import { AvisRepository } from './avis.repository';

@Injectable()
export class AvisService {
    constructor(private avisRepo : AvisRepository){}

    findMany(searchString?: string, id?: string, take? : string) {
        return this.avisRepo.findMany(searchString, +id, +take)
    }

    findByID(id: string){
        return this.avisRepo.findByID(+id)
    }

    createOne(record:any){
        return this.avisRepo.createOne(record)
    }

    deleteOne(id:string){
        return this.avisRepo.deleteOne(+id)
    }

    updateOne(id:string, record:any){
        return this.avisRepo.updateOne(+id,record)
    }
}
