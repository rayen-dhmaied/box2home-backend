import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ActivityService } from '../activity/activity.service';
import { AvisService } from './avis.service';
import { CreateAvisDto } from './dto/createAvis.dto';
import { Role } from '../auth/decorator/role.decorator';
import { collaborateur_role as roles } from '@prisma/client';
import { UpdateAvisDto } from './dto/updateAvis.dto';

@Controller('avis')
@Role(roles.res_avis)
export class AvisController {
    constructor(private avisService : AvisService, private activityService : ActivityService) {}

    @Get()
    findMany(@Req() req: any, @Query('s') searchString?: string, @Query('cursor') cursor?: string, @Query('limit') limit?: string){
        return this.avisService.findMany(searchString,cursor,limit)
    }

    @Post()
    createOne(@Req() req: any, @Body() record: CreateAvisDto){
        return this.avisService.createOne(record).then((data)=>{
            const activity= {
                object : data.id,
                action : " a créé avis #",
                collaborateur_id : req.user.id
            }
            this.activityService.createOne(activity)
            return data
        })
    }

    @Delete(':id')
    deleteOne(@Req() req: any, @Param('id') id: string){
        return this.avisService.deleteOne(id).then((data)=>{
            const activity= {
                object : data.id,
                action : " a supprimé avis #",
                collaborateur_id : req.user.id
            }
            this.activityService.createOne(activity)
            return data
        })
    }

    @Patch(':id')
    updateOne(@Req() req: any, @Param('id') id: string, @Body() record: UpdateAvisDto){
        return this.avisService.updateOne(id,record).then((data)=>{
            const activity= {
                object : data.id,
                action : " a modifié avis #",
                collaborateur_id : req.user.id
            }
            this.activityService.createOne(activity)
            return data
        })
    }

    
}
