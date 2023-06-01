import { Injectable } from '@nestjs/common';
import { CommandeRepository } from './commande.repository';

@Injectable()
export class CommandeService {
    constructor(private commandeRepo : CommandeRepository){}

    findMany(searchString?: string, id?: string, take? : string) {
        return this.commandeRepo.findMany(searchString, +id, +take)
    }

    findByID(id: string){
        return this.commandeRepo.findByID(+id)
    }

    createOne(record:any){
        return this.commandeRepo.createOne(record)
    }

    deleteOne(id:string){
        return this.commandeRepo.deleteOne(+id)
    }

    updateOne(id:string, record:any){
        return this.commandeRepo.updateOne(+id,record)
    }
}
