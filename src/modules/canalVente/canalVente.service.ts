import { Injectable } from '@nestjs/common';
import { CanalVenteRepository } from './canalVente.repository';

@Injectable()
export class CanalVenteService {
    constructor(private canalVenteRepo : CanalVenteRepository){}

    findMany(searchString?: string, id?: string, take? : string) {
        return this.canalVenteRepo.findMany(searchString, +id, +take)
    }

    findByID(id: string){
        return this.canalVenteRepo.findByID(+id)
    }

    createOne(record:any){
        return this.canalVenteRepo.createOne(record)
    }

    deleteOne(id:string){
        return this.canalVenteRepo.deleteOne(+id)
    }

    updateOne(id:string, record:any){
        return this.canalVenteRepo.updateOne(+id,record)
    }
}
