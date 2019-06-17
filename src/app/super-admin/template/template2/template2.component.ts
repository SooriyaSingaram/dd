import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';

import { ChartService } from '../../../services/chart.service';
import { ModelDataService } from '../../../services/model-data.service';
import { ApicallService } from '../../../services/apicall.service';
import { Templates, Widgets } from '../../../WidgetsModel';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-template2',
  templateUrl: './template2.component.html',
  styleUrls: ['./template2.component.scss']
})
export class Template2Component implements OnInit {
  @Input() template: Templates
  @Input() widget: Widgets
  tablelist: any[] = [];
  fields: any[] = [];
  chartfields: any[] = [];
  checkedFields: any[] = [];
  selectedtable: any[] = [];
  selectedtableField: any[] = [];
  selectedChart: any[] = [];
  state: boolean = false;
  widgetsCollection: any[] = [];
  dropdownSettings: any;
  public invoiceForm: FormGroup;
  id;

  comparison_operator: any[] = ['EqualTo', 'Contains'];

  public itemsDropped1: Array<any> = [];
  public itemsDropped2: Array<any> = [];
  public itemsDropped3: Array<any> = [];
  public itemsDropped4: Array<any> = [];
  username: string;
  close_1: boolean = false;
  close_2: boolean = false;
  close_3: boolean = false;
  close_4: boolean = false;
  result: string;
  dropArea: boolean = false;
  defaultfilters: any = ['Period', 'Percentage', 'Date-Range'];

  enablecreatetemplate: boolean = false;

  btnStatus: boolean = false;
  constructor(private fb: FormBuilder, private service: ChartService, private http: Http, private model: ModelDataService, private apicall: ApicallService, private router: Router, private alert: AlertService) { }

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

  message = this.model.getData();
  showloader: boolean = false
  ngOnInit() {

    this.widget = new Widgets()
    this.widget.exportCSV = false; this.widget.exportPDF = false; this.widget.exportMail = false;
    let templatename = this.model.getTemplateData().templateName
    let templatetype = this.model.getTemplateData().templateType
    let templateDefinition = this.model.getTemplateData().templateDefinition
    this.template = new Templates()
    this.template.templateName = templatename
    this.template.templateType = templatetype
    this.template.templateDefinition = templateDefinition

    this.selectCharts()
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select ",
      enableSearchFilter: true,
      classes: "myclass custom-class"
    }

