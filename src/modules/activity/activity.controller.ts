import { Controller, Get, Query} from '@nestjs/common';
import { ActivityService } from './activity.service';

@Controller('activity')
export class ActivityController {
    constructor(private activityService : ActivityService) {}

    @Get()
    findAll(@Query('s') searchString? : string ){
        return this.activityService.findMany(searchString)
    }
    
}