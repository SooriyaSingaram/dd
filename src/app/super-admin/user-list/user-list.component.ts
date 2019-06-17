import { Component, OnInit } from '@angular/core';
import { Organization } from '../../Organization';
import { ApicallService } from '../../services/apicall.service';
import { Router } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';
import { UserModel } from '../../User';
import { AlertService } from 'ngx-alerts';

declare var $: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  selectedRow: String;
  setClickedRow: Function;
  showHide: boolean = false;
  showDelete: boolean = false
  allowAddOrg: boolean = false
  showEdit: boolean = false
  resetpassword: Object = [];


  order: string;
  ascending: boolean = false;

  sortedCollection: any[];
  constructor(private alert: AlertService,private apicall: ApicallService, private router: Router, private orderPipe: OrderPipe) {
    this.setClickedRow = function (index) {
      this.selectedRow = index;
    }

    this.sortedCollection = orderPipe.transform(this.message);
  }

  loadUsers() {
    this.apicall.getUserList().subscribe(res => {
      this.message = res
    });
  }
  message: any[];
  result: string;
  userdata;
  ngOnInit() {
    let rolename = localStorage.getItem("RoleName");

    if (rolename == "Super Admin") {
      console.log(rolename)
      this.showDelete = true;
      this.allowAddOrg = true;
      this.showEdit = true;

    }
    else {
      this.userdata = new UserModel()
      let id = localStorage.getItem("userId")

      this.apicall.getUserById(id).subscribe(res => {


        this.apicall.getRoleById(res.role).subscribe(response => {

          let users = response.permission.find(x => x.UserManagement)
          if (users.UserManagement.find(x => x == "Delete")) {

            this.showDelete = true;
          }
          if (users.UserManagement.find(x => x == "Create")) {

            this.allowAddOrg = true;
          }
          if (users.UserManagement.find(x => x == "Update")) {

            this.showEdit = true;
          }
        })
      })
    }
    this.loadUsers();
    setTimeout(() => {
      $('#example').DataTable({
        "bPaginate": true,
         "bInfo" : false
      });
  }, 1000);
  }
  addUser() {
    let id: String = "0";
    this.router.navigate(['/adduser/', id],{ skipLocationChange: true });

  }

  getUser() {
    this.apicall.getUserById(this.selectedRow).subscribe(res => {
      this.message = res
    });

  }

  showPass(user) {
   
    this.userdata = user
    this.showHide = true;
  }
  closepopup() {
    this.showHide = !this.showHide
  }
  PasswordSubmit(data) {

    this.userdata.password = data.confirmNewPassword
    this.apicall.UpdateUserById(this.userdata).subscribe(res => {
      this.closepopup();
      this.alert.success(res.message)
      console.log(res)
      this.resetpassword= [];
      
    })
  }

  onSelect(selectedItem: any) {
    this.router.navigate(['/adduser/', selectedItem._id],{ skipLocationChange: true });
  }

  onDelete(selectedItem: any) {
    if (confirm("Are you sure, you want to delete the User Account :  " + selectedItem.userName)) {
    this.apicall.DeleteUserById(selectedItem._id).subscribe(
      res => {
        this.result = res.message;
        this.alert.success(this.result);
        this.loadUsers();
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
