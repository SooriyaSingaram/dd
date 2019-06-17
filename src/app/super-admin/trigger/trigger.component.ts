import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'ngx-alerts';

import { TriggerField } from '../../TriggerFields';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { ChartService } from '../../services/chart.service';
import { ApicallService } from '../../services/apicall.service';
@Component({
  selector: 'app-trigger',
  templateUrl: './trigger.component.html',
  styleUrls: ['./trigger.component.css']
})
export class TriggerComponent implements OnInit {
  public invoiceForm: FormGroup;
  constructor(private service: ChartService, private apiservice: ApicallService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder,private alert: AlertService) { }
  @Input() message: TriggerField;
  table: any[] = [];
  field;
  result;
  users: any[] = [];
  selecteduser: any[] = [];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  other = []; // your other array...
  state: boolean;
  id: String;
  username: string;
  private sub: any;
  selectedTheme: any[];
  selectedTemplate: any[];
  selectedtable: any[];
  organization_list: any[];
  template_list:any[];
  period: any[] = ["Monthly", "Quaterly", "Yearly"]


  comparison_operator: any[] = ['EqualTo', 'GreaterThan', 'GreaterThanOrEqualTo', 'Contains', 'LessThan', 'LessThanOrEqualTo'];

  loadUsers(id) {
    console.log(id)
    this.apiservice.organizationBasedUsers(id).subscribe(res => {
      this.users.length = 0;
      for (let i in res) {
      
        this.users.push({ "id": res[i]._id, "itemName": res[i].userName })
      }
      console.log(this.users)
    });
  }

  getOrganization() {
    this.apiservice.getOrganization().subscribe(res => {
      this.organization_list = res;
    });
  }
  getTemplates(){
    this.apiservice.getTemplates().subscribe(res => {
     
      this.template_list = res;
    });
  }
  ngOnInit() {
   
    this.getTemplates()
    this.getOrganization();
    this.message = new TriggerField();
    this.username = localStorage.getItem("currentUser");
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.service.getTable().subscribe(table => {
        this.table = table;
      });
      if (this.id != "0") {
        this.apiservice.getTriggerById(this.id).subscribe(res => {

          
          this.message = res;
          // this.message.OrganizationId = res.OrganizationId;
          this.state = true;

          // this.service.getFieldname(this.message.ConditionName.toString()).subscribe(response => {
          //   this.field = response;

          //   });
          //  this.message.PropertyName

          // console.log(this.message.PropertyName)
        });
      }
      else {
        this.message = new TriggerField();
        this.state = false;
      }

      // In a real app: dispatch action to load the details here.
    });



    this.dropdownList = [
      { "id": 1, "itemName": "India" },
      { "id": 2, "itemName": "Singapore" },
      { "id": 3, "itemName": "Australia" },
      { "id": 4, "itemName": "Canada" },
      { "id": 5, "itemName": "South Korea" },
      { "id": 6, "itemName": "Germany" },
      { "id": 7, "itemName": "France" },
      { "id": 8, "itemName": "Russia" },
      { "id": 9, "itemName": "Italy" },
      { "id": 10, "itemName": "Sweden" }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      text: "Select Users",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
    this.invoiceForm = this.fb.group({
      itemRows: this.fb.array([this.initItemRows()])
    });

this.selectFields()
  }

  initItemRows() {
    return this.fb.group({


      FormPropertyName: [''],
      FormComparisonOperator: [''],
      FormConditionValue: [''],
      FormArithmeticName: ['']
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
  onItemSelect(item: any) {
    this.selecteduser.push(item);

  }
  getList() {
    this.users.map(item => {
      console.log(item)
      return {
        "id": item._id_id, "itemName": item._id.userName
      }
    }).forEach(item => this.other.push(item));
  }
  OnItemDeSelect(item: any) {

    this.selecteduser.splice(item.id, 1);

  }
  onSelectAll(items: any) {

    this.selecteduser.push(items);

  }
  onDeSelectAll(items: any) {

    this.selecteduser.splice(items);

  }


  selectFields() {


    this.service.getFieldname().subscribe(response => {
      this.field = response;

    });


  }

  setTrigger() {

    let triggerConditionItem = [];

    this.invoiceForm.value.itemRows.forEach(i => {
      triggerConditionItem.push(
        {

          "ConditionName": i.FormArithmeticName,
          "PropertyName": i.FormPropertyName,
          "ComparisonOperator": i.FormComparisonOperator,
          "ConditionValue": i.FormConditionValue

        });
    });
    for (let i of triggerConditionItem) {
      this.message.conditionList.push(i)
    }

    console.log(this.message.conditionList)
    this.message.UsersList = this.selecteduser;

    this.apiservice.postTrigger(this.message).subscribe(res => {
      this.result = res.message

      //alert(this.result);
      this.alert.success(this.result)
      this.router.navigate(['/trigger-list'],{ skipLocationChange: true });

    });
  }
  updateTrigger() {

    if (this.message.UsersList) {
    }
    else {
      this.message.UsersList = this.selecteduser;
    }

    // this.apiservice.updateTrigger(this.message).subscribe(res => {
    // this.result = res.message

    //   alert(this.result);
    //   this.router.navigate(['/trigger-list']);

    // });
  }

  goToTriggerList() {
    this.router.navigate(['/trigger-list'],{ skipLocationChange: true });

  }

}
