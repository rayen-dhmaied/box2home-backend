import { Body, Controller, Post, Get, Patch, Param} from '@nestjs/common';
import { CollaboratorService } from './collaborator.service';
import { CollaboratorDto } from './dto/Collaborator.dto';
import { UpdateCollaboratorDto } from './dto/UpdateCollaborator.dto';
import { Role } from '../auth/decorator/role.decorator';
import { Serialize } from '../../decorator/serialize.decorator';
import { ReturnCollaboratorDto } from './dto/ReturnCollaborator.dto'

@Controller('collaborator')
@Role('collaborator')
@Serialize(ReturnCollaboratorDto)
export class CollaboratorController {
    constructor(private CollaboratorService: CollaboratorService) {}

    @Post()
    createCollaborator(@Body() collaborator: CollaboratorDto){
        return this.CollaboratorService.createCollaborator(collaborator)
    }

    @Get()
    findAll(){
        return this.CollaboratorService.findAll()
    }

    @Patch(':id')
    updateCollaborator(@Param('id') id: string, @Body() collaborator: UpdateCollaboratorDto){
        return this.CollaboratorService.updateCollaborator(id,collaborator)
    }
}
