import { Injectable } from '@nestjs/common';
import { ActivityRepository } from './activity.repository';
import { CollaborateurService } from '../collaborateur/collaborateur.service';

@Injectable()
export class ActivityService {
    constructor(private activityRepo : ActivityRepository, private collaborateurService : CollaborateurService){}

    findMany(searchString?: string){
        return this.activityRepo.findMany(searchString)
    }

    createOne(data : any){
        this.collaborateurService.findByID(data.collaborateur_id).then((collaborateur) =>{
            const acitvity = {
                object : data.object,
                action : data.action,
                collaborateur_name : collaborateur.firstname+' '+collaborateur.lastname
            }
            return this.activityRepo.createOne(acitvity)
        })
    }

}