    this.username = localStorage.getItem("currentUser");
    this.service.getTable().subscribe(response => {
      this.tablelist = response;
    })
    this.invoiceForm = this.fb.group({
      itemRows: this.fb.array([this.initItemRows()])
    });
    this.y_axis = 'value';
    this.x_axis = 'label';
    this.z_axis = 'name';


  }

  close1() {
    this.showForm = false;
    this.close_1 = false;
    this.itemdrop1 = true;
    this.itemsDropped1 = [];
    this.itemsDropped1.length = 0;
  }

  close2() {
    this.showForm = false;
    this.close_2 = false;
    this.itemdrop2 = true;
    this.itemsDropped2 = [];
    this.itemsDropped2.length = 0;
  }
  close3() {
    this.showForm = false;
    this.close_3 = false;
    this.itemdrop3 = true;
    this.itemsDropped3 = [];
    this.itemsDropped3.length = 0;
  }
  close4() {
    this.showForm = false;
    this.close_4 = false;
    this.itemdrop4 = true;
    this.itemsDropped4 = [];
    this.itemsDropped4.length = 0;
  }


  itemdrop1: boolean = true;
  itemdrop2: boolean = true;
  itemdrop3: boolean = true;
  itemdrop4: boolean = true;
  showForm: boolean = false;
  showHide: boolean = false;
  HideShow: boolean = false;

  public addDropItem(arraytype, event) {

    this.enablecreatetemplate = false;

    this.btnStatus = true;
    this.selectedChart = event.type;

    if (event.type == 'Bar Chart') {
      this.showHide = true;
      this.HideShow = false;

    }
    else if (event.type == 'Line area Chart') {
      this.HideShow = true;
      this.showHide = false;

    }
    else {
      this.showHide = false;
      this.HideShow = false;
    }

    if (arraytype == "itemsDropped1" && this.itemsDropped1.length == 0 && !this.showForm) {
      this.showForm = true;
      this.close_1 = true;
      if (this.itemdrop1) {
        this.itemsDropped1.push(event);
        this.widget.row = "item1"
        this.itemdrop1 = false;
      }
    }

    if (arraytype == "itemsDropped2" && this.itemsDropped2.length == 0 && !this.showForm) {
      this.showForm = true;
      this.close_2 = true;
      if (this.itemdrop2) {
        this.itemsDropped2.push(event);
        this.widget.row = "item4"
        this.itemdrop2 = false;
      }
    }

    if (arraytype == "itemsDropped3" && this.itemsDropped3.length == 0 && !this.showForm) {
      this.showForm = true;
      this.close_3 = true;
      if (this.itemdrop3) {
        this.itemsDropped3.push(event);
        this.widget.row = "item2"
        this.itemdrop3 = false;
      }
    }

    if (arraytype == "itemsDropped4" && this.itemsDropped4.length == 0 && !this.showForm) {
      this.showForm = true;
      this.close_4 = true;
      if (this.itemdrop4) {
        this.itemsDropped4.push(event);
        this.widget.row = "item3"
        this.itemdrop4 = false;
      }
    }



  }
  initItemRows() {
    return this.fb.group({


      FormPropertyName: [''],
      FormComparisonOperator: [''],
      FormConditionValue: [''],
      // FormArithmeticName: ['']
    });
  }
  addNewRow() {
    const control = <FormArray>this.invoiceForm.controls['itemRows'];
    control.push(this.initItemRows());

    console.log(this.invoiceForm.value);
  }

  deleteRow(index: number) {
    const control = <FormArray>this.invoiceForm.controls['itemRows'];
    control.removeAt(index);
  }
  startDrag(item) {
    this.widget.chartType = item.type;
    this.model.setTemplateData(this.template)
  }

  selectCharts() {
    this.fields.length = 0;
    this.template.table = name
    this.dropArea = true;

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
    this.template.filterOption = item

  }

  onDefault(filteritem) {
    this.template.defaultFilter = filteritem
  }

  createTemplate() {
    console.log(this.widgetsCollection)

    let triggerConditionItem = [];

    this.invoiceForm.value.itemRows.forEach(i => {
      triggerConditionItem.push(
        {

          // "ConditionName": i.FormArithmeticName,
          "PropertyName": i.FormPropertyName,
          "ComparisonOperator": i.FormComparisonOperator,
          "ConditionValue": i.FormConditionValue

        });
    });
    for (let i of triggerConditionItem) {
      this.template.contentFilter.push(i)
    }


    this.template.widget = this.widgetsCollection
    this.showloader = true;
    this.apicall.postTemplate(this.template).subscribe(res => {
      this.result = res.message
      this.showloader = false;
      //alert(this.result);
      this.alert.success(this.result)
      this.router.navigate(['/template-list'], { skipLocationChange: true });
    },
      (err) => {
        console.log(err);
        this.showloader = false;
        //alert(err._body);
        this.alert.danger(JSON.parse(err._body))

      });
  }

  ZAxis: boolean = false;
  stacked() {
    this.ZAxis = true;
    this.widget.chartType = 'Stacked Chart'
  }
  normal() {
    this.ZAxis = false;
    this.widget.chartType = 'Bar Chart'
  }

  stackedline() {
    this.ZAxis = true;
    this.widget.chartType = 'Stacked Line Chart'

  }
  normalline() {
    this.ZAxis = false;
    this.widget.chartType = 'Line area Chart'
  }

  yaxis: string;
  xaxis: string;
  zaxis: string;
  y_axis: string;
  x_axis: string;
  z_axis: string;
  summaryBy: any = [];

  DataXaxis(name) {
    this.xaxis = name;
  }

  DataYaxis(name) {
    this.yaxis = name;
  }

  DataZaxis(name) {
    this.zaxis = name;
  }


  setcsvexport(e) {
    if (e = true) {
      this.widget.exportCSV = e;
    }
  }

  setpdfexport(e) {
    if (e = true) {
      this.widget.exportPDF = e;
    }

  }

  setmailexport(e) {
    if (e = true) {
      this.widget.exportMail = e;
    }

  }
  pdfexport(e) {
    if (e = true) {
      this.template.pageExport = e;
    }
    if (!e) {
      this.template.pageExport = e;
    }
  }
  mailexport(e) {
    if (e = true) {
      this.template.mailDashboard = e;
    }
    if (!e) {
      this.template.mailDashboard = e;
    }
  }
  create() {

    if (this.ZAxis) {
      this.widget.chartField.push(this.xaxis, this.yaxis, this.zaxis);
    }
    else {
      this.widget.chartField.push(this.xaxis, this.yaxis);

    }
    let tempSummary = [];

    for (let i of this.widget.summaryByFields) {
      tempSummary.push(i.itemName)
    }
    this.widget.summaryByFields.length = 0;
    this.widget.summaryByFields = tempSummary;
    console.log(this.widget.summaryByFields)
    this.widgetsCollection.push(this.widget)

    console.log(this.widgetsCollection)


    this.showForm = false;
    this.showHide = false;
    this.ZAxis = false;
    this.zaxis == ""

    this.widget = new Widgets();

    this.checkedFields.length = 0;
    this.y_axis = 'value';
    this.x_axis = 'label';
    this.z_axis = 'name';

    this.enablecreatetemplate = true;
    
  }

  customizeTemplate() {

    let triggerConditionItem = [];

    this.invoiceForm.value.itemRows.forEach(i => {
      triggerConditionItem.push(
        {

          "PropertyName": i.FormPropertyName,
          "ComparisonOperator": i.FormComparisonOperator,
          "ConditionValue": i.FormConditionValue

        });
    });
    for (let i of triggerConditionItem) {
      this.template.contentFilter.push(i)
    }

    this.template.widget = this.widgetsCollection
    this.showloader = true;
    this.apicall.postTemplate(this.template).subscribe(res => {
      this.result = res.message
      this.id = res.id
      console.log(res)
      this.showloader = false;
      this.alert.success("Please customize the template")
      this.router.navigate(['/custom-template/', this.id], { skipLocationChange: true });
    },
      (err) => {
        console.log(err);
        this.showloader = false;
        this.alert.danger(JSON.parse(err._body))

      });

  }


}

