import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ConfigService } from "../../services/config.service";
import { Observable } from 'rxjs';

@Injectable()
export class DashboardService {
  apiUrl: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    public configSvc: ConfigService
  ) {
    this.apiUrl = configSvc.apiUrl;
  }

  getDashboard(industry: string, assessment_id: string) {
    return this.http.get(
      this.apiUrl + "Dashboard/GetDashboardChart?industry="+ industry + "&assessment_id=" + assessment_id
    );
  }

  getAssessmentsForUser(arg0: string): Observable<AssessmentsApi> {
    return this.http.get<AssessmentsApi>(this.apiUrl + "Dashboard/GetAssessmentList");
  }

  getSectors() { 
    return this.http.get(this.apiUrl + "Dashboard/getSectors");
  }
}

export interface AssessmentsApi{
  items: any[], 
  total_count: number
}