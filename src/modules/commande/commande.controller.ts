import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ActivityService } from '../activity/activity.service';
import { CommandeService } from './commande.service';
import { collaborateur_role as roles } from '@prisma/client';
import { Role } from '../auth/decorator/role.decorator';
import { UpdateCommandeDto } from './dto/updateCommande.dto';
import { CreateCommandeDto } from './dto/createCommande.dto';

@Controller('commande')
@Role(roles.res_commande)
export class CommandeController {
    constructor(private commandeService : CommandeService, private activityService : ActivityService) {}

    @Get()
    findMany(@Req() req: any, @Query('s') searchString?: string, @Query('cursor') cursor?: string, @Query('limit') limit?: string){
        return this.commandeService.findMany(searchString,cursor,limit)
    }

    @Post()
    createOne(@Req() req: any, @Body() record: CreateCommandeDto){
        return this.commandeService.createOne(record).then((data)=>{
            const activity= {
                object : data.id,
                action : " a créé commande #",
                collaborateur_id : req.user.id
            }
            this.activityService.createOne(activity)
            return data
        })
    }

    @Delete(':id')
    deleteOne(@Req() req: any, @Param('id') id: string){
        return this.commandeService.deleteOne(id).then((data)=>{
            const activity= {
                object : data.id,
                action : " a supprimé commande #",
                collaborateur_id : req.user.id
            }
            this.activityService.createOne(activity)
            return data
        })
    }

    @Patch(':id')
    updateOne(@Req() req: any, @Param('id') id: string, @Body() record: UpdateCommandeDto){
        return this.commandeService.updateOne(id,record).then((data)=>{
            const activity= {
                object : data.id,
                action : " a modifié commande #",
                collaborateur_id : req.user.id
            }
            this.activityService.createOne(activity)
            return data
        })
    }

    
}
