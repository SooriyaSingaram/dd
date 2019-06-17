import { Component, OnInit,Input } from '@angular/core';
import { Color } from 'ng2-charts';
import { ChartService } from '../services/chart.service'

@Component({
  selector: 'app-generic-box',
  templateUrl:'./generic-box.component.html',
  styleUrls:['./generic-box.component.css']
})
export class GenericBoxComponent implements OnInit {

  @Input()	genericBox:Object;
  
  //data:any[];
  data1:any[];
  barchart1: number[]=[];
  barchart2: number[]=[];

  data:any[];

  tdata:any[]=[];

  data2:any[];
  linedata1: number[]=[];
  linedata2: number[]=[];

  constructor(private service : ChartService) {
    this.showHide = true;
  }

  showHide: boolean;

  close(){
    this.showHide = !this.showHide;
  }

ngOnInit(){}

  public pieChartLabels:string[] = ['January', 'February', 'March'];
  public pieChartData:string[] = ['300', '450', '100'];
  public pieChartType:string = 'pie';
  public pieChartLegend:boolean = true;
  public colorsPie: {}[] = [ { backgroundColor: [ '#288C82','#38DACD','#28C1AB','#32BCAF']}]

  public barChartLabels:string[] = ['2011','2012','2013','2014','2015','2016','2017'];
  public barChartColor: {}[] = [ { backgroundColor: [ ]}]
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public barChartOptions: any = {
    scales: {
        xAxes: [{ stacked: true }],
        yAxes: [{ stacked: true }]  
      }
    };
 
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Quantity',backgroundColor:''},
    {data: [35, 49, 70, 91, 76, 25, 70], label: 'Sales',backgroundColor:'rgba(55, 222, 207, 1)'},
    {data: [15, 35, 38, 68, 45, 87, 61], label: 'Store', backgroundColor:'rgba(68, 71, 101, 1)'}
  ];

  public doughnutChartLabels:string[] = ['January', 'February', 'March'];
  public doughnutChartData:number[] = [300, 450, 100];
  public doughnutChartType:string = 'pie';
  public doughnutChartLegend:boolean = true;
  public doughnutChartColor: {}[] = [ { backgroundColor: [ '#288C82','#38DACD','#28C1AB','#32BCAF']}]

  public lineareaChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Quantity'},
    {data: [35, 49, 70, 91, 76, 25, 70], label: 'Sales'}
   
  ];
  public lineareaChartLegend:boolean = true;
  public lineareaChartType:string = 'line';
  public lineareaChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  //public lineChartColors: {}[] = [];
  public lineareaChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(167,207,198,0.5)',
      borderColor: 'rgba(104,167,151,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
  ];
  public lineareaChartOptions:any = {
    responsive: true
  };

  public columnChartType:string = 'bar';
  public columnChartData:any[] = [{data: [65, 59, 80, 81, 56, 55, 40,59, 80, 81, 56, 55, 40], label: 'Series A'}];
  public columnChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];
  public columnChartLegend: boolean = true;
  public columnChartOptions: any = {
    scales: {
        yAxes: [{display:false}],
        xAxes: [{display:false} ]
        },
    scaleShowVerticalLines: true,
    responsive: true
    };  
    columnChartColors: Array<Color> = [{
      backgroundColor: 'white',
    }];
   
    public stackChartLabels: string[] = ['January','February','March','April','May','June','July'];
    public stackChartType: string = 'bar';
    //public stackChartColor: {}[] = [ { backgroundColor: [ ]}]
    public stackChartOptions: any = {
        scales: {
            xAxes: [{ stacked: true }],
            yAxes: [{ stacked: true }]  
          }
        };
    public stackChartLegend: boolean = true;



    public stackChartData: any[] =[{ data:[65, 59, 80, 81, 56, 55, 40] , label: 'HP' },
                                   { data: [35, 49, 70, 31, 26, 25, 30] , label: 'H' }];

    public lineChartData:Array<any> = [
      {data: [65, 59, 80, 81, 56, 55, 40], label: 'Quantity'},
      {data: [35, 49, 70, 31, 26, 25, 30], label: 'Sales'},
      {data: [15, 29, 50, 21, 16, 5, 10], label: 'store'}
     
    ];
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';
    public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartColors:Array<any> = [
      {
        backgroundColor: 'rgba(140,197,108,0.2)',
        borderColor: 'rgba(140,197,108,1)',

      },
      { 
        backgroundColor: 'rgba(232,210,194,0.5)',
        borderColor: 'rgba(248,85,91,1)',
      },
      { 
        backgroundColor: 'rgba(173,179,191,0.5)',
        borderColor: 'rgba(61,119,178,1)',

      },
    ];
    public lineChartOptions:any = {
      elements: {
        point: {
           radius: 4
        },
        line: {
           tension: 0, 
        }
     },
      responsive: true
    };
  

}