import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ActivityService } from '../activity/activity.service';
import { ChauffeurService } from './chauffeur.service';

@Controller('chauffeur')
export class ChauffeurController {
    constructor(private chauffeurService : ChauffeurService, private activityService : ActivityService) {}

    @Get()
    findMany(@Req() req: any, @Query('s') searchString?: string, @Query('cursor') cursor?: string, @Query('limit') limit?: string){
        // if(typeof searchString !== 'undefined' && searchString.trim().length>0){
        //     return this.chauffeurService.searchByString(searchString)
        // }
        return this.chauffeurService.findMany(searchString,cursor,limit)
    }

    @Post()
    createOne(@Req() req: any, @Body() record: any){
        return this.chauffeurService.createOne(record).then((data)=>{
            const activity= {
                object : data.id,
                action : " created chauffeur #",
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
                action : " deleted chauffeur #",
                collaborateur_id : req.user.id
            }
            this.activityService.createOne(activity)
            return data
        })
    }

    @Patch(':id')
    updateOne(@Req() req: any, @Param('id') id: string, @Body() record: any){
        return this.chauffeurService.updateOne(id,record).then((data)=>{
            const activity= {
                object : data.id,
                action : " updated chauffeur #",
                collaborateur_id : req.user.id
            }
            this.activityService.createOne(activity)
            return data
        })
    }

    
}
