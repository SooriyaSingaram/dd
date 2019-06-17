import { Component, OnInit, OnDestroy, TemplateRef, Input, ViewChild, ElementRef } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { ChartService } from '../../services/chart.service';
import { ModelDataService } from '../../services/model-data.service';
import { ApicallService } from '../../services/apicall.service';
import { Templates, Widgets } from '../../WidgetsModel';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.scss']
})
export class EditTemplateComponent implements OnInit {

  constructor(private service: ChartService, private router: Router, private model: ModelDataService, private route: ActivatedRoute, private apicall: ApicallService, private alert: AlertService) { }

  status: boolean;
  @Input() template: Templates
  @Input() widget: Widgets
  tablelist: any[] = [];
  fields: any[] = [];
  chartfields: any[] = [];
  checkedFields: any[] = [];
  selectedtableField: any[] = [];
  state: boolean = false;
  dropdownSettings: any;
  dynamicTemplates: any[] = [];
  samplearray: any[] = [];
  parent_company: any[] = [];
  company_name: any[] = [];
  Rolename: string;
  filterlabel: string;
  hidefilters: boolean = true;
  WidgetCount: any;
  filterfields;
  normalbar:boolean=true;
  stackbar:boolean= false;
  linenormal:boolean=true;
  stackline:boolean=false;

  public itemsDropped1: Array<any> = [];
  public itemsDropped2: Array<any> = [];
  public itemsDropped3: Array<any> = [];
  public itemsDropped4: Array<any> = [];
  public itemsDropped5: Array<any> = [];
  
  showHide: boolean =false;
  HideShow: boolean =false;    
  username: string;

  barChart: boolean = false;
  doChart: boolean = false;
  columnChart: boolean = false;
  linenewChart: boolean = false;
  result: string;
  dropArea: boolean = false;

  enableupdatetemplatebtn: boolean = true;


