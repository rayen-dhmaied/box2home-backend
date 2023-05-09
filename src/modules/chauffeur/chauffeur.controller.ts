import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ActivityService } from '../activity/activity.service';
import { ChauffeurService } from './chauffeur.service';
import { createChauffeurDto } from './dto/createChauffeur.dto';
import { Role } from '../auth/decorator/role.decorator';
import { collaborateur_role as roles } from '@prisma/client';
import { updateChauffeurDto } from './dto/updateChauffeur.dto';

@Controller('chauffeur')
@Role(roles.res_chauffeur)
export class ChauffeurController {
    constructor(private chauffeurService : ChauffeurService, private activityService : ActivityService) {}

    @Get()
    findMany(@Req() req: any, @Query('s') searchString?: string, @Query('cursor') cursor?: string, @Query('limit') limit?: string){
        return this.chauffeurService.findMany(searchString,cursor,limit)
    }

    @Post()
    createOne(@Req() req: any, @Body() record: createChauffeurDto){
        return this.chauffeurService.createOne(record).then((data)=>{
            const activity= {
                object : data.id,
                action : " a créé chauffeur #",
                collaborateur_id : req.user.id
            }
            this.activityService.createOne(activity)
            return data
        })
    }

    @Delete(':id')
    deleteOne(@Req() req: any, @Param('id') id: string){
        return this.chauffeurService.deleteOne(id).then((data)=>{
            const activity= {
                object : data.id,
                action : " a supprimé chauffeur #",
                collaborateur_id : req.user.id
            }
            this.activityService.createOne(activity)
            return data
        })
    }

    @Patch(':id')
    updateOne(@Req() req: any, @Param('id') id: string, @Body() record: updateChauffeurDto){
        return this.chauffeurService.updateOne(id,record).then((data)=>{
            const activity= {
                object : data.id,
                action : " a modifié chauffeur #",
                collaborateur_id : req.user.id
            }
            this.activityService.createOne(activity)
            return data
        })
    }

    
}
