import { Injectable } from '@nestjs/common';
import { ChauffeurRepository } from './chauffeur.repository';

@Injectable()
export class ChauffeurService {
    constructor(private chauffeurRepo : ChauffeurRepository){}

    findMany(searchString?: string, id?: string, take? : string) {
        return this.chauffeurRepo.findMany(searchString, +id, +take)
    }

    findByID(id: string){
        return this.chauffeurRepo.findByID(+id)
    }

    createOne(record:any){
        return this.chauffeurRepo.createOne(record)
    }

    deleteOne(id:string){
        return this.chauffeurRepo.deleteOne(+id)
    }

    updateOne(id:string, record:any){
        return this.chauffeurRepo.updateOne(+id,record)
    }
}
