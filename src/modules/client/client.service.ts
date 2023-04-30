import { Injectable } from '@nestjs/common';
import { ClientRepository } from './client.repository';

@Injectable()
export class ClientService {
    constructor(private clientRepo : ClientRepository){}

    findMany(searchString?: string, id?: string, take? : string) {
        return this.clientRepo.findMany(searchString, +id, +take)
    }

    findByID(id: string){
        return this.clientRepo.findByID(+id)
    }

    createOne(record:any){
        return this.clientRepo.createOne(record)
    }

    deleteOne(id:string){
        return this.clientRepo.deleteOne(+id)
    }

    updateOne(id:string, record:any){
        return this.clientRepo.updateOne(+id,record)
    }
}
