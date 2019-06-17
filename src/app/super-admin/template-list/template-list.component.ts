import { Component, OnInit } from '@angular/core';
import { AlertService } from 'ngx-alerts';

import { ApicallService } from '../../services/apicall.service';
import { Router } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';
declare var $: any;

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit {
  selectedRow: String;
  setClickedRow: Function;

  order: string;
  ascending: boolean = false;
  showDelete: boolean = false
  allowAddOrg: boolean = false
  showEdit: boolean = false
  sortedCollection: any[];
  constructor(private apicall: ApicallService, private router: Router, private orderPipe: OrderPipe,private alert : AlertService) {
    this.setClickedRow = function (index) {
      this.selectedRow = index;
    }

    this.sortedCollection = orderPipe.transform(this.message);
  }


  message: any[];
  result: string;
  TemplatesList: any[] = [];
  loadTemplates() {
    this.apicall.getTemplates().subscribe(res => {
      for (let i of res) {
        this.TemplatesList.push(i);
      }

    });
  }
  ngOnInit() {
    let rolename = localStorage.getItem("RoleName");
    if (rolename == "Super Admin") {
      console.log(rolename)
      this.showDelete = true;
      this.allowAddOrg = true;
      this.showEdit = true;

    }
    else {
      let id = localStorage.getItem("userId")

      this.apicall.getUserById(id).subscribe(res => {


        this.apicall.getRoleById(res.role).subscribe(response => {

          let org = response.permission.find(x => x.Template)
          if (org.Template.find(x => x == "Delete")) {

            this.showDelete = true;
          }
          if (org.Template.find(x => x == "Create")) {

            this.allowAddOrg = true;
          }
          if (org.Template.find(x => x == "Update")) {

            this.showEdit = true;
          }
        })
      })
    }
    this.loadTemplates()
    setTimeout(() => {
      $('#example').DataTable({
        "bPaginate": true,
         "bInfo" : false
      });
  }, 1000);
  }

  addTemplate() {

    this.router.navigate(['/create_template/', 0],{ skipLocationChange: true });
  }

  onSelect(selectedItem: any) {
    this.router.navigate(['/create_template/', selectedItem._id],{ skipLocationChange: true });
  }

  onDelete(selectedItem: any) {
    if (confirm("Are you sure, you want to delete the Template :  " + selectedItem.templateName)) {
      this.apicall.DeleteTemplateById(selectedItem._id).subscribe(
        res => {
          this.result = res.message;
          // alert(this.result);
          this.alert.success(this.result)
          this.TemplatesList.length = 0;
         this.loadTemplates();
       },
       (err) => {
         console.log(err._body)
       // alert(err._body);  
       this.alert.danger(JSON.parse(err._body))
       
        
       
       }); 
     
      }
      else{

    }

  }

  setOrder(value: string) {
    if (this.order === value) {
      this.ascending = !this.ascending;
    }

    this.order = value;
  }
}
