import { Component, AfterViewInit, ViewChild } from "@angular/core";
import { DashboardService } from "./dashboard.service";
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MatPaginator } from '@angular/material/paginator';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { Label } from 'ng2-charts';
import { NumberCardComponent } from '@swimlane/ngx-charts';
import { MatSort } from '@angular/material';
import { AssessmentsApi } from "./dashboard.service";

interface SectorNode {
  name: string; 
  children?: SectorNode[]; 
}

interface FlatNode {
  expandable: boolean, 
  name: string, 
  level: number, 
  parent: string
}

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements AfterViewInit  {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  showAssessments: boolean = true;
  showComparison: boolean = false;
  sectors: any[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  selectedSector = '';
  currentAssessmentId = '';
  currentAssessmentAlias = '';
  currentAssessmentStd = '';
  parent: string = '';
  sampleSize: number = 0; 

  barChartOptions: ChartOptions = {
    responsive:true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 10,
          maxTicksLimit: 100, 
          max: 100
        }
      }]
    },
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

  chartDataMin = {
    fill: true, 
    data: [],
    label: 'Min', 
    type: 'scatter',
    pointRadius: 4, 
    pointHoverRadius: 5,
    pointBackgroundColor: "#FFA1B5",
    pointBorderColor: "#FF6384", 
    pointHoverBackgroundColor: "#FF6384",
    pointHoverBorderColor: "#FF6384", 
    backgroundColor: "#FFA1B5",
    borderColor: "#FF6384"
    
  }; 
  chartDataMedian = {
    fill: true, 
    data: [], 
    label: 'Median', 
    type: 'scatter', 
    pointRadius: 4, 
    pointHoverRadius: 5, 
    pointBackgroundColor: "#FFE29A",
    pointBorderColor: "#FFCE56", 
    pointHoverBackgroundColor: "#FFCE56",
    pointHoverBorderColor: "#FFCE56", 
    backgroundColor: "#FFE29A",
    borderColor: "#FFCE56"
  };
  chartDataMax = {
    fill: true, 
    data: [], 
    type: 'scatter', 
    label: 'Max', 
    pointRadius: 4, 
    pointHoverRadius: 5,
    pointBackgroundColor: "#9FD983",
    pointBorderColor: "#64BB6A", 
    pointHoverBackgroundColor: "#64BB6A",
    pointHoverBorderColor: "#64BB6A", 
    backgroundColor: "#9FD983",
    borderColor: "#64BB6A"
  }; 
  barChart = {
    data: [],
    label: 'Category'
  }

  barChartData: ChartDataSets[] = [
    this.chartDataMin
    , this.chartDataMedian
    , this.chartDataMax
    , this.barChart
    ];
    barChartLabels: Label[] = [];

  data: any[];
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
   
  }

  ngAfterViewInit() {
    
    this.getAssessmentData();
  }

  private _transformer = (node: SectorNode, level: number) => {
    if(!!node.children && node.children.length>0)
    {
      this.parent = node.name;
    }
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      parent: !!node.children && node.children.length > 0 ? "" : this.parent
    };
  }

  treeControl = new FlatTreeControl<FlatNode>(node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children
  );
  sectorSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  
  hasChild = (_: number, node: FlatNode) => {
    return node.expandable;
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    //console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    //console.log(event, active);
  }
  getAssessmentData() {
    this.dashboardService.getAssessmentsForUser("0").subscribe((data: any) => {
      this.data = data;
    });
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.dashboardService!.getAssessmentsForUser("0");
      }), 
      map((data: AssessmentsApi) => {
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.resultsLength = data.total_count;

        return data.items;
      }),
      catchError(() => {
        this.isLoadingResults = false;
        this.isRateLimitReached = true;
        return observableOf([]);
      })
    ).subscribe(data => this.data = data);
  }

  getDashboardData() {
    this.dashboardService.getDashboard(this.selectedSector, this.currentAssessmentId).subscribe((data: any) => {
      this.chartDataMin.data = data.min; 
      this.chartDataMax.data = data.max;
      this.chartDataMedian.data = data.median;
      this.barChart.data = data.barData.values;
      this.barChartLabels= data.barData.labels;
      this.sampleSize= data.sampleSize;
      this.barChartData= [
        this.chartDataMin
        , this.chartDataMedian
        , this.chartDataMax
        , this.barChart
        ];
        
      if (this.dashboardService != null) {
        this.showComparison = true;
        if(this.sectorSource.data.length == 0){
          this.dashboardService.getSectors().subscribe((data: any) => {
            this.sectorSource.data = data; 
            this.selectedSector = "All Sectors";
          });
        }
      } else {
        this.showComparison = false;
      }
    });
  }

  setRecord(item: any) {
    this.currentAssessmentId = item.assessment_Id;
    this.currentAssessmentAlias = item.alias;
    this.currentAssessmentStd = item.setName;
    this.selectedSector = "All Sectors";
    
    this.getDashboardData();
  }

  onSelect(event) {
    //console.log(event);
  }
  sectorChange(sector){
    this.selectedSector = sector;
    this.getDashboardData();
    console.log(sector);
  }
}

