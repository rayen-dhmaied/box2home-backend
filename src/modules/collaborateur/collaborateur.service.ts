import { Injectable } from '@nestjs/common';
import { CollaborateurRepository } from './collaborateur.repository';

@Injectable()
export class CollaborateurService {
    constructor(private collaborateurRepo : CollaborateurRepository){}

    findMany(searchString?: string, id?: string, take? : string) {
        return this.collaborateurRepo.findMany(searchString, +id, +take)
    }

    findByLogin(login: string){
        return this.collaborateurRepo.findByLogin(login)
    }

    findByID(id: string){
        return this.collaborateurRepo.findByID(+id)
    }

    createOne(record:any){
        return this.collaborateurRepo.createOne(record)
    }

    deleteOne(id:string){
        return this.collaborateurRepo.deleteOne(+id)
    }

    updateOne(id:string, record:any){
        return this.collaborateurRepo.updateOne(+id,record)
    }
}
