
import { Component, OnInit } from '@angular/core';

import { ApicallService } from '../../services/apicall.service';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';

declare var $: any;
@Component({
  selector: 'app-trigger-list',
  templateUrl: './trigger-list.component.html',
  styleUrls: ['./trigger-list.component.css']
})
export class TriggerListComponent implements OnInit {
  selectedRow: String;
  setClickedRow: Function;
  constructor(private alert: AlertService,private apicall: ApicallService, private router: Router) {

    this.setClickedRow = function (index) {
      this.selectedRow = index;
    }
  }

  loadUsers() {
    this.apicall.GetTriggerList().subscribe(res => {
      this.message = res
    });
  }
  message: any[];
  showDelete: boolean = false
  allowAddOrg: boolean = false
  showEdit: boolean = false
  result: string;
  ngOnInit() {
    let username = localStorage.getItem("currentUser");
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

          let org = response.permission.find(x => x.Trigger)
          if (org.Trigger.find(x => x == "Delete")) {

            this.showDelete = true;
          }
          if (org.Trigger.find(x => x == "Create")) {

            this.allowAddOrg = true;
          }
          if (org.Trigger.find(x => x == "Update")) {

            this.showEdit = true;
          }
        })
      })
    }
    this.loadUsers();
	  setTimeout(() => {
      $('#example').DataTable({
        "bPaginate": false,
         "bInfo" : false
      });
  }, 1000);
  }
  addTrigger() {
    let id: String = "0";
    this.router.navigate(['/trigger/', id],{ skipLocationChange: true });
  }

  getUser() {
    this.apicall.getUserById(this.selectedRow).subscribe(res => {
      this.message = res
    });
  }

  onSelect(selectedItem: any) {

    //this.router.navigate(['/trigger/',selectedItem._id]);
    this.router.navigate(['/edittrigger/', selectedItem._id],{ skipLocationChange: true });
  }

  onDelete(selectedItem: any) {
    if (confirm("Are you sure, you want to delete the Trigger :  " + selectedItem.ConditionName)) {
      this.apicall.DeleteTriggerById(selectedItem._id).subscribe(
        res => {
          this.result = res.message;
          this.alert.success(this.result);
          this.loadUsers();
        });


    }
    else {

    }
  }

}
