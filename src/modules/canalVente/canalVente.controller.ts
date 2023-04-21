import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ActivityService } from '../activity/activity.service';
import { CanalVenteService } from './canalVente.service';

@Controller('canal-vente')
export class CanalVenteController {
    constructor(private canalVenteService : CanalVenteService, private activityService : ActivityService) {}

    @Get()
    findMany(@Req() req: any, @Query('s') searchString?: string, @Query('cursor') cursor?: string, @Query('limit') limit?: string){
        // if(typeof searchString !== 'undefined' && searchString.trim().length>0){
        //     return this.canalVenteService.searchByString(searchString)
        // }
        return this.canalVenteService.findMany(searchString,cursor,limit)
    }

    @Post()
    createOne(@Req() req: any, @Body() record: any){
        return this.canalVenteService.createOne(record).then((data)=>{
            const activity= {
                object : data.id,
                action : " created canal de vente #",
                collaborateur_id : req.user.id
            }
            this.activityService.createOne(activity)
            return data
        })
    }

    @Delete(':id')
    deleteOne(@Req() req: any, @Param('id') id: string){
        return this.canalVenteService.deleteOne(id).then((data)=>{
            const activity= {
                object : data.id,
                action : " deleted canal de vente #",
                collaborateur_id : req.user.id
            }
            this.activityService.createOne(activity)
            return data
        })
    }

    @Patch(':id')
    updateOne(@Req() req: any, @Param('id') id: string, @Body() record: any){
        return this.canalVenteService.updateOne(id,record).then((data)=>{
            const activity= {
                object : data.id,
                action : " updated canal de vente #",
                collaborateur_id : req.user.id
            }
            this.activityService.createOne(activity)
            return data
        })
    }

    
}