  public barChartLabels: string[] = ['2011', '2012', '2013', '2014', '2015', '2016', '2017'];
  public barChartColor: {}[] = [{ backgroundColor: [] }]
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartOptions: any = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    scaleShowVerticalLines: true,
    responsive: true
  };

  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Quantity', backgroundColor: '' },
    { data: [35, 49, 70, 91, 76, 25, 70], label: 'Sales', backgroundColor: 'rgba(55, 222, 207, 1)' },
    { data: [15, 35, 38, 68, 45, 87, 61], label: 'Store', backgroundColor: 'rgba(68, 71, 101, 1)' }
  ];

  public pieChartLabels: string[] = ['January', 'February', 'March'];
  public pieChartData: number[] = [300, 450, 100];

  public pieChartLegend: boolean = true;
  public colorsPie: {}[] = [{ backgroundColor: ['#288C82', '#38DACD', '#28C1AB', '#32BCAF'] }]

  public lineareaChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Quantity' },
    { data: [35, 49, 70, 91, 76, 25, 70], label: 'Sales' }

  ];
  public lineareaChartLegend: boolean = true;
  public lineareaChartType: string = 'line';
  public lineareaChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  //public lineChartColors: {}[] = [];
  public lineareaChartColors: Array<any> = [
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
  public lineareaChartOptions: any = {
    responsive: true
  };



  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Quantity' },
    { data: [35, 49, 70, 31, 26, 25, 30], label: 'Sales' },
    { data: [15, 29, 50, 21, 16, 5, 10], label: 'store' }

  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartColors: Array<any> = [
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
  public lineChartOptions: any = {
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


  yaxis: string;
  xaxis: string;
  zaxis:string;
  y_axis: string;
  x_axis: string;
  z_axis: string;
  summaryBy: any = [];
  showForm: boolean = false;
  comparison_operator: any[] = ['EqualTo', 'Contains','GreaterThan','LessThan'];
    defaultfilters:any=['Period','Percentage','Date-Range'];
  heading: string; summary: any; csv: boolean = false; pdf: boolean = false; mail: boolean = false; position: string; ctype: string;graphdesc:String;


  close(data) {
    document.getElementById(data).className = 'hideChart';
    document.getElementById(data + 1).className = 'hideChart';

    // this.el.nativeElement.style.display='none';
    this.widget = new Widgets()
    this.position = data

    let result =  this.template.widget.findIndex(item => item.row == this.widget.row)
    console.log(result)
    if(result <=0){
     this.template.widget.splice(result,1)
     
    }

    if (data == "item1") {
      this.droparea1 = true;
    }
    if (data == "item2") {
      this.droparea2 = true;

    }
    if (data == "item3") {
      this.droparea3 = true;

    }
    if (data == "item4") {
      this.droparea4 = true;

    }
    if (data == "item5") {
      this.droparea5 = true;

    }
    // this.itemsDropped1 = [];
    // this.itemsDropped1.length = 0;

    this.summary = [];
    this.heading = "";
    this.graphdesc=""
    this.csv = false;
    this.pdf = false;
    this.mail = false;
    this.position = "";
    this.ctype = "";
    this.x_axis="";
    this.y_axis="";
    this.showHide =false;
    this.HideShow =false;   
    this.ZAxis=false;
    this.zaxis == ""
    this.z_axis = '';

     this.showForm = false; 

     this.enableupdatetemplatebtn = true;
  }



  public itemsToDrop: Array<Object> = [

    {
      content: "<div><img src='../assets/images/barchart4.png'></div>",
      id: 2,
      type: "Bar Chart"
    },
    {
      content: "<div><img src='../assets/images/piechart.png'></div>",
      id: 3,
      type: "Pie Chart"
    },
    {
      content: "<div><img src='../assets/images/analytics4.png'></div>",
      id: 4,
      type: "Line area Chart"
    },
    {
      content: "<div><img src='../assets/images/linechart.png'></div>",
      id: 5,
      type: "Line Chart"
    },

  ]


  id: String;
  private sub: any;
  filter: any;

  ngOnInit() {

    this.service.getTable().subscribe(response => {
      this.tablelist = response;
    })

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    if (this.id != "0") {

      this.template = new Templates();
      this.widget = new Widgets();
      this.apicall.getTemplateById(this.id).subscribe(res => {
        this.template = res;
        this.template.templateType = res.templateType
        this.template = JSON.parse(JSON.stringify(this.template))
        this.WidgetCount = res.widget;
        
        this.loadWidgets(this.WidgetCount)
        this.service.getFieldname().subscribe(response => {
          let count = 0
          for (let i of response) {
            this.fields.push({ "id": count, "itemName": i })
            count++;
          }
          this.chartfields = response;
        });

      });

      this.widget.exportCSV = false;
      this.widget.exportPDF = false;
      this.widget.exportMail = false;
    }

    else {
      this.template = new Templates();
      this.widget = new Widgets();
    }

  }


  droparea1: boolean = true; droparea2: boolean = true;; droparea3: boolean = true;; droparea4: boolean = true;droparea5:boolean=true;
  loadWidgets(multiWidgets: any) {
    for (let j of multiWidgets) {
      if (j.row == "item1") {
        this.droparea1 = false;
      }
      if (j.row == "item2") {
        this.droparea2 = false;

      }
      if (j.row == "item3") {
        this.droparea3 = false;

      }
      if (j.row == "item4") {
        this.droparea4 = false;
      }
      if (j.row == "item5") {
        this.droparea5 = false;
      }
      // this.widget = j
      // this.loadChart(this.widget)

    }
  }


  public addDropItem(positionType, dropType, event) {

    this.enableupdatetemplatebtn = false;
    
    this.ctype = event.type;
    if(event.type =='Bar Chart'){
      this.showHide =true;
      this.HideShow =false;
      
    }
    else if(event.type =='Line area Chart'){
      this.HideShow =true;
      this.showHide =false;
      
    }
    else{
      this.showHide =false;
      this.HideShow =false;
    }

    if (dropType == "drop1" && this.itemsDropped1.length == 0 && !this.showForm) {
      this.showForm = true;
      this.itemsDropped1.push(event);
      if (this.position) {
      }
      else {
        this.position = positionType
      }
    }

    if (dropType == "drop2" && this.itemsDropped2.length == 0 && !this.showForm) {

      this.showForm = true;
      this.itemsDropped2.push(event);
      if (this.position) {
      }
      else {
        this.position = positionType
      }
    }

    if (dropType == "drop3" && this.itemsDropped3.length == 0 && !this.showForm) {
      this.showForm = true;
      this.itemsDropped3.push(event);
      if (this.position) {
      }
      else {
        this.position = positionType
      }
    }

    if (dropType == "drop4" && this.itemsDropped4.length == 0 && !this.showForm) {
      this.showForm = true;
      this.itemsDropped4.push(event);
      if (this.position) {
      }
      else {
        this.position = positionType
      }
    }

    if (dropType == "drop5" && this.itemsDropped5.length == 0 && !this.showForm) {
      this.showForm = true;
      this.itemsDropped5.push(event);
      if (this.position) {
      }
      else {
        this.position = positionType
      }
    }

  }

  startDrag(item) {
    // this.widget.chartType = item.type;
    // this.model.setTemplateData(this.template)
  }

  selectCharts(name) {
    this.fields.length = 0;
    this.template.table = name
    // this.dropArea = true;
    this.selectedtableField = [];
    this.selectedtableField.push(name);
    this.service.getFieldname().subscribe(response => {
      let count = 0
      for (let i of response) {
        this.fields.push({ "id": count, "itemName": i })
        count++;
      }

      this.chartfields = response;
    });
  }

  onItemSelect(item) {
    this.template.filterOption = item;

  }
  onDefault(item){
    this.template.defaultFilter = item;
  }
  addRow() {
    let copy = JSON.parse(JSON.stringify(this.template.contentFilter))
    this.template.contentFilter = [];
    this.template.contentFilter = copy;
    this.template.contentFilter.push({
      PropertyName: "",
      ComparisonOperator: "",
      ConditionName: "",
      ConditionValue: ""
    })
  }

  remove(index) {

    this.template.contentFilter.splice(index, 1);

  }
  updateTemplate() {

    this.template.templateName = localStorage.getItem("templateName")
    this.template.templateDefinition = localStorage.getItem("templateDesc")
    
    console.log(this.template)
    this.apicall.updateTemplate(this.template).subscribe(res => {
      this.result = res.message
     // alert(this.result);
      this.alert.success(this.result)
      this.router.navigate(['/template-list'],{ skipLocationChange: true });
    },
      (err) => {
        console.log(err);
        // alert(err._body)

        this.alert.success(err._body)

      });

  }
  ZAxis:boolean=false;
  stacked(){
    this.ZAxis=true;
    this.ctype='Stacked Chart'
  }
  normal(){
    this.ZAxis=false;
    this.ctype='Bar Chart'    
  }

  stackedline(){
    this.ZAxis=true;
    this.ctype='Stacked Line Chart'
      
  }
  normalline(){
    this.ZAxis=false;      
    this.ctype='Line area Chart'   
  }

  DataXaxis(name) {
    this.x_axis = name;
  }

  DataYaxis(name) {
    this.y_axis = name;
  }
  DataZaxis(name) {
    this.z_axis = name;
  }
  onSelectsummary(item) {
    this.summaryBy.push(item.itemName)
  }

  onDeSelectsummary(item) {
    this.summaryBy.splice(item.itemName, 1)
  }

  setcsvexport(e) {
    if (e) {
      this.csv = e;
    }
    if (!e) {
      this.csv = e;
    }
  }

  setpdfexport(e) {
    if (e) {
      this.pdf = e;
    }
    if (!e) {
      this.pdf = e;
    }
  }

  setmailexport(e) {
    if (e) {
      this.mail = e;
    }
    if (!e) {
      this.mail = e;
    }
  }

  updateWidget() {
    this.widget = new Widgets()
    if (this.ZAxis) {
      this.widget.chartField.push(this.x_axis, this.y_axis, this.z_axis);
    }
    else {
      this.widget.chartField.push(this.x_axis, this.y_axis);

    }
    // for (let i of this.summaryBy) {
    //   this.widget.summaryByFields.push(i)
    // }
    this.widget.summaryByFields = this.summary
    this.widget.chartHeading = this.heading
    this.widget.graphDefinition = this.graphdesc
    this.widget.exportCSV = this.csv
    this.widget.exportPDF = this.pdf
    this.widget.exportMail = this.mail
    this.widget.row = this.position
    this.widget.chartType = this.ctype

    //this.template.widget.push(this.widget)
    console.log(this.widget)
    
   let result =  this.template.widget.findIndex(item => item.row == this.widget.row)
   console.log(result)
   if(result >=0){
    this.template.widget.splice(result,1)
    this.template.widget.push(this.widget)
    
   }
   else{
    this.template.widget.push(this.widget)   
    
   }
   
   this.summary = [];
   this.heading = "";
   this.graphdesc=""
   this.csv = false;
   this.pdf = false;
   this.mail = false;
   this.position = "";
   this.ctype = "";
   this.x_axis="";
   this.y_axis="";
   this.showHide =false;
   this.HideShow =false;   
   this.ZAxis=false;
   this.zaxis == ""
   this.z_axis = '';
    // this.template.widget.every((item, index) => {
    //  // console.log(item.row, this.widget.row)

    //   //  this.template.widget.push(this.widget)
    //   if (item.row == this.widget.row) {
    //     this.template.widget.splice(index, 1)
    //     this.template.widget.push(this.widget)
    //     return false;
    //   }
    //   else {
    //     this.template.widget.push(this.widget)
    //     return false;
    //   }

    // });

    console.log(this.template);

    // this.summaryBy.length = 0;
    this.showForm = false;

    this.enableupdatetemplatebtn = true;

  }

  getSummaryFormat(datas) {
    this.service.getFieldname().subscribe(response => {
      let count = 0
      let summaryRes = []
      for (let j in datas) {
        for (let i in response) {
          if (response[i] == datas[j]) {
            summaryRes.push({ "id": i, "itemName": response[i] })
          }
        }
      }
      this.summary = summaryRes;
    });
  }
  editChart(data: string) {

    if(this.enableupdatetemplatebtn) {
      this.enableupdatetemplatebtn = false;
    }

    this.showForm = true;
    this.template.widget.forEach((item, index) => {

      if (item.row == data) {
        this.getSummaryFormat(item.summaryByFields)
        this.position = item.row
        this.heading = item.chartHeading
        this.graphdesc = item.graphDefinition
        
        //  this.summary = item.summaryByFields;
        if(item.chartType == "Stacked Chart"){
          console.log("stacked chart");
          this.ZAxis = true;
          this.showHide =true;
          this.z_axis = item.chartField[2];
          this.normalbar = false;
          this.stackbar = true;
        } else if(item.chartType == "Bar Chart"){
          console.log("bar chart")
          this.ZAxis = false;
          this.showHide =true;
          this.z_axis = "";
          this.normalbar = true;
          this.stackbar = false;
        }
       /**  else{
          this.ZAxis = false;
          this.showHide =false;         
          console.log("else z-axis..."+this.ZAxis);
        } */

        else if(item.chartType == "Stacked Line Chart"){
          this.ZAxis = true;
          this.HideShow =true;
          this.z_axis = item.chartField[2];
          this.linenormal = false;
          this.stackline = true;

        }else if(item.chartType == "Line area Chart"){
          this.ZAxis = false;
          this.HideShow =true;
          this.z_axis = "";
          this.linenormal = true;
          this.stackline = false;
        }
        else {
          this.ZAxis = false;
          this.HideShow =false;         
        }
        this.x_axis = item.chartField[0]
        this.y_axis = item.chartField[1];
        this.csv = item.exportCSV;
        this.pdf = item.exportPDF;
        this.mail = item.exportMail;
        this.ctype = item.chartType;
      }

    });


  }

}
