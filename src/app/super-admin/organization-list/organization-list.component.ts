import { Component, OnInit,Pipe, PipeTransform } from '@angular/core';
import { AlertService } from 'ngx-alerts';

import {Organization  } from '../../Organization';
import {ApicallService} from '../../services/apicall.service';
import { Router } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';
declare var $: any;

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css'],
  
})

export class OrganizationListComponent implements OnInit {
  order: string;
  ascending: boolean = false;
  sortedCollection: any[];
  organisation: any;
  result: string;
  showDelete: boolean = false
  allowAddOrg: boolean = false
  showEdit: boolean = false
  constructor(private apicall: ApicallService, private router: Router, private orderPipe: OrderPipe,private alertService : AlertService) { }

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

          let org = response.permission.find(x => x.Organization)
          if (org.Organization.find(x => x == "Delete")) {

            this.showDelete = true;
          }
          if (org.Organization.find(x => x == "Create")) {

            this.allowAddOrg = true;
          }
          if (org.Organization.find(x => x == "Update")) {

            this.showEdit = true;
          }
        })
      })
    }
    this.loadOrg();
    setTimeout(() => {
      $('#example').DataTable({
        "bPaginate": true,
         "bInfo" : false
      });
  }, 1000);

  }

  addOrg() {
    let id: String = "0";
    this.router.navigate(['/addorganization/', id],{ skipLocationChange: true });
  }

  onSelect(selectedItem: any) {
    this.router.navigate(['/addorganization/', selectedItem._id],{ skipLocationChange: true });
  }
  loadOrg() {
    this.apicall.getOrganization().subscribe(res => {
      this.organisation = res
    });
  }
  onDelete(selectedItem: any) {
    if (confirm("Are you sure, you want to delete the organization :  " + selectedItem.organizationName)) {
      this.apicall.DeleteOrganizationById(selectedItem._id).subscribe(
        res => {
          this.result = res.message;
        
 this.alertService.success(this.result)
          this.loadOrg();
        },
        (err) => {
          this.alertService.danger(JSON.parse(err._body).message);
          console.log(JSON.parse(err._body));

        });

    }
    else {
    }
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.ascending = !this.ascending;
    }

    this.order = value;
  }
}
