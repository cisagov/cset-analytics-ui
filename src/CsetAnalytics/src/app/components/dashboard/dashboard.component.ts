import { Component, OnInit } from "@angular/core";
import { DashboardService } from "./dashboard.service";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Label } from "ng2-charts";
import { label } from "aws-amplify";
import { title } from "process";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  showAssessments: boolean = true;
  showComparison: boolean = false;

  barChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var label = data.datasets[tooltipItem.datasetIndex].label;
          label += ": " + tooltipItem.xLabel;
          return label;
        },
        title: function (tooltipItems, data) {
          var tooltipItem = tooltipItems[0];
          var title = data.labels[tooltipItem.index].toString();
          return title;
        },
      },
    },
  };
  barChartType: ChartType = "horizontalBar";
  barChartLegend = true;
  barChartData: ChartDataSets[] = [
    {
      fill: false,
      data: [
        { x: 30, y: "Access Control" },
        { x: 26, y: "Account Management" },
        { x: 15, y: "Audit and Accountability" },
        { x: 26, y: "Boundary Protection" },
        { x: 35, y: "Communication Protection" },
        { x: 29, y: "Configuration Management" },
      ],
      label: "Min",
      type: "scatter",
    },
    {
      fill: false,
      data: [
        { x: 49, y: "Access Control" },
        { x: 60, y: "Account Management" },
        { x: 45, y: "Audit and Accountability" },
        { x: 55, y: "Boundary Protection" },
        { x: 65, y: "Communication Protection" },
        { x: 57, y: "Configuration Management" },
      ],
      label: "Average",
      type: "scatter",
    },
    {
      fill: false,
      data: [
        { x: 75, y: "Access Control" },
        { x: 83, y: "Account Management" },
        { x: 69, y: "Audit and Accountability" },
        { y: "Boundary Protection", x: 91 },
        { y: "Communication Protection", x: 85 },
        { x: 76, y: "Configuration Management" },
      ],
      type: "scatter",
      label: "Max",
    },
    {
      data: [50, 39, 81, 67, 15, 69],
      label: "Category",
    },
  ];
  barChartLabels: Label[] = [
    "Access Control",
    "Account Management",
    "Audit and Accountability",
    "Boundary Protection",
    "Communication Protection",
    "Configuration Management",
  ];

  data: any;
  displayedColumns: string[] = [
    "alias",
    "setName",
    "sector",
    "industry",
    "assessmentCreatedDate",
    "lastAccessedDate",
  ];
  Assessment_Id: number;
  constructor(private dashboardService: DashboardService) {
    //Object.assign(this, this.multi);
  }

  ngOnInit() {
    //this.getDashboardData(2);
    this.getAssessmentData();
  }
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
  getAssessmentData() {
    //if(sessionStorage.getItem("username")){
    this.dashboardService.getAssessmentsForUser("0").subscribe((data: any) => {
      this.data = data;
    });
    //}
  }

  getDashboardData(Assessment_Id: string) {
    this.dashboardService.getDashboard(Assessment_Id).subscribe((data: any) => {
      console.log("this is the data");
      console.log(data);
      //this.dashboardData = data;
      if (this.dashboardService != null) {
        this.showComparison = true;
      } else {
        this.showComparison = false;
      }
    });
  }

  setRecord(item: any) {
    console.log(item);
    this.getDashboardData(item.assessment_Id);
  }

  onSelect(event) {
    console.log(event);
  }
}
