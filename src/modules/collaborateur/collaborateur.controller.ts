import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CollaborateurService } from './collaborateur.service';
import { Public } from '../auth/decorator/public.decorator';

@Controller('collaborateur')
export class CollaborateurController {
    constructor(private collaborateur : CollaborateurService) {}

    @Get()
    findAll(){
        return this.collaborateur.findAll()
    }

    @Post()
    createOne(@Body() record: any){
        return this.collaborateur.createOne(record)
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string){
        return this.collaborateur.deleteOne(id)
    }

    @Patch(':id')
    updateOne(@Param('id') id: string, @Body() record: any){
        return this.collaborateur.updateOne(id,record)
    }
}
