import { Injectable } from '@nestjs/common';
import { CollaborateurRepository } from './collaborateur.repository';

@Injectable()
export class CollaborateurService {
    constructor(private collaborateurRepo : CollaborateurRepository){}

    findAll(take? : string, id?: string) {
        return this.collaborateurRepo.findAll(+id,+take)
    }

    findByLogin(login: string){
        return this.collaborateurRepo.findByLogin(login)
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

    searchByString(ss: string){
        return this.collaborateurRepo.searchByString(ss)
    }
}
