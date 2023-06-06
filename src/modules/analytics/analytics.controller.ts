import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { Public } from '../auth/decorator/public.decorator';

@Controller('analytics')
export class AnalyticsController {
    constructor(private analyticsService : AnalyticsService ) {}

    @Get()
    async analytics(){
        return {
            collaborateur : await this.analyticsService.collaborateurAnalytics(),
            avis : await this.analyticsService.avisAnalytics(),
            canal_vente : await this.analyticsService.canalVenteAnalytics(),
            course : await this.analyticsService.courseAnalytics(),
            chauffeur : await this.analyticsService.chauffeurAnalytics(),
            commande : await this.analyticsService.commandeAnalytics()
        }
    }
}