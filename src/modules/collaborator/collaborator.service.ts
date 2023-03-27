import { Injectable } from '@nestjs/common';
import { CollaboratorRepository } from './collaborator.repository';
import { CollaboratorDto } from './dto/Collaborator.dto';
import { UpdateCollaboratorDto } from './dto/UpdateCollaborator.dto';

@Injectable()
export class CollaboratorService {
    constructor(private CollaboratorRepo: CollaboratorRepository) {}

    createCollaborator(collaborator: CollaboratorDto){
        return this.CollaboratorRepo.createCollaborator(collaborator)
    }

    findCollaborator(email : string){
        return this.CollaboratorRepo.findCollaborator(email)
    }

    deleteCollaborator(id: string){
        return this.CollaboratorRepo.deleteCollaborator(id)
    }

    updateCollaborator(id:string, collaborator: UpdateCollaboratorDto){
        return this.CollaboratorRepo.updateCollaborator(id,collaborator)
    }

    findAll(){
        return this.CollaboratorRepo.findAll()
    }
}
