import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { ConfigService } from '../../services/config.service';

@Injectable()
export class DashboardService {
  
  apiUrl: string;
  constructor(private http: HttpClient, private router: Router, public configSvc: ConfigService) {
    this.apiUrl = configSvc.apiUrl;
  }

  getDashboard(assessment_id:string) {
    return this.http.get(this.apiUrl + 'Dashboard/GetDashboardChart?assessment_id='+assessment_id);
  }

  getAssessmentsForUser(arg0: string) {
    return this.http.get(this.apiUrl + 'Dashboard/GetAssessmentList');
  }

}
