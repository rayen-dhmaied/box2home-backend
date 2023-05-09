import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ActivityService } from '../activity/activity.service';
import { CanalVenteService } from './canalVente.service';
import { createCanalVenteDto } from './dto/createCanalVente.dto';
import { Role } from '../auth/decorator/role.decorator';
import { collaborateur_role as roles } from '@prisma/client';
import { updateCanalVenteDto } from './dto/updateCanalVente.dto';

@Controller('canal-vente')
@Role(roles.res_canal_vente)
export class CanalVenteController {
    constructor(private canalVenteService : CanalVenteService, private activityService : ActivityService) {}

    @Get()
    findMany(@Req() req: any, @Query('s') searchString?: string, @Query('cursor') cursor?: string, @Query('limit') limit?: string){
        return this.canalVenteService.findMany(searchString,cursor,limit)
    }

    @Post()
    createOne(@Req() req: any, @Body() record: createCanalVenteDto){
        return this.canalVenteService.createOne(record).then((data)=>{
            const activity= {
                object : data.id,
                action : " a créé canal de vente #",
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
                action : " a supprimé canal de vente #",
                collaborateur_id : req.user.id
            }
            this.activityService.createOne(activity)
            return data
        })
    }

    @Patch(':id')
    updateOne(@Req() req: any, @Param('id') id: string, @Body() record: updateCanalVenteDto){
        return this.canalVenteService.updateOne(id,record).then((data)=>{
            const activity= {
                object : data.id,
                action : " a modifié canal de vente #",
                collaborateur_id : req.user.id
            }
            this.activityService.createOne(activity)
            return data
        })
    }

    
}
