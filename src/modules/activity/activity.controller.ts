import { Controller, Get, Query} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { Role } from '../auth/decorator/role.decorator';

@Controller('activity')
@Role('admin')
export class ActivityController {
    constructor(private activityService : ActivityService) {}

    @Get()
    findAll(@Query('s') searchString? : string ){
        return this.activityService.findMany(searchString)
    }
    
}