import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { assertNotNull } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  view: any[] = [700, 400]

  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = '';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = '';
  showAssessments: boolean = false;
  showComparison: boolean = false;

  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  };

  dashboardData: any;
  data: any;
  displayedColumns: string[] = ['assessment_Id', 'alias', 'assessmentCreatedDate', 'lastAccessedDate'];
  Assessment_Id: number;
  constructor(private dashboardService: DashboardService) { 
    //Object.assign(this, this.multi);
  }

  ngOnInit() {    
    //this.getDashboardData(2);
    this.getAssessmentData();
  }
  
  getAssessmentData() {
    //if(sessionStorage.getItem("username")){
      this.dashboardService.getAssessmentsForUser("0").subscribe((data: any)=>{
        this.data= data;      
      });
    //}
    
    
  }
  
  getDashboardData(Assessment_Id:string){
    this.dashboardService.getDashboard(Assessment_Id).subscribe((data:any)=>{
        console.log("this is the data");
        console.log(data);
        this.dashboardData = data;
        if (this.dashboardService != null){
          this.showComparison = true;
        } else {
          this.showComparison = false;
        }
      }      
    );
  }

  setRecord(item: any){
    console.log(item);
    this.getDashboardData(item.assessment_Id);
  }

  onSelect(event){
    console.log(event);
  }
}
