import { Component, OnInit, Input, OnDestroy, TemplateRef, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Color } from 'ng2-charts';
//import 'chart.piecelabel.js';
import { Templates, Widgets } from '../../WidgetsModel'
import { ChartService } from '../../services/chart.service';
import { ModelDataService } from '../../services/model-data.service';
import { ApicallService } from '../../services/apicall.service';
import * as jsPDF from 'jspdf';
import { FormControl } from '@angular/forms';
import { CustomizedTemplateComponent } from '../customized-template/customized-template.component'
declare var $: any;

@Component({
  selector: 'app-temp1-theme1',
  templateUrl: './temp1-theme1.component.html',
  styleUrls: ['./temp1-theme1.component.scss']
})
export class Temp1Theme1Component implements OnInit {
  dynamic_filter = new FormControl();

  @Input() template: Templates
  @Input() widget: Widgets
  constructor(private service: ChartService, private route: ActivatedRoute, private http: Http, private model: ModelDataService, private apicall: ApicallService, private router: Router, private datepipe: DatePipe) {
  }
  private colors = [{}];
  username: string;
  hideusercreation: boolean = true;
  CopiesTable: any;
  MarketShareTable: any[] = [];
  TopReturnTable: any;
  Rolename: string;
  tablename: string;
  samplearray: any[] = [];
  widgetsResult: any;
  read: boolean = true;

  id: String;
  private sub: any;
  userid: string;
  chartResult: any[];
  themenumber: number;
  colorData: any[] = [];
  monthly: any = ["Month", "quarter", "Year"];
  months: any = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  yearly: any = [2017];
  lineareatheme: any[];
  linetheme: any[];
  selectedValue1: string;
  selectedValue: string;
  percentvalue: string;
  dynamic_filters: any[] = [];
  percent: any = [10, 20, 30, 40, 50, 60, 70, 80, 90];
  showpercent: boolean;
  csvFormat: any = [] = [];
  parent_company: any[] = [];
  WidgetCount: any;
  filterfields: any = [];
  hidefilter: boolean = true;
  period: boolean = false;
  percentage: boolean = false;
  dateRange: boolean = false;

  orglogo: any;
  // homeMenu: boolean;
  // showloader:boolean=false
  public IdValue;
  //theme1
  lineareatheme1: any =
  [
    {
      backgroundColor: 'rgba(167,207,198,1)',
      borderColor: 'rgba(104,167,151,1)',
    },
    {
      backgroundColor: 'rgba(77,83,96,1)',
      borderColor: 'rgba(77,83,96,1)',

    },]

  lineareatheme2: any = [
    {
      backgroundColor: 'rgba(95,83,119,0.7)',
      borderColor: 'rgba(95,83,119,1)',

    },
    {
      backgroundColor: 'rgba(126,218,225,0.2)',
      borderColor: 'rgba(126,218,225,1)',

    },]
  lineareatheme3: any = [
    {
      // backgroundColor: 'rgba(181,231,220,0.4)',
      // borderColor: 'rgba(181,231,220,1)',
      backgroundColor: 'rgba(57,126,142,0.7)',
      borderColor: 'rgba(57,126,142,1)',

    },
    {
      backgroundColor: 'rgba(181,216,188,0.2)',
      borderColor: 'rgba(181,216,188,1)',

    },]
  lineareatheme4: any = [
    {
      backgroundColor: 'rgba(96,114,211,0.4)',
      borderColor: 'rgba(96,114,211,1)',

    },
    {
      backgroundColor: 'rgba(204 ,186 ,184,0.2)',
      borderColor: 'rgba(204 ,186 ,184,1)',

    },]

  lineareatheme5: any = [
    {
      // backgroundColor: 'rgba(226 ,188 ,177,0.4)',
      backgroundColor: ' rgba(34, 82, 130, 0.6)',
      borderColor: 'rgba(34, 82, 130,0.8)',

    },
    {
      backgroundColor: 'rgba(217  ,218  ,154,0.6)',
      borderColor: 'rgba(217  ,218  ,154,1)',

    },]
    lineareatheme6: any = [
      {
        backgroundColor: ' rgba(227,91,90, 0.6)',
        borderColor: 'rgba(227,91,90 ,1)'
  
      }]


  linetheme1: any =
  [
    {
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'rgba(104,167,151,1)',
    }]

  linetheme2: any = [
    {
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'rgba(95,83,119,1)',

    }]
  linetheme3: any = [
    {
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'rgba(57,126,142,1)',

    }]

  linetheme4: any = [
    {
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'rgba(96,114,211,1)',

    }]

  linetheme5: any = [
    {
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'rgba(34, 82, 130,0.6)',

    }]
  
    linetheme6: any = [
      {
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(227,91,90 ,1)'
        
      }]


  //Line Area  Data 1
  lineareaCount: number;
  lineareaposition1;
  lineAreaChart1;
  linearealabel1: any[] = [];
  lineareadata1: number[] = [];
  lineareaxaxis1: string = "";
  lineareayaxis1: string = "";
  //
  //Line Area Chart Options 1
  lineareaheading1; linedesc1;
  lineareacsv1; lineareamail1; lineareapdf1;
  //
  //Line Area  Data 2
  lineareaposition2;
  lineAreaChart2;
  linearealabel2: any[] = [];
  lineareadata2: number[] = [];
  lineareaxaxis2: string = "";
  lineareayaxis2: string = "";
  //
  //Line Area Chart Options 2
  lineareaheading2; linedesc2;
  lineareacsv2; lineareamail2; lineareapdf2;
  //
  //Line Area  Data 3
  lineareaposition3;
  lineAreaChart3;
  linearealabel3: any[] = [];
  lineareadata3: number[] = [];
  lineareaxaxis3: string = "";
  lineareayaxis3: string = "";
  //
  //Line Area Chart Options 3
  lineareaheading3; linedesc3;
  lineareacsv3; lineareamail3; lineareapdf3;
  //
  //Line Area  Data 4
  lineareaposition4;
  lineAreaChart4;
  linearealabel4: any[] = [];
  lineareadata4: number[] = [];
  lineareaxaxis4: string = "";
  lineareayaxis4: string = "";
  //
  //Line Area Chart Options 4
  lineareaheading4; linedesc4;
  lineareacsv4; lineareamail4; lineareapdf4;
  //
  //Line chart Data 1
  lineCount: number;
  lineposition1;
  lineChart1;
  linechartdata1: number[] = [];
  linelabel1: any[] = [];
  linexaxis1;
  lineyaxis1;
  //
  //Line  Chart Options 1
  lineheading1; linechartdesc1;
  linecsv1; linepdf1; linemail1;
  //
  //Line chart Data 2
  lineposition2;
  lineChart2;
  linechartdata2: number[] = [];
  linelabel2: any[] = [];
  linexaxis2;
  lineyaxis2;
  //
  //Line  Chart Options 2
  lineheading2; linechartdesc2;
  linecsv2; linepdf2; linemail2;
  //
  //Line chart Data 3
  lineposition3;
  lineChart3;
  linechartdata3: number[] = [];
  linelabel3: any[] = [];
  linexaxis3;
  lineyaxis3;
  //
  //Line  Chart Options 3
  lineheading3; linechartdesc3;
  linecsv3; linepdf3; linemail3;
  //
  //Line chart Data 4
  lineposition4;
  lineChart4;
  linechartdata4: number[] = [];
  linelabel4: any[] = [];
  linexaxis4;
  lineyaxis4;
  //
  //Line  Chart Options 4
  lineheading4; linechartdesc4;
  linecsv4; linepdf4; linemail4;
  //
  //Bar chart position 1
  barcount: number;
  barposition1;
  bardata1: number[] = [];
  barlabel1: any[] = [];
  barxaxis1;
  baryaxis1;
  //
  //Bar Chart Options 1
  barheading1;
  bardesc1
  barChart1;
  barcsv1; barpdf1; barmail1;
  //
  //Bar Position 2
  barposition2;
  bardata2: number[] = [];
  barlabel2: any[] = [];
  barxaxis2;
  baryaxis2;

  //
  //Bar Chart Options 2
  barheading2;
  bardesc2
  barChart2;
  barcsv2; barpdf2; barmail2;
  //
  //Bar Position 3
  barposition3;
  bardata3: number[] = [];
  barlabel3: any[] = [];
  barxaxis3;
  baryaxis3;
  //
  //Bar Chart Options 3
  barheading3;
  bardesc3;
  barChart3;
  barcsv3; barpdf3; barmail3;
  //
  //Bar Position 4
  barposition4;
  bardata4: number[] = [];
  barlabel4: any[] = [];
  barxaxis4;
  baryaxis4;
  //
  //Bar Chart Options 4
  barheading4;
  barChart4;
  bardesc4;
  barcsv4; barpdf4; barmail4;
  //

  //Pie Position 1
  pieCount: number;
  pieposition1;
  pieChart1;
  pielabel1: any[] = [];
  pieData1: any[];
  //
  //Pie Chart Options 1
  pieheading1; piedesc1;
  piechartcsv1; piechartpdf1; piemail1;
  //
  //Pie Position 2
  pieposition2;
  pieChart2;
  pielabel2: any[] = [];
  pieData2: any[];
  //
  //Pie Chart Options 2
  pieheading2; piedesc2;
  piechartcsv2; piechartpdf2; piemail2;
  //
  //Pie Position 3
  pieposition3;
  pieChart3;
  pielabel3: any[] = [];
  pieData3: any[];
  //
  //Pie Chart Options 3
  pieheading3; piedesc3;
  piechartcsv3; piechartpdf3; piemail3;
  //
  //Pie Position 4
  pieposition4;
  pieChart4;
  pielabel4: any[] = [];
  pieData4: any[];
  //
  //Pie Chart Options 4
  pieheading4; piedesc4;
  piechartcsv4; piechartpdf4; piemail4;
  //
  // Stacked bar
  stackedCount: number;
  stackedbarposition1;
  stackedBar1;
  stackbarheading1;
  stackdesc1
  stackedbarcsv1;
  stackedbarpdf1;
  stackedbarmail1;
  stackedlabel1: any = [];
  stacked_data1: any = [];
  flag: boolean = true;
  stacklabel: any = [];
  text: any = [];
  stackdata: any = [];
  //

  // Stacked bar2

  stackedbarposition2;
  stackedBar2;
  stackbarheading2;
  stackdesc2;
  stackedbarcsv2;
  stackedbarpdf2;
  stackedbarmail2;
  stackedlabel2: any = [];
  stacked_data2: any = [];
  flag2: boolean = true;
  stacklabel2: any = [];
  text2: any = [];
  stackdata2: any = [];
  //


  // Stacked bar3

  stackedbarposition3;
  stackedBar3;
  stackbarheading3;
  stackdesc3;
  stackedbarcsv3;
  stackedbarpdf3;
  stackedbarmail3;
  stackedlabel3: any = [];
  stacked_data3: any = [];
  flag3: boolean = true;
  stacklabel3: any = [];
  text3: any = [];
  stackdata3: any = [];
  //
  // Stacked bar4

  stackedbarposition4;
  stackedBar4;
  stackbarheading4;
  stackdesc4;
  stackedbarcsv4;
  stackedbarpdf4;
  stackedbarmail4;
  stackedlabel4: any = [];
  stacked_data4: any = [];
  flag4: boolean = true;
  stacklabel4: any = [];
  text4: any = [];
  stackdata4: any = [];
  //
  stackxaxis1: any;
  stackyaxis1: any;
  stackxaxis2: any;
  stackyaxis2: any;
  stackxaxis3: any;
  stackyaxis3: any;
  stackxaxis4: any;
  stackyaxis4: any;
  showloader: boolean = false;

