
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TriggerField } from '../../TriggerFields';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'ngx-alerts';

import { ChartService } from '../../services/chart.service';
import { ApicallService } from '../../services/apicall.service';
@Component({
  selector: 'app-edittrigger',
  templateUrl: './edittrigger.component.html',
  styleUrls: ['./edittrigger.component.css']
})

export class EdittriggerComponent implements OnInit {
  public invoiceForm: FormGroup;
  constructor(private service: ChartService, private apiservice: ApicallService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private alert : AlertService) { }
  @Input() message: TriggerField;
  table: any[] = [];
  field;
  result;
  users: any[] = [];
  selecteduser: any[] = [];
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
  template_list: any[];
  period: any[] = ["Monthly", "Quaterly", "Yearly"]


  comparison_operator: any[] = ['EqualTo', 'GreaterThan', 'GreaterThanOrEqualTo', 'Contains', 'LessThan', 'LessThanOrEqualTo'];

  loadUsers(id, l) {
    if (l != "init") {
      this.message.UsersList.length = 0;
    }
    this.apiservice.organizationBasedUsers(id).subscribe(res => {
      this.users.length = 0;
      for (let i in res) {
        this.users.push({ "id": res[i]._id, "itemName": res[i].userName })
      }
    });

  }

  getOrganization() {
    this.apiservice.getOrganization().subscribe(res => {
      this.organization_list = res;
    });
  }
  getTemplates() {
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

          this.selectFields(this.message.ConditionName)
          // this.message.OrganizationId = res.OrganizationId;
          this.loadUsers(this.message.OrganizationId, "init")

          this.state = true;
        });
      }
      else {
        this.message = new TriggerField();
        this.state = false;
      }

      // In a real app: dispatch action to load the details here.
    });


    this.dropdownSettings = {
      singleSelection: false,
      text: "Select Users",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };



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


  selectFields(name) {

 
    this.service.getFieldname().subscribe(response => {
      this.field = response;

    });


  }

  updateTrigger() {

    if (this.message.UsersList) {
    }
    else {
      this.message.UsersList = this.selecteduser;
    }
    console.log(this.message)
    this.apiservice.updateTrigger(this.message).subscribe(res => {
      this.result = res.message

      // alert(this.result);
      this.alert.success(this.result)
      this.router.navigate(['/trigger-list'],{ skipLocationChange: true });

    });
  }
  addRow() {
    let copy = JSON.parse(JSON.stringify(this.message.conditionList))
    this.message.conditionList = [];
    this.message.conditionList = copy;
    this.message.conditionList.push({
      PropertyName: "",
      ComparisonOperator: "",
      ConditionName: "",
      ConditionValue: ""
    })
    console.log(this.message.conditionList)
  }

  remove(index) {

    this.message.conditionList.splice(index, 1);

  }
  goToTriggerList() {
    this.router.navigate(['/trigger-list'],{ skipLocationChange: true });

  }

}