import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ActivityService } from '../activity/activity.service';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/createClient.dto';
import { Role as roles } from '@prisma/client';
import { Role } from '../auth/decorator/role.decorator';
import { updateClientDto } from './dto/updateClient.dto';

@Controller('client')
@Role(roles.res_client)
export class ClientController {
    constructor(private clientService : ClientService, private activityService : ActivityService) {}

    @Get()
    findMany(@Req() req: any, @Query('s') searchString?: string, @Query('cursor') cursor?: string, @Query('limit') limit?: string){
        // if(typeof searchString !== 'undefined' && searchString.trim().length>0){
        //     return this.clientService.searchByString(searchString)
        // }
        return this.clientService.findMany(searchString,cursor,limit)
    }

    @Post()
    createOne(@Req() req: any, @Body() record: CreateClientDto){
        return this.clientService.createOne(record).then((data)=>{
            const activity= {
                object : data.id,
                action : " created client #",
                collaborateur_id : req.user.id
            }
            this.activityService.createOne(activity)
            return data
        })
    }

    @Delete(':id')
    deleteOne(@Req() req: any, @Param('id') id: string){
        return this.clientService.deleteOne(id).then((data)=>{
            const activity= {
                object : data.id,
                action : " deleted client #",
                collaborateur_id : req.user.id
            }
            this.activityService.createOne(activity)
            return data
        })
    }

    @Patch(':id')
    updateOne(@Req() req: any, @Param('id') id: string, @Body() record: updateClientDto){
        return this.clientService.updateOne(id,record).then((data)=>{
            const activity= {
                object : data.id,
                action : " updated client #",
                collaborateur_id : req.user.id
            }
            this.activityService.createOne(activity)
            return data
        })
    }

    
}
