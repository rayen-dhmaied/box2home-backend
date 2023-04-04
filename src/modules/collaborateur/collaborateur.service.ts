import { Injectable } from '@nestjs/common';
import { CollaborateurRepository } from './collaborateur.repository';

@Injectable()
export class CollaborateurService {
    constructor(private collaborateurRepo : CollaborateurRepository){}

    findAll() {
        return this.collaborateurRepo.findAll()
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
}