  //Line Area chart
  public lineAreaChartLabels1: any[] = this.linearealabel1
  public lineAreaChartData1: any[] = [{ data: this.lineareadata1 },];
  public lineAreaChartLegend: boolean = false;
  public lineAreaChartColors: Array<any> = [];
  public lineAreaChartOptions: any = {
    pieceLabel: {
      render: function (res) {
        console.log(res.address)
        // return args.label + '\n' + args.value;
      }
    },
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
          //fontStyle: 'bold',
          fontColor: '#000',
          fontSize: 15,
          fontFamily: 'Verdana',

        },
        scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.lineareaxaxis1,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          fontSize: 15,
          //fontStyle: 'bold',
          fontColor: '#000',
          fontFamily: 'Verdana',

        },
        scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.lineareayaxis1,
        }
      }]
    },
    responsive: true,
  };

  public lineAreaChartLabels2: any[] = this.linearealabel2
  public lineAreaChartData2: any[] = [{ data: this.lineareadata2 },];
  public lineAreaChartOptions2: any = {
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
          //fontStyle: 'bold',
          fontColor: '#000',
          fontSize: 15,
          fontFamily: 'Verdana',

        },
        scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.lineareaxaxis2,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          fontSize: 15,
          //fontStyle: 'bold',
          fontColor: '#000',
          fontFamily: 'Verdana',


        },
        scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.lineareayaxis2,
        }
      }]
    },
    responsive: true,
  };

  public lineAreaChartLabels3: any[] = this.linearealabel3
  public lineAreaChartData3: any[] = [{ data: this.lineareadata3 },];
  public lineAreaChartOptions3: any = {
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
          //fontStyle: 'bold',
          fontColor: '#000',
          fontSize: 15,
          fontFamily: 'Verdana',

        },
        scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.lineareaxaxis3,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          //fontStyle: 'bold',
          fontColor: '#000',
          fontFamily: 'Verdana',

        },
        scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.lineareayaxis3,
        }
      }]
    },
    responsive: true,
  };

  public lineAreaChartLabels4: any[] = this.linearealabel4
  public lineAreaChartData4: any[] = [{ data: this.lineareadata4 },];
  public lineAreaChartOptions4: any = {
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
          ////fontStyle: 'bold',
          fontColor: '#000',
          fontSize: 15,
          fontFamily: 'Verdana',

        },
        scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.lineareaxaxis4,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          //fontStyle: 'bold',
          fontSize: 15,
          fontColor: '#000',
          fontFamily: 'Verdana',

        },
        scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.lineareayaxis4,
        }
      }]
    },
    responsive: true,
  };

  //Line area chart ending


  //PieChart 
  public pieChartLabels1: any[] = this.pielabel1;
  public pieChartData1: any[] = [{ data: this.pieData1 }];
  public pieChartColor: any[] = [];
  public pieChartLegend: boolean;
  public pieChartOptions: any = {
    pieceLabel: {
      fontSize: 15,
      ////fontStyle: 'bold',
      fontColor: '#fff',
      arc: true,
      render: function (res) {
        const value = res.value;
        return value + '% ';
      }
    },
    legend: {
      labels: {
        //fontStyle: 'bold',
        fontColor: '#000',
        fontSize: 13
      },
      position: 'right'
    },
  }

  public pieChartLabels2: any[] = this.pielabel2;
  public pieChartData2: any[] = [{ data: this.pieData2 }];

  public pieChartLabels3: any[] = this.pielabel3;
  public pieChartData3: any[] = [{ data: this.pieData3 }];

  public pieChartLabels4: any[] = this.pielabel4;
  public pieChartData4: any[] = [{ data: this.pieData4 }];
  //End of pie chart

  //Bar chart
  public barChartLabels1: any[] = this.barlabel1;
  public barChartData1: any[] = [
    { data: this.bardata1, label: 'Quantity', backgroundColor: '#fff' }];
  public barChartColor: {}[] = [];

  public barChartLegend: boolean = false;
  public barChartOptions: any = {
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
          //fontStyle: 'bold',
          fontColor: '#000',
          fontSize: 15,
          fontFamily: 'Verdana',

        },
        scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.barxaxis1,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          //fontStyle: 'bold',
          fontColor: '#000',
          fontSize: 15,
          fontFamily: 'Verdana',

        },
        scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.baryaxis1,
        }
      }]
    },

    scaleShowVerticalLines: false,
    responsive: true,
  };

  //Bar chart
  public barChartLabels2: any[] = this.barlabel2;
  public barChartData2: any[] = [
    { data: this.bardata2, label: 'Quantity', backgroundColor: '#fff' }];
  public barChartOptions2: any = {
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
          ////fontStyle: 'bold',
          fontColor: '#000',
          fontSize: 15,
          fontFamily: 'Verdana',

        },
        scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.barxaxis2,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          ////fontStyle: 'bold',
          fontSize: 15,
          fontColor: '#000',
          fontFamily: 'Verdana',

        },
        scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.baryaxis2,
        }
      }]
    },

    scaleShowVerticalLines: false,
    responsive: true,
  };


  //Bar chart
  public barChartLabels3: any[] = this.barlabel3;
  public barChartData3: any[] = [
    { data: this.bardata3, label: 'Quantity', backgroundColor: '#fff' }];
  public barChartOptions3: any = {
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
          ////fontStyle: 'bold',
          fontColor: '#000',
          fontSize: 15,
          fontFamily: 'Verdana',

        },
        scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.barxaxis3,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          ////fontStyle: 'bold',
          fontSize: 15,
          fontColor: '#000',
          fontFamily: 'Verdana',

        },
        scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.baryaxis3,
        }
      }]
    },

    scaleShowVerticalLines: false,
    responsive: true,
  };

  //Bar chart
  public barChartLabels4: any[] = this.barlabel4;
  public barChartData4: any[] = [
    { data: this.bardata4, label: 'Quantity', backgroundColor: '#fff' }];
  public barChartOptions4: any = {
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
          ////fontStyle: 'bold',
          fontColor: '#000',
          fontSize: 15,
          fontFamily: 'Verdana',

        },
        scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.barxaxis4,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          ////fontStyle: 'bold',
          fontColor: '#000',
          fontFamily: 'Verdana',

        },
        scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.baryaxis4,
        }
      }]
    },

    scaleShowVerticalLines: false,
    responsive: true,
  };
  //Bar chart ending

  //Line Chart 
  public lineChartData1: any[] = [{ data: this.linechartdata1 }];
  public lineChartLegend: boolean = false;
  public lineChartLabels1: any[] = this.linelabel1;
  public lineChartColors: Array<any> = [];
  public lineChartOptions: any = {

    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
          //fontStyle: 'bold',
          fontColor: '#000',
          fontSize: 15,
          fontFamily: 'Verdana',

        },
        scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.linexaxis1,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          //fontStyle: 'bold',
          fontSize: 15,
          fontColor: '#000',
          fontFamily: 'Verdana',

        },
        scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.lineyaxis1,
        }
      }]
    },
    elements: {
      point: {
        radius: 4
      },
      line: {
        tension: 0,
      }
    },
    responsive: true,
  };

  public lineChartData2: any[] = [{ data: this.linechartdata2 }];
  public lineChartLabels2: any[] = this.linelabel2;
  public lineChartOptions2: any = {

    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
          ////fontStyle: 'bold',
          fontColor: '#000',
          fontSize: 15,
          fontFamily: 'Verdana',

        },
        scaleLabel: {
          display: true,
          ////fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.linexaxis2,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          ////fontStyle: 'bold',
          fontSize: 15,
          fontColor: '#000',
          fontFamily: 'Verdana',

        },
        scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.lineyaxis2,
        }
      }]
    },
    elements: {
      point: {
        radius: 4
      },
      line: {
        tension: 0,
      }
    },
    responsive: true,
  };

  public lineChartData3: any[] = [{ data: this.linechartdata3 }];
  public lineChartLabels3: any[] = this.linelabel3;
  public lineChartOptions3: any = {

    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
          //fontStyle: 'bold',
          fontColor: '#000',
          fontSize: 15,
          fontFamily: 'Verdana',

        },
        scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.linexaxis3,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          //fontStyle: 'bold',
          fontSize: 15,
          fontColor: '#000',
          fontFamily: 'Verdana',

        },
        scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.lineyaxis3,
        }
      }]
    },
    elements: {
      point: {
        radius: 4
      },
      line: {
        tension: 0,
      }
    },
    responsive: true,
  };

  public lineChartData4: any[] = [{ data: this.linechartdata4 }];
  public lineChartLabels4: any[] = this.linelabel4;
  public lineChartOptions4: any = {

    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
          ////fontStyle: 'bold',
          fontColor: '#000',
          fontSize: 15,
          fontFamily: 'Verdana',

        },
        scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.linexaxis4,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          ////fontStyle: 'bold',
          fontSize: 15,
          fontColor: '#000',
          fontFamily: 'Verdana',

        },
        scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.lineyaxis4,
        }
      }]
    },
    elements: {
      point: {
        radius: 4
      },
      line: {
        tension: 0,
      }
    },
    responsive: true,
  };
  //Line Chart Ending

  public stackChartLabels: string[] = this.stackedlabel1;
  public stackChartData: any[] = this.stacked_data1;
  public stackChartColor: any[] = [];

  public stackChartType: string = 'bar';
  public stackChartOptions: any = {
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
          ////fontStyle: 'bold',

          fontColor: '#000',
          fontSize: 15,
        },
        stacked: true, scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.stackxaxis1,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          ////fontStyle: 'bold',
          fontSize: 15,
          fontColor: '#000'
        },
        stacked: true, scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.stackyaxis1,
        }
      }]
    },
    legend: {
      labels: {
        //fontStyle: 'bold',
        fontColor: '#000',
        fontSize: 9,
      },
      position: 'bottom'
    },
  };
  public stackChartLegend: boolean = true;

  public stackChartLabels2: string[] = this.stackedlabel2;
  public stackChartData2: any[] = this.stacked_data2;
  public stackChartOptions2: any = {
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
          //fontStyle: 'bold',
          fontColor: '#000',
          fontSize: 15,
        },
        stacked: true, scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.stackxaxis2,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          ////fontStyle: 'bold',
          fontSize: 15,
          fontColor: '#000'
        },
        stacked: true, scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.stackyaxis2,
        }
      }]
    },
    legend: {
      labels: {
        //fontStyle: 'bold',
        fontColor: '#000',
        fontSize: 9,
      },
      position: 'bottom'
    },
  };


  public stackChartLabels3: string[] = this.stackedlabel3;
  public stackChartData3: any[] = this.stacked_data3;
  public stackChartOptions3: any = {
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
          ////fontStyle: 'bold',
          fontColor: '#000',
          fontSize: 15

        },
        stacked: true, scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.stackxaxis3,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          ////fontStyle: 'bold',
          fontSize: 15,
          fontColor: '#000'
        },
        stacked: true, scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.stackyaxis3,
        }
      }]
    },
    legend: {
      labels: {
        //fontStyle: 'bold',
        fontColor: '#000',
        fontSize: 9,
      },
      position: 'bottom'
    },
  };

  public stackChartLabels4: string[] = this.stackedlabel4;
  public stackChartData4: any[] = this.stacked_data4;
  public stackChartOptions4: any = {
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
          ////fontStyle: 'bold',
          fontSize: 15,
          fontColor: '#000'
        },
        stacked: true, scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.stackxaxis4,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          ////fontStyle: 'bold',
          fontSize: 15,
          fontColor: '#000'
        },
        stacked: true, scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.stackyaxis4,
        }
      }]
    },
    legend: {
      labels: {
        //fontStyle: 'bold',
        fontColor: '#000',
        fontSize: 9,
      },
      position: 'bottom'
    },
  };

  // Stacked Line
  stackLineCount: number;
  stackedlineposition1;
  stackedline1;
  stacklineheading1;
  stacklinedesc1
  stackedlinecsv1;
  stackedlinepdf1;
  stackedlinemail1;
  stacklinelabel1: any = [];
  stacklinedata1: any = [];
  stacklinelabel: any = [];
  stacklinedata: any = [];
  //

  stacklinexaxis1: any;
  stacklineyaxis1: any;


  stackedlineposition2;
  stackedline2;
  stacklineheading2; stacklinedesc2;
  stackedlinecsv2;
  stackedlinepdf2;
  stackedlinemail2;
  stacklinelabel2: any = [];
  stacklinedata2: any = [];

  //

  stacklinexaxis2: any;
  stacklineyaxis2: any;

  stackedlineposition3;
  stackedline3;
  stacklineheading3;
  stacklinedesc3;
  stackedlinecsv3;
  stackedlinepdf3;
  stackedlinemail3;
  stacklinelabel3: any = [];
  stacklinedata3: any = [];

  //

  stacklinexaxis3: any;
  stacklineyaxis3: any;

  stackedlineposition4;
  stackedline4;
  stacklineheading4;
  stacklinedesc4;
  stackedlinecsv4;
  stackedlinepdf4;
  stackedlinemail4;
  stacklinelabel4: any = [];
  stacklinedata4: any = [];

  //

  stacklinexaxis4: any;
  stacklineyaxis4: any;

  //Stacked Line Chart

  public stackLineLabels: string[] = this.stacklinelabel1;
  public stackLineData: any[] = this.stacklinedata1;
  public stackLineColor: any[] = [{
    backgroundColor: this.colorData
  }];

  public stackLineType: String = 'line';
  public stackLineOptions: any = {
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
          //fontStyle: 'bold',
          fontSize: 15,
          fontColor: '#000'
        },
        stacked: true, scaleLabel: {
          display: true,
          //fontStyle: 'bold',

          fontSize: 16,
          fontColor: '#000',
          labelString: this.stacklinexaxis1,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          //fontStyle: 'bold',
          fontSize: 15,
          fontColor: '#000'
        },
        stacked: true, scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.stacklineyaxis1,
        }
      }]
    },
    legend: {
      labels: {
        //fontStyle: 'bold',
        fontColor: '#000',
        fontSize: 9,
      },
      position: 'bottom'
    },
  };
  public stackLineLegend: boolean = true;


  //Stacked Line 2

  public stackLineLabels2: string[] = this.stacklinelabel2;
  public stackLineData2: any[] = this.stacklinedata2;
  public stackLineOptions2: any = {
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
          //fontStyle: 'bold',

          fontColor: '#000',
          fontSize: 15
        },
        stacked: true, scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.stacklinexaxis2,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          //fontStyle: 'bold',
          fontSize: 15,
          fontColor: '#000'
        },
        stacked: true, scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.stacklineyaxis2,
        }
      }]
    },
    legend: {
      labels: {
        //fontStyle: 'bold',
        fontColor: '#000',
        fontSize: 9,
      },
      position: 'bottom'
    },
  };

  //Stacked Line 3

  public stackLineLabels3: string[] = this.stacklinelabel3;
  public stackLineData3: any[] = this.stacklinedata3;
  public stackLineOptions3: any = {
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
          ////fontStyle: 'bold',
          fontSize: 15,
          fontColor: '#000'
        },
        stacked: true, scaleLabel: {
          display: true,
          ////fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.stacklinexaxis3,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          ////fontStyle: 'bold',
          fontSize: 15,
          fontColor: '#000'
        },
        stacked: true, scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.stacklineyaxis3,
        }
      }]
    },
    legend: {
      labels: {
        //fontStyle: 'bold',
        fontColor: '#000',
        fontSize: 9,
      },
      position: 'bottom'
    },
  };

  //Stacked Line 4

  public stackLineLabels4: string[] = this.stacklinelabel4;
  public stackLineData4: any[] = this.stacklinedata4;
  public stackLineOptions4: any = {
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
          fontSize: 15,
          ////fontStyle: 'bold',
          fontColor: '#000'
        },
        stacked: true, scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.stacklinexaxis4,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          fontSize: 15,
          ////fontStyle: 'bold',
          fontColor: '#000'
        },
        stacked: true, scaleLabel: {
          display: true,
          //fontStyle: 'bold',
          fontSize: 16,
          fontColor: '#000',
          labelString: this.stacklineyaxis4,
        }
      }]
    },
    legend: {
      labels: {
        //fontStyle: 'bold',
        fontColor: '#000',
        fontSize: 9,
      },
      position: 'bottom'
    },
  };
  yesStackLineData1: boolean = true; yesStackedLineData2: boolean = true; yesStackedLineData3: boolean = true; yesStackedLineData4: boolean = true;
  yesStackChartData1: boolean = true; yesStackChartData2: boolean = true; yesStackChartData3: boolean = true; yesStackChartData4: boolean = true;
  yesLineAreaData1: boolean = true; yesLineAreaData2: boolean = true; yesLineAreaData3: boolean = true; yesLineAreaData4: boolean = true;
  yesLineData1: boolean = true; yesLineData2: boolean = true; yesLineData3: boolean = true; yesLineData4: boolean = true;
  yesPieData1: boolean = true; yesPieData2: boolean = true; yesPieData3: boolean = true; yesPieData4: boolean = true;
  yesBarData1: boolean = true; yesBarData2: boolean = true; yesBarData3: boolean = true; yesBarData4: boolean = true;

  noStackedLineData1: boolean = false; noStackedLineData2: boolean = false; noStackedLineData3: boolean = false; noStackedLineData4: boolean = false;
  noStackChartData1: boolean = false; noStackChartData2: boolean = false; noStackChartData3: boolean = false; noStackChartData4: boolean = false;
  noLineAreaData1: boolean = false; noLineAreaData2: boolean = false; noLineAreaData3: boolean = false; noLineAreaData4: boolean = false;
  noLineData1: boolean = false; noLineData2: boolean = false; noLineData3: boolean = false; noLineData4: boolean = false;
  noPieData1: boolean = false; noPieData2: boolean = false; noPieData3: boolean = false; noPieData4: boolean = false;
  noBarData1: boolean = false; noBarData2: boolean = false; noBarData3: boolean = false; noBarData4: boolean = false;
  homeMenu: boolean;
  templatePage: boolean = false;
  emailFields;
  dropdownfields;
  linelabels1; linelabels2; linelabels3; linelabels4;
  barlabels1; barlabels2; barlabels3; barlabels4;
  linearealabels1; linearealabels2; linearealabels3; linearealabels4;

  ngOnInit() {
    this.dropdownfields = {};
    this.template = new Templates()
    this.userid = localStorage.getItem("userId");
    this.apicall.getUserById(this.userid).subscribe(res => {

      this.apicall.getOrganizationById(res.OrganizationId).subscribe(response => {
        console.log(response)
        this.showloader = true;
        let themetype: string = response.theme[0].itemName;
        this.themenumber = +themetype.substr(themetype.length - 1);

        if (this.themenumber == 1) {
          this.lineareatheme = this.lineareatheme1;
          this.linetheme = this.linetheme1;
        }
        else if (this.themenumber == 2) {
          this.lineareatheme = this.lineareatheme2;
          this.linetheme = this.linetheme2;
        }
        else if (this.themenumber == 3) {
          this.lineareatheme = this.lineareatheme3;
          this.linetheme = this.linetheme3;

        }
        else if (this.themenumber == 4) {
          this.lineareatheme = this.lineareatheme4;
          this.linetheme = this.linetheme4;
        }
        else if (this.themenumber == 5) {
          this.lineareatheme = this.lineareatheme5;
          this.linetheme = this.linetheme5;
        }
        else if (this.themenumber == 6) {
          this.lineareatheme = this.lineareatheme6;
          this.linetheme = this.linetheme6;
        }
        this.lineAreaChartColors = this.lineareatheme;
        this.barChartColor = this.lineareatheme;

        this.lineChartColors = this.linetheme
        //this.doughnutChartColor = this.lineareatheme;
      })
    })

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id != "0") {

        this.selectedValue2 = '';
        this.monthValue = '';
        this.selectedValue1 = '';
        this.temp = {};
        this.percentvalue = "";
        this.startDate = '';
        this.endDate = '';
        this.dateRangeFilter = { from: undefined }
        this.barChart1 = false; this.barChart2 = false; this.barChart3 = false; this.barChart4 = false;
        this.pieChart1 = false; this.pieChart2 = false; this.pieChart3 = false; this.pieChart4 = false;
        this.lineAreaChart1 = false; this.lineAreaChart2 = false; this.lineAreaChart3 = false; this.lineAreaChart4 = false;
        this.lineChart1 = false; this.lineChart2 = false; this.lineChart3 = false; this.lineChart4 = false;
        this.stackedBar1 = false; this.stackedBar2 = false; this.stackedBar3 = false; this.stackedBar4 = false;
        this.stackedline1 = false; this.stackedline2 = false; this.stackedline3 = false; this.stackedline4 = false;

        this.getTemplateDetails()
        this.dropdownfields={}
      }

      if (this.id == "1") {
        this.homeMenu = true;
        this.templatePage = false;

      } else {
        this.homeMenu = false;
        this.templatePage = true;
      }

      // templatePage:boolean=false;

      // if (data == '1') {

      // } else {



    });

    this.selectedValue2 = '';
    this.monthValue = '';
    this.selectedValue1 = '';

    setTimeout(() => {
      this.showloader = false;
    }, 550);

    this.service.getUserFilter('Date').subscribe(res => {

      for (let i = 0; i <= res.length; i++) {

        this.dateValues.push(res[i]._id["Date"])

      }
    });

    this.service.getWidgetResult().subscribe(res => {

      this.widgetsResult = res

    });
    //
    this.Rolename = localStorage.getItem("RoleName")

    this.username = localStorage.getItem("currentUser");
    this.userid = localStorage.getItem("userId");
    this.apicall.getUserById(this.userid).subscribe(res => {

      this.getTopReturns()

    });

  }

  getTopReturns() {

    this.service.getTopResults().subscribe(res => {

      this.MarketShareTable = res;
    })
  }

  getTemplateDetails() {
    
    this.parent_company.length = 0;
    this.parent_company = []
    this.apicall.getTemplateById(this.id).subscribe(res => {

      this.template.defaultFilter = res.defaultFilter
   
     if((res.templateDefinition != "undefined") && (res.templateDefinition)){
      
      this.template.templateDefinition = res.templateDefinition
     }else{
     
       this.template.templateDefinition = " "
    }
      
      this.template.customTemplateDesc = res.customTemplateDesc
      this.template.customDashboardName = res.customDashboardName

      console.log(res)
      this.editData(res.emailCustomization)


      this.template.defaultFilter.map((item) => {

        if (item == "Period") {
          this.period = true;
        }
        if (item == "Percentage") {
          this.percentage = true;
        }
        if (item == "Date-Range") {
          this.dateRange = true;
        }
      })
      // if (this.template.defaultFilter == "Period") {
      //   this.period = true;
      // }
      // else {
      //   this.period = false;
      // }

      // if (this.template.defaultFilter == "Percentage") {
      //   this.percentage = true;
      // }
      // else {
      //   this.percentage = false;
      // }
      // if(this.template.defaultFilter=="Date-Range"){
      //   this.dateRange=true;
      // }
      // else {
      //   this.dateRange = false;
      // }

      this.template.table = res.table;
      this.template.contentFilter = res.contentFilter;
      this.template.pageExport = res.pageExport
      if (this.template.table == "Market Share") {
        this.showpercent = true
      }
      else {
        this.showpercent = false
      }
      this.WidgetCount = res.widget;

      this.loadWidgets(this.WidgetCount)
      this.template.templateType = res.templateType
      this.filterfields = JSON.stringify(res.filterOption)
      // let widgets_ = res.widget

      this.template.dashboardName = res.dashboardName
      this.dynamic_filters.length=0;
      this.dynamic_filters = res.filterOption
      for (let i = 0; i < res.filterOption.length; i++) {
        this.getFilterList(res.filterOption[i], i);
      }
      // console.log(this.dropdownfields);

    })
  }

  loadWidgets(multiWidgets: any) {
    console.log(multiWidgets)

    this.barcount = 1;
    this.lineareaCount = 1;
    this.lineCount = 1;
    this.pieCount = 1;
    this.stackedCount = 1;
    this.stackLineCount = 1
    for (let j of multiWidgets) {
      this.widget = j
      this.loadChart(this.widget)
      // console.log(this.widget)
    }
  }
  ngOnDestroy() {
    // Clean sub to avoid memory leak
    this.sub.unsubscribe();
  }

  dateValues: any = [];


  getFilterList(field: string, index: number) {
    this.service.getUserFilter(field).subscribe(res => {
      this.dropdownfields[field] = [];
      this.dropdownfields[field].length =0;
      res.sort((a, b) => 0 - (a._id[field] > b._id[field] ? -1 : 1));
      for (let i = 0; i <= res.length; i++) {

        let obj = {};
        this.dropdownfields[field].push(res[i]._id[field])
        // obj[index] = res[i]._id[field]
        //console.log(obj)
        
        this.parent_company.push(obj)

      }


    });
  }
  updateFilterFields(field: string, basefilter: any) {
    this.service.getCompanyBasedOnParent(field,basefilter).subscribe(res => {
      this.dropdownfields[field] = [];
      this.dropdownfields[field].length =0;
      res.sort((a, b) => 0 - (a._id[field] > b._id[field] ? -1 : 1));
      for (let i = 0; i <= res.length; i++) {

        let obj = {};
        this.dropdownfields[field].push(res[i]._id[field])
       

      }


    });
  }


  applyFilters() {
    
    
    
    if (this.monthValue) {
      this.temp["Month"] = [this.monthValue]
    }
    for (let entry of this.WidgetCount) {

      entry.userFilter = this.temp
    }
    
    if(Object.keys(this.WidgetCount[0].userFilter).length>0){
      let xxxx=Object.keys(this.WidgetCount[0].userFilter);

      let filtersList=JSON.parse(this.filterfields)

    let  filterList= filtersList.filter( function(n) { return !this.has(n) }, new Set(xxxx) );    
    for (let i = 0; i < filterList.length; i++) {
      this.updateFilterFields(filterList[i],this.WidgetCount[0].userFilter)     
    }
   
  }else{
    let filtersList=JSON.parse(this.filterfields);
    for (let i = 0; i < filtersList.length; i++) {
      this.getFilterList(filtersList[i],this.WidgetCount[0].userFilter)     
    }
    
  }
  
    this.loadWidgets(this.WidgetCount)
    this.monthValue = "";
  }
  dateRangeFilter: Object;
  sortOrder: Number;
  ondateChange(from, to) {
    this.dateRangeFilter = {
      from: from,
      to: to
    }
    //console.log(this.dateRangeFilter)
  }
  lineareachead1; lineareachead2; lineareachead3; lineareachead4;
  piechartchead1; piechartchead2; piechartchead3; piechartchead4;
  barchead1; barchead2; barchead3; barchead4;
  linechead1; linechead2; linechead3; linechead4;
  stackedlinechead1; stackedlinechead2; stackedlinechead3; stackedlinechead4;
  stackedbarchead1; stackedbarchead2; stackedbarchead3; stackedbarchead4;
  lineareacdesc1; lineareacdesc2; lineareacdesc3; lineareacdesc4;
  piechartcdesc1; piechartcdesc2; piechartcdesc3; piechartcdesc4;
  barcdesc1; barcdesc2; barcdesc3; barcdesc4;//linechartdesc3
  linecdesc1; linecdesc2; linecdesc3; linecdesc4;
  stackedlinecdesc1; stackedlinecdesc2; stackedlinecdesc3; stackedlinecdesc4;
  stackedbarcdesc1; stackedbarcdesc2; stackedbarcdesc3; stackedbarcdesc4;

  loadChart(widget1: Widgets) {
    this.service.getDynamicData(this.template.table, widget1.chartField, widget1.summaryByFields, widget1.userFilter, widget1.percentFilter, this.template.contentFilter, this.sortOrder, this.dateRangeFilter).subscribe(res => {

      if (this.sortOrder == -1) {
        this.chartResult = res.reverse()
      } else {
        this.chartResult = res;
      }
      // widget1.customDefinition
      if (widget1.chartType == "Line area Chart") {
        if (this.lineareaCount == 1) {
          this.lineAreaChart1 = true
          this.lineareaposition1 = widget1.row
          this.lineareacsv1 = widget1.exportCSV
          this.lineareachead1 = widget1.customeHeading;
          this.lineareacdesc1 = widget1.customDefinition;
          this.lineareapdf1 = widget1.exportPDF
          this.lineareamail1 = widget1.exportMail
          this.lineareaheading1 = widget1.chartHeading
          this.linedesc1 = widget1.graphDefinition
          this.lineareaxaxis1 = widget1.chartField[0]
          this.lineareayaxis1 = widget1.chartField[1]
          this.lineAreaChartOptions.scales.xAxes["0"].scaleLabel.labelString = this.lineareaxaxis1
          this.lineAreaChartOptions.scales.yAxes["0"].scaleLabel.labelString = this.lineareayaxis1
          if (this.lineareaxaxis1 == 'CompanyName') {
            this.linearealabels1 = this.chartResult.map(res => res.address)

          } else {
            this.linearealabels1 = this.chartResult.map(res => res.label);

          }
          if (this.linearealabel1.length > 0) {
            this.linearealabel1.length = 0;
            this.lineAreaChartLabels1.length = 0;
          }
          for (let i = 0; i < this.linearealabels1.length; i++) {
            if(this.linearealabels1[i])
            this.linearealabel1.push(this.linearealabels1[i]);
           
          }
          this.lineAreaChartLabels1 = this.linearealabel1
          let linedata: number[] = this.chartResult.map(res => res.value);
          if (this.lineareadata1.length > 0) {
            this.lineareadata1 = [];
          }
          linedata.forEach((linedata) => {
           
            this.lineareadata1.push(linedata);
            
          });
          this.lineAreaChartData1 = [{ data: this.lineareadata1 }];

          if (this.lineareadata1.length == 0) {
            this.noLineAreaData1 = true;
            this.yesLineAreaData1 = false;
          }
          else {
            this.noLineAreaData1 = false;
            this.yesLineAreaData1 = true;
          }
          this.lineareaCount++;
        }
        else if (this.lineareaCount == 2) {
          this.lineAreaChart2 = true
          this.lineareaposition2 = widget1.row
          this.lineareacsv2 = widget1.exportCSV
          this.lineareachead2 = widget1.customeHeading;
          this.lineareacdesc2 = widget1.customDefinition;
          this.lineareapdf2 = widget1.exportPDF
          this.lineareamail2 = widget1.exportMail
          this.lineareaheading2 = widget1.chartHeading
          this.linedesc2 = widget1.graphDefinition
          this.lineAreaChartOptions2.scales.xAxes["0"].scaleLabel.labelString = this.lineareaxaxis2
          this.lineAreaChartOptions2.scales.yAxes["0"].scaleLabel.labelString = this.lineareayaxis2

          if (this.lineareaxaxis2 == 'CompanyName') {
            this.linearealabels2 = this.chartResult.map(res => res.address)

          } else {
            this.linearealabels2 = this.chartResult.map(res => res.label);

          }
          if (this.linearealabel2.length > 0) {
            this.linearealabel2.length = 0;
            this.lineAreaChartLabels2.length = 0;
          }
          for (let i = 0; i < this.linearealabels2.length; i++) {
            if(this.linearealabels2[i])
            this.linearealabel2.push(this.linearealabels2[i]);
          }
          this.lineAreaChartLabels2 = this.linearealabel2
          let linedata: number[] = this.chartResult.map(res => res.value);
          if (this.lineareadata2.length > 0) {
            this.lineareadata2 = [];
          }
          linedata.forEach((linedata) => {
            this.lineareadata2.push(linedata);
          });
          this.lineAreaChartData2 = [{ data: this.lineareadata2 }];

          if (this.lineareadata2.length == 0) {
            this.noLineAreaData2 = true;
            this.yesLineAreaData2 = false;
          }
          else {
            this.noLineAreaData2 = false;
            this.yesLineAreaData2 = true;
          }

          this.lineareaCount++;
        }
        else if (this.lineareaCount == 3) {
          this.lineAreaChart3 = true
          this.lineareaposition3 = widget1.row
          this.lineareacsv3 = widget1.exportCSV
          this.lineareachead3 = widget1.customeHeading;
          this.lineareacdesc3 = widget1.customDefinition;
          this.lineareapdf3 = widget1.exportPDF
          this.lineareamail3 = widget1.exportMail
          this.lineareaheading3 = widget1.chartHeading
          this.linedesc3 = widget1.graphDefinition
          this.lineAreaChartOptions3.scales.xAxes["0"].scaleLabel.labelString = this.lineareaxaxis3
          this.lineAreaChartOptions3.scales.yAxes["0"].scaleLabel.labelString = this.lineareayaxis3
          if (this.lineareaxaxis3 == 'CompanyName') {
            this.linearealabels3 = this.chartResult.map(res => res.address)

          } else {
            this.linearealabels3 = this.chartResult.map(res => res.label);

          } if (this.linearealabel3.length > 0) {
            this.linearealabel3.length = 0;
            this.lineAreaChartLabels3.length = 0;
          }
          for (let i = 0; i < this.linearealabels3.length; i++) {
            if(this.linearealabels3[i])
            this.linearealabel3.push(this.linearealabels3[i]);
          }
          this.lineAreaChartLabels3 = this.linearealabel3
          let linedata: number[] = this.chartResult.map(res => res.value);
          if (this.lineareadata3.length > 0) {
            this.lineareadata3 = [];
          }
          linedata.forEach((linedata) => {
            this.lineareadata3.push(linedata);
          });
          this.lineAreaChartData3 = [{ data: this.lineareadata3 }];

          if (this.lineareadata3.length == 0) {
            this.noLineAreaData3 = true;
            this.yesLineAreaData3 = false;
          }
          else {
            this.noLineAreaData3 = false;
            this.yesLineAreaData3 = true;
          }

          this.lineareaCount++;
        }
        else if (this.lineareaCount == 4) {
          this.lineAreaChart4 = true
          this.lineareaposition4 = widget1.row
          this.lineareacsv4 = widget1.exportCSV
          this.lineareachead4 = widget1.customeHeading;
          this.lineareacdesc4 = widget1.customDefinition;
          this.lineareapdf4 = widget1.exportPDF
          this.lineareamail4 = widget1.exportMail
          this.lineareaheading4 = widget1.chartHeading
          this.linedesc4 = widget1.graphDefinition
          this.lineAreaChartOptions4.scales.xAxes["0"].scaleLabel.labelString = this.lineareaxaxis4
          this.lineAreaChartOptions4.scales.yAxes["0"].scaleLabel.labelString = this.lineareayaxis4
          if (this.lineareaxaxis4 == 'CompanyName') {
            this.linearealabels4 = this.chartResult.map(res => res.address)

          } else {
            this.linearealabels4 = this.chartResult.map(res => res.label);

          } if (this.linearealabel4.length > 0) {
            this.linearealabel4.length = 0;
            this.lineAreaChartLabels4.length = 0;
          }
          for (let i = 0; i < this.linearealabels4.length; i++) {
            if(this.linearealabels4[i])
            this.linearealabel4.push(this.linearealabels4[i]);
          }
          this.lineAreaChartLabels4 = this.linearealabel4
          let linedata: number[] = this.chartResult.map(res => res.value);
          if (this.lineareadata4.length > 0) {
            this.lineareadata4 = [];
          }
          linedata.forEach((linedata) => {
            this.lineareadata4.push(linedata);
          });
          this.lineAreaChartData4 = [{ data: this.lineareadata4 }];

          if (this.lineareadata4.length == 0) {
            this.noLineAreaData4 = true;
            this.yesLineAreaData4 = false;
          }
          else {
            this.noLineAreaData4 = false;
            this.yesLineAreaData4 = true;
          }
        }

      }

      if (widget1.chartType == "Pie Chart") {


        if (this.pieCount == 1) {
          this.pieChart1 = true
          this.pieposition1 = widget1.row
          this.pieheading1 = widget1.chartHeading
          this.piedesc1 = widget1.graphDefinition
          this.piechartcsv1 = widget1.exportCSV
          this.piechartchead1 = widget1.customeHeading;
          this.piechartcdesc1 = widget1.customDefinition;
          this.piechartpdf1 = widget1.exportPDF
          this.piemail1 = widget1.exportMail
          let doughnutLabels = this.chartResult.map(res => res.label);
          if (this.pielabel1.length > 0) {
            this.pielabel1.length = 0;
            this.pieChartLabels1.length = 0;
          }
          for (let i = 0; i < doughnutLabels.length; i++) {
            if (doughnutLabels[i]) {
              this.pielabel1.push(doughnutLabels[i]);
            }

          }
          this.pieChartLabels1 = this.pielabel1;
          if (widget1.chartField[0] !== 'OemName') {
            for (let i = 0; i < doughnutLabels.length; i++) {
              let color = "#" + ((1 << 24) * Math.random() | 0).toString(16)
              this.colorData.push(color)
              this.pieChartColor =
                [{
                  backgroundColor: this.colorData
                }];
            }
          } else {
            let data = this.chartResult.find((element) => {

              return element.colourData;
            });
            this.pieChartColor =
              [{
                backgroundColor: data.colourData
              }];

          }

          //  data.colourData.map((item)=>{
          //   this.colorData.push(item)
          //  })
          this.pieData1 = this.chartResult.map(res => res.percentage);
          this.pieChartData1 = [{ data: this.pieData1 }];

          if (this.pieData1.length == 0) {
            this.noPieData1 = true;
            this.yesPieData1 = false;
          }
          else {
            this.noPieData1 = false;
            this.yesPieData1 = true;
          }
          this.pieCount++;
        }
        else if (this.pieCount == 2) {
          this.pieChart2 = true
          this.pieposition2 = widget1.row
          this.pieheading2 = widget1.chartHeading
          this.piedesc2 = widget1.graphDefinition
          this.piechartcsv2 = widget1.exportCSV
          this.piechartchead2 = widget1.customeHeading;
          this.piechartcdesc2 = widget1.customDefinition;
          this.piechartpdf2 = widget1.exportPDF
          this.piemail2 = widget1.exportMail
          let doughnutLabels = this.chartResult.map(res => res.label);
          if (this.pielabel2.length > 0) {
            this.pielabel2.length = 0;
            this.pieChartLabels2.length = 0;
          }
          for (let i = 0; i < doughnutLabels.length; i++) {
            this.pielabel2.push(doughnutLabels[i]);
          }
          this.pieChartLabels2 = this.pielabel2;
          if (widget1.chartField[0] !== 'OemName') {
            for (let i = 0; i < doughnutLabels.length; i++) {
              let color = "#" + ((1 << 24) * Math.random() | 0).toString(16)
              this.colorData.push(color)
              this.pieChartColor =
                [{
                  backgroundColor: this.colorData
                }];
            }
          } else {
            let data = this.chartResult.find((element) => {

              return element.colourData;
            });
            this.pieChartColor =
              [{
                backgroundColor: data.colourData
              }];
          }
          this.pieData2 = this.chartResult.map(res => res.percentage);
          this.pieChartData2 = [{ data: this.pieData2 }];

          if (this.pieData2.length == 0) {
            this.noPieData2 = true;
            this.yesPieData2 = false;
          }
          else {
            this.noPieData2 = false;
            this.yesPieData2 = true;
          }

          this.pieCount++;
        }
        else if (this.pieCount == 3) {
          this.pieChart3 = true
          this.pieposition3 = widget1.row
          this.pieheading3 = widget1.chartHeading
          this.piedesc3 = widget1.graphDefinition
          this.piechartcsv3 = widget1.exportCSV
          this.piechartchead3 = widget1.customeHeading;
          this.piechartcdesc3 = widget1.customDefinition;
          this.piechartpdf3 = widget1.exportPDF
          this.piemail3 = widget1.exportMail
          let doughnutLabels = this.chartResult.map(res => res.label);
          if (this.pielabel3.length > 0) {
            this.pielabel3.length = 0;
            this.pieChartLabels3.length = 0;
          }
          for (let i = 0; i < doughnutLabels.length; i++) {
            this.pielabel3.push(doughnutLabels[i]);
          }
          this.pieChartLabels3 = this.pielabel3;
          if (widget1.chartField[0] !== 'OemName') {
            for (let i = 0; i < doughnutLabels.length; i++) {
              let color = "#" + ((1 << 24) * Math.random() | 0).toString(16)
              this.colorData.push(color)
              this.pieChartColor =
                [{
                  backgroundColor: this.colorData
                }];
            }
          } else {
            let data = this.chartResult.find((element) => {

              return element.colourData;
            });
            this.pieChartColor =
              [{
                backgroundColor: data.colourData
              }];
          }
          this.pieData3 = this.chartResult.map(res => res.percentage);
          this.pieChartData3 = [{ data: this.pieData3 }];

          if (this.pieData3.length == 0) {
            this.noPieData3 = true;
            this.yesPieData3 = false;
          }
          else {
            this.noPieData3 = false;
            this.yesPieData3 = true;
          }

          this.pieCount++;
        }
        else if (this.pieCount == 4) {
          this.pieChart4 = true
          this.pieposition4 = widget1.row
          this.pieheading4 = widget1.chartHeading
          this.piedesc4 = widget1.graphDefinition
          this.piechartcsv4 = widget1.exportCSV
          this.piechartchead4 = widget1.customeHeading;
          this.piechartcdesc4 = widget1.customDefinition;
          this.piechartpdf4 = widget1.exportPDF
          this.piemail4 = widget1.exportMail
          let doughnutLabels = this.chartResult.map(res => res.label);
          if (this.pielabel4.length > 0) {
            this.pielabel4.length = 0;
            this.pieChartLabels4.length = 0;
          }
          for (let i = 0; i < doughnutLabels.length; i++) {
            this.pielabel4.push(doughnutLabels[i]);
          }
          this.pieChartLabels4 = this.pielabel4;
          if (widget1.chartField[0] !== 'OemName') {
            for (let i = 0; i < doughnutLabels.length; i++) {
              let color = "#" + ((1 << 24) * Math.random() | 0).toString(16)
              this.colorData.push(color)
              this.pieChartColor =
                [{
                  backgroundColor: this.colorData
                }];
            }
          } else {
            let data = this.chartResult.find((element) => {

              return element.colourData;
            });
            this.pieChartColor =
              [{
                backgroundColor: data.colourData
              }];
          }
          this.pieData4 = this.chartResult.map(res => res.percentage);
          this.pieChartData4 = [{ data: this.pieData4 }];

          if (this.pieData4.length == 0) {
            this.noPieData4 = true;
            this.yesPieData4 = false;
          }
          else {
            this.noPieData4 = false;
            this.yesPieData4 = true;
          }
        }

      }

      if (widget1.chartType == "Bar Chart") {
        if (this.barcount == 1) {

          this.barcsv1 = widget1.exportCSV
          this.barchead1 = widget1.customeHeading;
          this.barchead1 = widget1.customDefinition;
          //alert(widget1.customeHeading)

          this.barpdf1 = widget1.exportPDF
          this.barmail1 = widget1.exportMail
          this.barposition1 = widget1.row
          this.barheading1 = widget1.chartHeading
          this.bardesc1 = widget1.graphDefinition
          this.barxaxis1 = widget1.chartField[0]
          this.baryaxis1 = widget1.chartField[1]
          this.barChartOptions.scales.xAxes["0"].scaleLabel.labelString = this.barxaxis1
          this.barChartOptions.scales.yAxes["0"].scaleLabel.labelString = this.baryaxis1
          this.barChart1 = true;
          //let barlabel1 = this.chartResult.map(res => res.label);

          if (this.barxaxis1 == 'CompanyName') {
            this.barlabels1 = this.chartResult.map(res => res.address)

          } else {
            this.barlabels1 = this.chartResult.map(res => res.label);

          }
          if (this.barlabel1.length > 0) {
            this.barlabel1.length = 0;
            this.barChartLabels1.length = 0;
          }
          for (let i = 0; i < this.barlabels1.length; i++) {
            if(this.barlabels1[i])
            this.barlabel1.push(this.barlabels1[i]);
          }
          this.barChartLabels1 = this.barlabel1
          let bardata: number[] = this.chartResult.map(res => res.value);
          if (this.bardata1.length > 0) {
            this.bardata1 = [];
          }
          bardata.forEach((bardata) => {
            this.bardata1.push(bardata);
          });
          this.barChartData1 = [{ data: this.bardata1 }];

          if (this.bardata1.length == 0) {
            this.noBarData1 = true;
            this.yesBarData1 = false;
          }
          else {
            this.noBarData1 = false;
            this.yesBarData1 = true;
          }
          this.barcount++;
        }
        else if (this.barcount == 2) {
          this.barcsv2 = widget1.exportCSV
          this.barchead2 = widget1.customeHeading;
          this.barchead2 = widget1.customDefinition;
          this.barpdf2 = widget1.exportPDF
          this.barmail2 = widget1.exportMail
          this.barposition2 = widget1.row
          this.barheading2 = widget1.chartHeading
          this.bardesc2 = widget1.graphDefinition
          this.barxaxis2 = widget1.chartField[0]
          this.baryaxis2 = widget1.chartField[1]
          this.barChartOptions2.scales.xAxes["0"].scaleLabel.labelString = this.barxaxis2
          this.barChartOptions2.scales.yAxes["0"].scaleLabel.labelString = this.baryaxis2
          this.barChart2 = true;
          if (this.barxaxis2 == 'CompanyName') {
            this.barlabels2 = this.chartResult.map(res => res.address)

          } else {
            this.barlabels2 = this.chartResult.map(res => res.label);

          }
          if (this.barlabel2.length > 0) {
            this.barlabel2.length = 0;
            this.barChartLabels2.length = 0;
          }
          for (let i = 0; i < this.barlabels2.length; i++) {
            if(this.barlabels2[i])
            this.barlabel2.push(this.barlabels2[i]);
          }
          this.barChartLabels2 = this.barlabel2
          let bardata: number[] = this.chartResult.map(res => res.value);
          if (this.bardata2.length > 0) {
            this.bardata2 = [];
          }
          bardata.forEach((bardata) => {
            this.bardata2.push(bardata);
          });
          this.barChartData2 = [{ data: this.bardata2 }];

          if (this.bardata2.length == 0) {
            this.noBarData2 = true;
            this.yesBarData2 = false;
          }
          else {
            this.noBarData2 = false;
            this.yesBarData2 = true;
          }
          this.barcount++;
        }
        else if (this.barcount == 3) {
          this.barcsv3 = widget1.exportCSV
          this.barchead3 = widget1.customeHeading;
          this.barchead3 = widget1.customDefinition;
          this.barpdf3 = widget1.exportPDF
          this.barmail3 = widget1.exportMail
          this.barposition3 = widget1.row
          this.barheading3 = widget1.chartHeading
          this.bardesc3 = widget1.graphDefinition
          this.barxaxis3 = widget1.chartField[0]
          this.baryaxis3 = widget1.chartField[1]
          this.barChartOptions3.scales.xAxes["0"].scaleLabel.labelString = this.barxaxis3
          this.barChartOptions3.scales.yAxes["0"].scaleLabel.labelString = this.baryaxis3
          this.barChart3 = true;
          if (this.barxaxis3 == 'CompanyName') {
            this.barlabels3 = this.chartResult.map(res => res.address)

          } else {
            this.barlabels3 = this.chartResult.map(res => res.label);

          }
          if (this.barlabel3.length > 0) {
            this.barlabel3.length = 0;
            this.barChartLabels3.length = 0;
          }
          for (let i = 0; i < this.barlabels3.length; i++) {
            if(this.barlabels3[i])
            this.barlabel3.push(this.barlabels3[i]);
          }
          this.barChartLabels3 = this.barlabel3
          let bardata: number[] = this.chartResult.map(res => res.value);
          if (this.bardata3.length > 0) {
            this.bardata3 = [];
          }
          bardata.forEach((bardata) => {
            this.bardata3.push(bardata);
          });
          this.barChartData3 = [{ data: this.bardata3 }];

          if (this.bardata3.length == 0) {
            this.noBarData3 = true;
            this.yesBarData3 = false;
          }
          else {
            this.noBarData3 = false;
            this.yesBarData3 = true;
          }
          this.barcount++;
        }
        else if (this.barcount == 4) {
          this.barcsv4 = widget1.exportCSV
          this.barchead4 = widget1.customeHeading;
          this.barchead4 = widget1.customDefinition;
          this.barpdf4 = widget1.exportPDF
          this.barmail4 = widget1.exportMail
          this.barposition4 = widget1.row
          this.barheading4 = widget1.chartHeading
          this.bardesc4 = widget1.graphDefinition
          this.barxaxis4 = widget1.chartField[0]
          this.baryaxis4 = widget1.chartField[1]
          this.barChartOptions4.scales.xAxes["0"].scaleLabel.labelString = this.barxaxis4
          this.barChartOptions4.scales.yAxes["0"].scaleLabel.labelString = this.baryaxis4
          this.barChart4 = true;
          if (this.barxaxis4 == 'CompanyName') {
            this.barlabels4 = this.chartResult.map(res => res.address)

          } else {
            this.barlabels4 = this.chartResult.map(res => res.label);

          }
          if (this.barlabel4.length > 0) {
            this.barlabel4.length = 0;
            this.barChartLabels4.length = 0;
          }
          for (let i = 0; i < this.barlabels4.length; i++) {
            if(this.barlabels4[i])
            this.barlabel4.push(this.barlabels4[i]);
          }
          this.barChartLabels4 = this.barlabel4
          let bardata: number[] = this.chartResult.map(res => res.value);
          if (this.bardata4.length > 0) {
            this.bardata4 = [];
          }
          bardata.forEach((bardata) => {
            this.bardata4.push(bardata);
          });
          this.barChartData4 = [{ data: this.bardata4 }];

          if (this.bardata4.length == 0) {
            this.noBarData4 = true;
            this.yesBarData4 = false;
          }
          else {
            this.noBarData4 = false;
            this.yesBarData4 = true;
          }
        }

      }

      if (widget1.chartType == "Line Chart") {
        if (this.lineCount == 1) {
          this.linecsv1 = widget1.exportCSV
          this.linechead1 = widget1.customeHeading;
          this.linecdesc1 = widget1.customDefinition;
          this.linepdf1 = widget1.exportPDF
          this.lineposition1 = widget1.row
          this.linemail1 = widget1.exportMail
          this.lineheading1 = widget1.chartHeading
          this.linechartdesc1 = widget1.graphDefinition
          this.linexaxis1 = widget1.chartField[0]
          this.lineyaxis1 = widget1.chartField[1]
          this.lineChartOptions.scales.xAxes["0"].scaleLabel.labelString = this.linexaxis1
          this.lineChartOptions.scales.yAxes["0"].scaleLabel.labelString = this.lineyaxis1
          this.lineChart1 = true;
          // let linelabel1 = this.chartResult.map(res => res.label);
          if (this.linexaxis1 == 'CompanyName') {
            this.linelabels1 = this.chartResult.map(res => res.address)

          } else {
            this.linelabels1 = this.chartResult.map(res => res.label);

          }
          if (this.linelabel1.length > 0) {
            this.linelabel1.length = 0;
            this.lineChartLabels1.length = 0;
          }
          for (let i = 0; i < this.linelabels1.length; i++) {
            if(this.linelabels1[i])
            this.linelabel1.push(this.linelabels1[i]);
          }
          this.lineChartLabels1 = this.linelabel1
          let linedata: number[] = this.chartResult.map(res => res.value);
          if (this.linechartdata1.length > 0) {
            this.linechartdata1 = [];
          }
          linedata.forEach((linedata) => {
            this.linechartdata1.push(linedata);
          });
          this.lineChartData1 = [{ data: this.linechartdata1 }];

          if (this.linechartdata1.length == 0) {
            this.noLineData1 = true;
            this.yesLineData1 = false;
          }
          else {
            this.noLineData1 = false;
            this.yesLineData1 = true;
          }
          this.lineCount++;
        }
        else if (this.lineCount == 2) {
          this.linecsv2 = widget1.exportCSV
          this.linechead2 = widget1.customeHeading;
          this.linecdesc2 = widget1.customDefinition;
          this.linepdf2 = widget1.exportPDF
          this.lineposition2 = widget1.row
          this.linemail2 = widget1.exportMail
          this.lineheading2 = widget1.chartHeading
          this.linechartdesc2 = widget1.graphDefinition
          this.linexaxis2 = widget1.chartField[0]
          this.lineyaxis2 = widget1.chartField[1]
          this.lineChartOptions2.scales.xAxes["0"].scaleLabel.labelString = this.linexaxis2
          this.lineChartOptions2.scales.yAxes["0"].scaleLabel.labelString = this.lineyaxis2
          this.lineChart2 = true;
          if (this.linexaxis2 == 'CompanyName') {
            this.linelabels2 = this.chartResult.map(res => res.address)

          } else {
            this.linelabels2 = this.chartResult.map(res => res.label);

          }
          if (this.linelabel2.length > 0) {
            this.linelabel2.length = 0;
            this.lineChartLabels2.length = 0;
          }
          for (let i = 0; i < this.linelabels2.length; i++) {
            if(this.linelabels2[i])
            this.linelabel2.push(this.linelabels2[i]);
          }
          this.lineChartLabels2 = this.linelabel2
          let linedata: number[] = this.chartResult.map(res => res.value);
          if (this.linechartdata2.length > 0) {
            this.linechartdata2 = [];
          }
          linedata.forEach((linedata) => {
            this.linechartdata2.push(linedata);
          });
          this.lineChartData2 = [{ data: this.linechartdata2 }];

          if (this.linechartdata2.length == 0) {
            this.noLineData2 = true;
            this.yesLineData2 = false;
          }
          else {
            this.noLineData2 = false;
            this.yesLineData2 = true;
          }
          this.lineCount++;
        }
        else if (this.lineCount == 3) {
          this.linecsv3 = widget1.exportCSV
          this.linechead3 = widget1.customeHeading;
          this.linecdesc3 = widget1.customDefinition;
          this.linepdf3 = widget1.exportPDF
          this.lineposition3 = widget1.row
          this.linemail3 = widget1.exportMail
          this.lineheading3 = widget1.chartHeading
          this.linechartdesc3 = widget1.graphDefinition
          this.linexaxis3 = widget1.chartField[0]
          this.lineyaxis3 = widget1.chartField[1]
          this.lineChartOptions3.scales.xAxes["0"].scaleLabel.labelString = this.linexaxis3
          this.lineChartOptions3.scales.yAxes["0"].scaleLabel.labelString = this.lineyaxis3
          this.lineChart3 = true;
          if (this.linexaxis3 == 'CompanyName') {
            this.linelabels3 = this.chartResult.map(res => res.address)

          } else {
            this.linelabels3 = this.chartResult.map(res => res.label);

          }
          if (this.linelabel3.length > 0) {
            this.linelabel3.length = 0;
            this.lineChartLabels3.length = 0;
          }
          for (let i = 0; i < this.linelabels3.length; i++) {
            if(this.linelabels3[i])
            this.linelabel3.push(this.linelabels3[i]);
          }
          this.lineChartLabels3 = this.linelabel3
          let linedata: number[] = this.chartResult.map(res => res.value);
          if (this.linechartdata3.length > 0) {
            this.linechartdata3 = [];
          }
          linedata.forEach((linedata) => {
            this.linechartdata3.push(linedata);
          });
          this.lineChartData3 = [{ data: this.linechartdata3 }];

          if (this.linechartdata3.length == 0) {
            this.noLineData3 = true;
            this.yesLineData3 = false;
          }
          else {
            this.noLineData3 = false;
            this.yesLineData3 = true;
          }
          this.lineCount++;
        }
        else if (this.lineCount == 4) {
          this.linecsv4 = widget1.exportCSV
          this.linechead4 = widget1.customeHeading;
          this.linecdesc4 = widget1.customDefinition;
          this.linepdf4 = widget1.exportPDF
          this.lineposition4 = widget1.row
          this.linemail4 = widget1.exportMail
          this.lineheading4 = widget1.chartHeading
          this.linechartdesc4 = widget1.graphDefinition
          this.linexaxis4 = widget1.chartField[0]
          this.lineyaxis4 = widget1.chartField[1]
          this.lineChartOptions4.scales.xAxes["0"].scaleLabel.labelString = this.linexaxis4
          this.lineChartOptions4.scales.yAxes["0"].scaleLabel.labelString = this.lineyaxis4
          this.lineChart4 = true;
          if (this.linexaxis4 == 'CompanyName') {
            this.linelabels4 = this.chartResult.map(res => res.address)

          } else {
            this.linelabels4 = this.chartResult.map(res => res.label);

          }
          if (this.linelabel4.length > 0) {
            this.linelabel4.length = 0;
            this.lineChartLabels4.length = 0;
          }
          for (let i = 0; i < this.linelabels4.length; i++) {
            if(this.linelabels4[i])
            this.linelabel4.push(this.linelabels4[i]);
          }
          this.lineChartLabels4 = this.linelabel4
          let linedata: number[] = this.chartResult.map(res => res.value);
          if (this.linechartdata4.length > 0) {
            this.linechartdata4 = [];
          }
          linedata.forEach((linedata) => {
            this.linechartdata4.push(linedata);
          });
          this.lineChartData4 = [{ data: this.linechartdata4 }];

          if (this.linechartdata4.length == 0) {
            this.noLineAreaData4 = true;
            this.yesLineData4 = false;
          }
          else {
            this.noLineData4 = false;
            this.yesLineData4 = true;
          }
        }
      }

      if (widget1.chartType == "Stacked Chart") {
        if (this.stackedCount == 1) {

          this.stackedbarcsv1 = widget1.exportCSV
          this.stackedbarchead1 = widget1.customeHeading;
          this.stackedbarcdesc1 = widget1.customDefinition;
          this.stackedbarpdf1 = widget1.exportPDF
          this.stackedbarposition1 = widget1.row
          this.stackedbarmail1 = widget1.exportMail
          this.stackbarheading1 = widget1.chartHeading
          this.stackdesc1 = widget1.graphDefinition
          this.stackxaxis1 = widget1.chartField[0]
          this.stackyaxis1 = widget1.chartField[1]
          this.stackChartOptions.scales.xAxes["0"].scaleLabel.labelString = this.stackxaxis1
          this.stackChartOptions.scales.yAxes["0"].scaleLabel.labelString = this.stackyaxis1
          this.stackedBar1 = true;
          let stacklabel = this.stackLabelResult(widget1.chartField[0], widget1.chartField[2], this.chartResult)

          if (this.stackedlabel1.length > 0) {
            this.stackedlabel1 = [];
            this.stackChartLabels = [];
          }

          stacklabel.forEach((stacklabel) => {
            if (stacklabel) {

              this.stackedlabel1.push(stacklabel);
            }


          });
          this.stackChartLabels = this.stackedlabel1;


          let stackdata = this.stackedFormat(this.chartResult, widget1.chartField[2])
          if (this.stacked_data1.length > 0) {
            this.stacked_data1.length = 0;
            this.stackChartData.length = 0;
            this.stackChartData = [];
          }
          stackdata.forEach((stackdata) => {
            this.stacked_data1.push(stackdata);
          });

          this.stackChartData = this.stacked_data1;

          if (this.stacked_data1.length == 0) {
            this.noStackChartData1 = true;
            this.yesStackChartData1 = false;
          }
          else {
            this.noStackChartData1 = false;
            this.yesStackChartData1 = true;
          }
          this.stackedCount++;
        }
        else if (this.stackedCount == 2) {
          this.stackedbarcsv2 = widget1.exportCSV
          this.stackedbarchead2 = widget1.customeHeading;
          this.stackedbarcdesc2 = widget1.customDefinition;
          this.stackedbarpdf2 = widget1.exportPDF
          this.stackedbarposition2 = widget1.row
          this.stackedbarmail2 = widget1.exportMail
          this.stackbarheading2 = widget1.chartHeading
          this.stackdesc2 = widget1.graphDefinition
          this.stackxaxis2 = widget1.chartField[0]
          this.stackyaxis2 = widget1.chartField[1]
          this.stackChartOptions2.scales.xAxes["0"].scaleLabel.labelString = this.stackxaxis2
          this.stackChartOptions2.scales.yAxes["0"].scaleLabel.labelString = this.stackyaxis2
          this.stackedBar2 = true;
          let stacklabel = this.stackLabelResult(widget1.chartField[0], widget1.chartField[2], this.chartResult)

          if (this.stackedlabel2.length > 0) {
            this.stackedlabel2 = [];
            this.stackChartLabels2 = [];
          }

          stacklabel.forEach((stacklabel) => {
            if (stacklabel)
              this.stackedlabel2.push(stacklabel);
          });
          this.stackChartLabels2 = this.stackedlabel2
          // for (let i = 0; i < stacklabel.length; i++) {
          //   let color = "#" + ((1 << 24) * Math.random() | 0).toString(16)
          //   this.colorData.push(color)
          // }
          let stackdata = this.stackedFormat(this.chartResult, widget1.chartField[2])
          if (this.stacked_data2.length > 0) {
            this.stacked_data2.length = 0;
            this.stackChartData2.length = 0;
            this.stackChartData2 = [];
          }
          stackdata.forEach((stackdata) => {
            this.stacked_data2.push(stackdata);
          });
          this.stackChartData2 = this.stacked_data2;

          if (this.stacked_data2.length == 0) {
            this.noStackChartData2 = true;
            this.yesStackChartData2 = false;
          }
          else {
            this.noStackChartData2 = false;
            this.yesStackChartData2 = true;
          }
          this.stackedCount++;
        }
        else if (this.stackedCount == 3) {
          this.stackedbarcsv3 = widget1.exportCSV
          this.stackedbarchead3 = widget1.customeHeading;
          this.stackedbarcdesc3 = widget1.customDefinition;
          this.stackedbarpdf3 = widget1.exportPDF
          this.stackedbarposition3 = widget1.row
          this.stackedbarmail3 = widget1.exportMail
          this.stackbarheading3 = widget1.chartHeading
          this.stackdesc3 = widget1.graphDefinition
          this.stackxaxis3 = widget1.chartField[0]
          this.stackyaxis3 = widget1.chartField[1]
          this.stackChartOptions3.scales.xAxes["0"].scaleLabel.labelString = this.stackxaxis3
          this.stackChartOptions3.scales.yAxes["0"].scaleLabel.labelString = this.stackyaxis3
          this.stackedBar3 = true;
          let stacklabel = this.stackLabelResult(widget1.chartField[0], widget1.chartField[2], this.chartResult)

          if (this.stackedlabel3.length > 0) {
            this.stackedlabel3 = [];
            this.stackChartLabels3 = [];
          }

          stacklabel.forEach((stacklabel) => {
            if (stacklabel)
              this.stackedlabel3.push(stacklabel);
          });
          this.stackChartLabels3 = this.stackedlabel3
          // for (let i = 0; i < stacklabel.length; i++) {
          //   let color = "#" + ((1 << 24) * Math.random() | 0).toString(16)
          //   this.colorData.push(color)
          // }
          let stackdata = this.stackedFormat(this.chartResult, widget1.chartField[2])
          if (this.stacked_data3.length > 0) {
            this.stacked_data3.length = 0;
            this.stackChartData3.length = 0;
            this.stackChartData3 = [];
          }
          stackdata.forEach((stackdata) => {
            this.stacked_data3.push(stackdata);
          });
          this.stackChartData3 = this.stacked_data3;

          if (this.stacked_data3.length == 0) {
            this.noStackChartData3 = true;
            this.yesStackChartData3 = false;
          }
          else {
            this.noStackChartData3 = false;
            this.yesStackChartData3 = true;
          }
          this.stackedCount++;
        }
        else if (this.stackedCount == 4) {
          this.stackedbarcsv4 = widget1.exportCSV
          this.stackedbarchead4 = widget1.customeHeading;
          this.stackedbarcdesc4 = widget1.customDefinition;
          this.stackedbarpdf4 = widget1.exportPDF
          this.stackedbarposition4 = widget1.row
          this.stackedbarmail4 = widget1.exportMail
          this.stackbarheading4 = widget1.chartHeading
          this.stackdesc4 = widget1.graphDefinition
          this.stackxaxis4 = widget1.chartField[0]
          this.stackyaxis4 = widget1.chartField[1]
          this.stackChartOptions4.scales.xAxes["0"].scaleLabel.labelString = this.stackxaxis4
          this.stackChartOptions4.scales.yAxes["0"].scaleLabel.labelString = this.stackyaxis4
          this.stackedBar4 = true;
          let stacklabel = this.stackLabelResult(widget1.chartField[0], widget1.chartField[2], this.chartResult)

          if (this.stackedlabel4.length > 0) {
            this.stackedlabel4 = [];
            this.stackChartLabels4 = [];
          }

          stacklabel.forEach((stacklabel) => {
            if (stacklabel)
              this.stackedlabel4.push(stacklabel);
          });
          this.stackChartLabels4 = this.stackedlabel4
          // for (let i = 0; i < stacklabel.length; i++) {
          //   let color = "#" + ((1 << 24) * Math.random() | 0).toString(16)
          //   this.colorData.push(color)
          // }
          let stackdata = this.stackedFormat(this.chartResult, widget1.chartField[2])
          if (this.stacked_data4.length > 0) {
            this.stacked_data4.length = 0;
            this.stackChartData4.length = 0;
            this.stackChartData4 = [];
          }
          stackdata.forEach((stackdata) => {
            this.stacked_data4.push(stackdata);
          });
          this.stackChartData4 = this.stacked_data4;

          if (this.stacked_data4.length == 0) {
            this.noStackChartData4 = true;
            this.yesStackChartData4 = false;
          }
          else {
            this.noStackChartData4 = false;
            this.yesStackChartData4 = true;
          }
        }

      }

      if (widget1.chartType == "Stacked Line Chart") {

        if (this.stackLineCount == 1) {
          this.stackedlinecsv1 = widget1.exportCSV
          this.stackedlinechead1 = widget1.customeHeading;
          this.stackedlinecdesc1 = widget1.customDefinition;
          this.stackedlinepdf1 = widget1.exportPDF
          this.stackedlineposition1 = widget1.row
          this.stackedlinemail1 = widget1.exportMail
          this.stacklineheading1 = widget1.chartHeading
          this.stacklinedesc1 = widget1.graphDefinition
          this.stacklinexaxis1 = widget1.chartField[0]
          this.stacklineyaxis1 = widget1.chartField[1]
          this.stackLineOptions.scales.xAxes["0"].scaleLabel.labelString = this.stacklinexaxis1
          this.stackLineOptions.scales.yAxes["0"].scaleLabel.labelString = this.stacklineyaxis1
          this.stackedline1 = true;
          let stacklinelabel = this.stackLineResult(this.chartResult)

          if (this.stacklinelabel1.length > 0) {
            this.stacklinelabel1 = [];
            this.stackLineLabels = [];
          }

          stacklinelabel.forEach((stacklinelabel) => {
            if (stacklinelabel)
              this.stacklinelabel1.push(stacklinelabel);
          });
          this.stackLineLabels = this.stacklinelabel1
          // for (let i = 0; i < stacklinelabel.length; i++) {
          //   let color = "#" + ((1 << 24) * Math.random() | 0).toString(16)
          //   this.colorData.push(color)
          // }
          let stacklinedata = this.stackLineFormat(widget1.chartField[2], this.chartResult)
          if (this.stacklinedata1.length > 0) {
            this.stacklinedata1.length = 0;

            this.stackLineData.length = 0;
            this.stackLineData = [];
          }

          stacklinedata.forEach((stacklinedata) => {
            this.stacklinedata1.push(stacklinedata);
          });
          this.stackLineData = this.stacklinedata1;

          if (this.stacklinedata1.length == 0) {
            this.noStackedLineData1 = true;
            this.yesStackLineData1 = false;
          }
          else {
            this.noStackedLineData1 = false;
            this.yesStackLineData1 = true;
          }
          this.stackLineCount++;
        }

        else if (this.stackLineCount == 2) {
          this.stackedlinecsv2 = widget1.exportCSV
          this.stackedlinechead2 = widget1.customeHeading;
          this.stackedlinecdesc2 = widget1.customDefinition;
          this.stackedlinepdf2 = widget1.exportPDF
          this.stackedlineposition2 = widget1.row
          this.stackedlinemail2 = widget1.exportMail
          this.stacklineheading2 = widget1.chartHeading
          this.stacklinedesc2 = widget1.graphDefinition
          this.stacklinexaxis2 = widget1.chartField[0]
          this.stacklineyaxis2 = widget1.chartField[1]
          this.stackLineOptions2.scales.xAxes["0"].scaleLabel.labelString = this.stacklinexaxis2
          this.stackLineOptions2.scales.yAxes["0"].scaleLabel.labelString = this.stacklineyaxis2
          this.stackedline2 = true;
          let stacklinelabel = this.stackLineResult(this.chartResult)

          if (this.stacklinelabel2.length > 0) {
            this.stacklinelabel2 = [];
            this.stackLineLabels2 = [];
          }

          stacklinelabel.forEach((stacklinelabel) => {
            if (stacklinelabel)
              this.stacklinelabel2.push(stacklinelabel);
          });
          this.stackLineLabels2 = this.stacklinelabel2
          // for (let i = 0; i < stacklinelabel.length; i++) {
          //   let color = "#" + ((1 << 24) * Math.random() | 0).toString(16)
          //   this.colorData.push(color)
          // }
          let stacklinedata = this.stackLineFormat(widget1.chartField[2], this.chartResult)
          if (this.stacklinedata2.length > 0) {
            this.stacklinedata2.length = 0;

            this.stackLineData2.length = 0;
            this.stackLineData2 = [];
          }
          stacklinedata.forEach((stacklinedata) => {
            this.stacklinedata2.push(stacklinedata);
          });
          this.stackLineData2 = this.stacklinedata2;

          if (this.stacklinedata2.length == 0) {
            this.noStackedLineData2 = true;
            this.yesStackedLineData2 = false;
          }
          else {
            this.noStackedLineData2 = false;
            this.yesStackedLineData2 = true;
          }

          this.stackLineCount++;
        }

        else if (this.stackLineCount == 3) {
          this.stackedlinecsv3 = widget1.exportCSV
          this.stackedlinechead3 = widget1.customeHeading;
          this.stackedlinecdesc3 = widget1.customDefinition;
          this.stackedlinepdf3 = widget1.exportPDF
          this.stackedlineposition3 = widget1.row
          this.stackedlinemail3 = widget1.exportMail
          this.stacklineheading3 = widget1.chartHeading
          this.stacklinedesc3 = widget1.graphDefinition
          this.stacklinexaxis3 = widget1.chartField[0]
          this.stacklineyaxis3 = widget1.chartField[1]
          this.stackLineOptions3.scales.xAxes["0"].scaleLabel.labelString = this.stacklinexaxis3
          this.stackLineOptions3.scales.yAxes["0"].scaleLabel.labelString = this.stacklineyaxis3
          this.stackedline3 = true;
          let stacklinelabel = this.stackLineResult(this.chartResult)

          if (this.stacklinelabel3.length > 0) {
            this.stacklinelabel3 = [];
            this.stackLineLabels3 = [];
          }

          stacklinelabel.forEach((stacklinelabel) => {
            if (stacklinelabel)
              this.stacklinelabel3.push(stacklinelabel);
          });
          this.stackLineLabels3 = this.stacklinelabel3
          // for (let i = 0; i < stacklinelabel.length; i++) {
          //   let color = "#" + ((1 << 24) * Math.random() | 0).toString(16)
          //   this.colorData.push(color)
          // }
          let stacklinedata = this.stackLineFormat(widget1.chartField[2], this.chartResult)
          if (this.stacklinedata3.length > 0) {
            this.stacklinedata3.length = 0;

            this.stackLineData3.length = 0;
            this.stackLineData3 = [];
          }
          stacklinedata.forEach((stacklinedata) => {
            this.stacklinedata3.push(stacklinedata);
          });
          this.stackLineData3 = this.stacklinedata3;

          if (this.stacklinedata3.length == 0) {
            this.noStackedLineData3 = true;
            this.yesStackedLineData3 = false;
          }
          else {
            this.noStackedLineData3 = false;
            this.yesStackedLineData3 = true;
          }
          this.stackLineCount++;
        }

        else if (this.stackLineCount == 4) {
          this.stackedlinecsv4 = widget1.exportCSV
          this.stackedlinechead4 = widget1.customeHeading;
          this.stackedlinecdesc4 = widget1.customDefinition;
          this.stackedlinepdf4 = widget1.exportPDF
          this.stackedlineposition4 = widget1.row
          this.stackedlinemail4 = widget1.exportMail
          this.stacklineheading4 = widget1.chartHeading
          this.stacklinedesc4 = widget1.graphDefinition
          this.stacklinexaxis4 = widget1.chartField[0]
          this.stacklineyaxis4 = widget1.chartField[1]
          this.stackLineOptions4.scales.xAxes["0"].scaleLabel.labelString = this.stacklinexaxis4
          this.stackLineOptions4.scales.yAxes["0"].scaleLabel.labelString = this.stacklineyaxis4
          this.stackedline4 = true;
          let stacklinelabel = this.stackLineResult(this.chartResult)

          if (this.stacklinelabel4.length > 0) {
            this.stacklinelabel4 = [];
            this.stackLineLabels4 = [];
          }

          stacklinelabel.forEach((stacklinelabel) => {
            if (stacklinelabel)
              this.stacklinelabel4.push(stacklinelabel);
          });
          this.stackLineLabels4 = this.stacklinelabel4
          // for (let i = 0; i < stacklinelabel.length; i++) {
          //   let color = "#" + ((1 << 24) * Math.random() | 0).toString(16)
          //   this.colorData.push(color)
          // }
          let stacklinedata = this.stackLineFormat(widget1.chartField[2], this.chartResult)
          if (this.stacklinedata4.length > 0) {
            this.stacklinedata4.length = 0;

            this.stackLineData4.length = 0;
            this.stackLineData4 = [];
          }
          stacklinedata.forEach((stacklinedata) => {
            this.stacklinedata4.push(stacklinedata);
          });
          this.stackLineData4 = this.stacklinedata4;

          if (this.stacklinedata4.length == 0) {
            this.noStackedLineData4 = true;
            this.yesStackedLineData4 = false;
          }
          else {
            this.noStackedLineData4 = false;
            this.yesStackedLineData4 = true;
          }
        }
      }
    });
  }



  stackLabelResult(xaxez, zaxes, sampleResult) {

    this.text.length = 0;
    let colourArry = [];
    for (let i of sampleResult) {
      
      this.text.push(i.label)
      //if (xaxez == 'OemName' || zaxes == 'OemName') {
        if (xaxez == 'OemName' || zaxes == 'OemName') {
        if (i.colour)
          colourArry.push({ backgroundColor: '#' + i.colour })
      } else {
        for (let j = 0; j < sampleResult.length; j++) {
          let color = "#" + ((1 << 24) * Math.random() | 0).toString(16)
          this.colorData.push(color)
          this.stackChartColor =
            [{
              backgroundColor: this.colorData
            }];
        }
      }
    }
    //debugger
   // this.stackChartColor = colourArry.filter((e, i) => colourArry.findIndex(a => a.backgroundColor === e.backgroundColor) === i);
    // console.log(this.stackChartColor )
    this.stacklabel = Array.from(new Set(this.text))
    
    return this.stacklabel;
  }
  stackcsv; colourCode;
  stackedFormat(sampleResult, zaxes) {
    this.stackcsv = sampleResult;
    this.stackdata.length = 0;
    let colourArry = [];

    sampleResult.map((item, index) => {

      if (item.name) {
        if (zaxes == 'OemName') {
          this.colourCode = '#' + item.colour
        } else {
          this.colourCode = "#" + ((1 << 24) * Math.random() | 0).toString(16)
        }
        //  colourArry.push({ backgroundColor: '#' + item.colour })
        if (this.stackdata.length < 1) {


          this.stackdata.push({ data: [item.value], label: item.name, backgroundColor: this.colourCode })
        } else {
          var exist = this.stackdata.findIndex(ix => ix.label == item.name);
          if (exist >= 0) {
            this.stackdata[exist].data.push(item.value)
          }
          else {

            this.stackdata.push({ data: [item.value], label: item.name, backgroundColor: this.colourCode })
          }
        }
      }
    })
    return this.stackdata;


  }


  linetext: any = [];

  stackLineResult(sampleResult) {
    this.linetext.length = 0;
    for (let i of sampleResult) {
      this.linetext.push(i.label)
    }
    this.stacklinelabel = Array.from(new Set(this.linetext))
    return this.stacklinelabel;
  }
  stacklinecsv;
  stackLineFormat(zaxes, sampleResult) {
    this.stacklinecsv = sampleResult;
    this.stacklinedata.length = 0;

    sampleResult.map((item, index) => {
      if (item.name) {
        if (zaxes == 'OemName') {
          this.colourCode = '#' + item.colour
        } else {
          this.colourCode = "#" + ((1 << 24) * Math.random() | 0).toString(16)
        }
        //  colourArry.push({ backgroundColor: '#' + item.colour })
        if (this.stacklinedata.length < 1) {


          this.stacklinedata.push({ data: [item.value], label: item.name, backgroundColor: this.colourCode })
        } else {
          var exist = this.stacklinedata.findIndex(ix => ix.label == item.name);
          if (exist >= 0) {
            this.stacklinedata[exist].data.push(item.value)
          }
          else {

            this.stacklinedata.push({ data: [item.value], label: item.name, backgroundColor: this.colourCode })
          }
        }
      }


    })
    return this.stacklinedata;

  }
  startDate; endDate;
  reset() {

    this.noStackedLineData1 = false; this.noStackedLineData2 = false; this.noStackedLineData3 = false; this.noStackedLineData4 = false;
    this.noStackChartData1 = false; this.noStackChartData2 = false; this.noStackChartData3 = false; this.noStackChartData4 = false;
    this.noLineAreaData1 = false; this.noLineAreaData2 = false; this.noLineAreaData3 = false; this.noLineAreaData4 = false;
    this.noLineData1 = false; this.noLineData2 = false; this.noLineData3 = false; this.noLineData4 = false;
    this.noPieData1 = false; this.noPieData2 = false; this.noPieData3 = false; this.noPieData4 = false;
    this.noBarData1 = false; this.noBarData2 = false; this.noBarData3 = false; this.noBarData4 = false;


    this.getTemplateDetails();
    this.selectedValue2 = '';
    this.monthValue = '';
    this.selectedValue1 = '';
    this.temp = {};
    this.dropdownfields = {}
    this.startDate = '';
    this.endDate = '';
    this.percentvalue = "";
    this.dateRangeFilter = { from: undefined }
    for (let entry of this.WidgetCount) {
      if (entry.hasOwnProperty('userFilter')) {
        delete entry.userFilter;
      }
      if (entry.hasOwnProperty('percentFilter')) {

        delete entry.percentFilter;
      }
    }


  }
  changePassword() {
    this.router.navigate(['/changepassword/', this.userid]);
  }

  goToTrigger() {
    this.router.navigate(['/usertrigger/', this.userid]);

  }
  selectedValue2: string;
  onChangeMonth(event) {
    if (this.selectedValue2 == "nofilter") {
      this.reset()
    }
    else {
      for (let entry of this.WidgetCount) {
        entry.chartField["0"] = this.selectedValue2;

      }
      // this.loadWidgets(this.WidgetCount)
      // this.applyFilters()
    }


  }
  onChangeYear() {
    if (this.selectedValue1 == "nofilter") {
      this.reset()
    } else {
      for (let entry of this.WidgetCount) {
        let temp: number = +  this.selectedValue1
        entry["userFilter"] = { "Year": temp }
      }
      // this.loadWidgets(this.WidgetCount)
      // this.applyFilters()
    }
  }
  temp = {};
  onChangePC(a, i) {
    console.log(a, i)
    if (a.length < 1) {
      let filterPam = JSON.parse(this.filterfields);
      delete this.temp[filterPam[i]]
      this.dynamic_filters[i] = filterPam[i]

    }
    else {
      let filterPam = JSON.parse(this.filterfields);
      this.temp[filterPam[i]] = a
      //  this.applyFilters()
      //  this.loadWidgets(this.WidgetCount)
    }
  }

  monthValue: string;
  onChangePercent() {
    if (this.percentvalue == "nofilter") {
      this.reset()
    }
    else {
      for (let entry of this.WidgetCount) {
        let temp: number = +this.percentvalue
        entry["percentFilter"] = temp
      }
      //  this.loadWidgets(this.WidgetCount)
      //  this.applyFilters()
    }
  }



  pdfHtml(id, name) {

    let saro = new CustomizedTemplateComponent(this.service, this.route, this.http, this.model, this.apicall, this.router, this.datepipe);
    let created_id = '7' + id;
    saro.pdfHtml(created_id, name)


    // console.log(id,name)
    // this.hidefilter = false;
    // setTimeout(() => {
    //   this.hidefilter = true;
    // }, 10);
    // const elementToPrint = document.getElementById(id); //The html element to become a pdf
    // console.log(elementToPrint)
    // const pdf = new jsPDF('p', 'mm', 'a4');
    // //console.log(pdf)

    // pdf.addHTML(elementToPrint, () => {
    //   pdf.save(name + '.pdf');
    // });

    //  this.router.navigate(['customized-template/',this.id])
  }
  emailPdf(email) {
    debugger
    if (!this.emailFields) {
      this.emailFields = {}
      this.emailFields["emailSubject"] = this.EmailHeading;
      this.emailFields["emailBody"] = 'Please find the attachment';
    }


    this.closepopup()
    const elementToPrint = document.getElementById(this.emailDiv); //The html element to become a pdf
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addHTML(elementToPrint, () => {
      var dataString = pdf.output('datauristring');
      this.service.emailDashboard({ "data": dataString, emailSubject: this.emailFields.emailSubject, emailBody: this.emailFields.emailBody, email: email }).subscribe(res => {
      })
      // this.closepopup()
    });
  }
  convertToCSV(objArray) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in array[i]) {
        if (line != '') line += ','
        line += array[i][index];
      }
      str += line + '\r\n';
    }
    return str;
  }

  exportCSVFile(headers, items, fileTitle) {
    if (headers) {
      items.unshift(headers);
    }
    var jsonObject = JSON.stringify(items);
    var csv = this.convertToCSV(jsonObject);
    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
      var link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", exportedFilenmae);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
  download(title, values, label, type) {


    let headers: any;
    this.WidgetCount.map((data) => {
      if (data.chartHeading == title) {
        headers = {
          label: data.chartField[0],
          value: data.chartField[1]

        };
      }
    })
    this.csvFormat.length = 0;

    if (type == 'stacked') {
      let value = this.stackcsv;
      for (var i = 0; i < value.length; i++) {
        let temp = { label: value[i].label, value: value[i].value, name: value[i].name }
        this.csvFormat.push(temp)
      }
    } else {
      let value = values[0].data;
      for (var i = 0; i < label.length; i++) {
        let temp = { label: label[i], value: value[i] }
        this.csvFormat.push(temp)
      }
    }

    this.exportCSVFile(headers, this.csvFormat, title); // call the exportCSVFile() function to process the JSON and trigger the download
  }
  showHide: boolean = false;
  emailDiv: string;
  EmailHeading: string;
  showPass(data, heading) {
    debugger
    this.EmailHeading = heading
    this.emailDiv = '7' + data
    this.showHide = true;
  }
  closepopup() {
    this.showHide = !this.showHide
  }

  sortOrderChange(value) {
    this.sortOrder = value;
    this.loadWidgets(this.WidgetCount)
  }

  pieChartHovered(e) {
  }
  status: boolean;
  emailTemplate: boolean;


  editData(id) {
    this.status = true;
    this.emailTemplate = true;

    this.apicall.editemailvalues(id).subscribe(
      res => {
        this.emailFields = res;
        console.log(this.emailFields)
      });

  }
}