import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { CollaborateurService } from './collaborateur.service';
import { Public } from '../auth/decorator/public.decorator';

@Controller('collaborateur')
@Public()
export class CollaborateurController {
    constructor(private collaborateur : CollaborateurService) {}

    @Get()
    find(@Query('s') ss?: string, @Query('cursor') cursor?: string, @Query('limit') limit?: string){
        if(typeof ss !== 'undefined' && ss.trim().length>0){
            return this.collaborateur.searchByString(ss)
        }
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
