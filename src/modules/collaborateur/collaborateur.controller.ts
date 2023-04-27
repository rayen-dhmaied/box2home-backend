import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { CollaborateurService } from './collaborateur.service';
import { ActivityService } from '../activity/activity.service';
import { createCollaborateurDto } from './dto/createCollaborateur.dto';
import { Role as roles } from '@prisma/client';
import { Role } from '../auth/decorator/role.decorator';
import { updateCollaborateurDto } from './dto/updateCollaborateur.dto';

@Controller('collaborateur')
@Role(roles.res_collaborateur)
export class CollaborateurController {
    constructor(private collaborateurService : CollaborateurService, private activityService : ActivityService) {}

    @Get()
    findMany(@Req() req: any, @Query('s') searchString?: string, @Query('cursor') cursor?: string, @Query('limit') limit?: string){
        // if(typeof searchString !== 'undefined' && searchString.trim().length>0){
        //     return this.collaborateurService.searchByString(searchString)
        // }
        return this.collaborateurService.findMany(searchString,cursor,limit)
    }

    @Post()
    createOne(@Req() req: any, @Body() record: createCollaborateurDto){
        return this.collaborateurService.createOne(record).then((data)=>{
            const activity= {
                object : data.id,
                action : " created collaborateur #",
                collaborateur_id : req.user.id
            }
            this.activityService.createOne(activity)
            return data
        })
    }

    @Delete(':id')
    @Role('admin')
    deleteOne(@Req() req: any, @Param('id') id: string){
        if(req.user.id === +id) {
            throw new HttpException('Forbidden' , HttpStatus.FORBIDDEN)
        }
        return this.collaborateurService.deleteOne(id).then((data)=>{
            const activity= {
                object : data.id,
                action : " deleted collaborateur #",
                collaborateur_id : req.user.id
            }
            this.activityService.createOne(activity)
            return data
        })
    }

    @Patch(':id')
    updateOne(@Req() req: any, @Param('id') id: string, @Body() record: updateCollaborateurDto){
        if(!req.user.is_admin && (record.is_admin || record.role) ){
            throw new HttpException('Forbidden' , HttpStatus.FORBIDDEN)
        }
        return this.collaborateurService.updateOne(id,record).then((data)=>{
            const activity= {
                object : data.id,
                action : " updated collaborateur #",
                collaborateur_id : req.user.id
            }
            this.activityService.createOne(activity)
            return data
        })
    }

    
}
