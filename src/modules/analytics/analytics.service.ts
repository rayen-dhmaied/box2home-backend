import { Injectable } from '@nestjs/common';
import { AnalyticsRepository } from './analytics.repository';

@Injectable()
export class AnalyticsService {
    constructor(private analyticsRepo : AnalyticsRepository){}

    collaborateurAnalytics(){
        return this.analyticsRepo.collaborateurAnalytics()
    }

    avisAnalytics(){
        return this.analyticsRepo.avisAnalytics()
    }

    canalVenteAnalytics(){
        return this.analyticsRepo.canalVenteAnalytics()
    }

    courseAnalytics(){
        return this.analyticsRepo.courseAnalytics()
    }

    commandeAnalytics(){
        return this.analyticsRepo.commandeAnalytics()
    }

    chauffeurAnalytics(){
        return this.analyticsRepo.chauffeurAnalytics()
    }
}