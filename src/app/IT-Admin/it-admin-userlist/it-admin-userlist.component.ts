import { Component, OnInit } from '@angular/core';
import { AlertService } from 'ngx-alerts';

import {ApicallService} from '../../services/apicall.service';
import { Router } from '@angular/router';
import { UserModel } from '../../User';
declare var $: any;

@Component({
  selector: 'app-it-admin-userlist',
  templateUrl: './it-admin-userlist.component.html',
  styleUrls: ['./it-admin-userlist.component.css']
})
export class ItAdminUserlistComponent implements OnInit {
  selectedRow : String;
  setClickedRow : Function;
  constructor(private apicall :ApicallService,private router:Router, private alertService : AlertService) { 

    this.setClickedRow = function(index){
      this.selectedRow = index;
  }
  }

  loadUsers(){
    this.users.length = 0;
    this.apicall.getUserList().subscribe(res=>{       
    for(let admins of res){
      if(admins.role != "R002" && admins.role != "R001"){
        this.users.push(admins)
      }
    }
   
    });
  }
  users : any[]=[];
  result:string;
  showDelete:boolean = false
  allowAddUser:boolean = false
  showEdit:boolean = false
  userdata;
  showHide: boolean = false;
  resetpassword: Object = [];


  ngOnInit() {
    this.userdata = new UserModel()
    let username =  localStorage.getItem("currentUser");
    //Role Access
   let id = localStorage.getItem("userId")

    this.apicall.getUserById(id).subscribe(res => {

      let Orgid = res.OrganizationId
    

    this.apicall.getRoleById(res.role).subscribe(response => {
    
      let users = response.permission.find(x => x.UserManagement)   
      if (users.UserManagement.find(x=> x == "Delete") ) {

        this.showDelete = true; 
      }
      if (users.UserManagement.find(x=> x == "Create") ) {

        this.allowAddUser = true; 
      }
      if (users.UserManagement.find(x=> x == "Update") ) {

        this.showEdit = true; 
      }
    })
  })
      //Role Access end
   this.loadUsers();
   setTimeout(() => {
    $('#example').DataTable({
      "bPaginate": true,
       "bInfo" : false
    });
}, 1000);
  }
  addUser(){
    let id :String="0";
   
    this.router.navigate(['/it-admin-adduser/',id],{ skipLocationChange: true });
  
  }
  showPass(user) {

    this.userdata._id = user._id
    this.showHide = true;
  }
  closepopup() {
    this.showHide = !this.showHide
  }
  PasswordSubmit(data) {

    this.userdata.password = data.confirmNewPassword
    this.apicall.UpdateUserById(this.userdata).subscribe(res => {
      this.closepopup();
      //alert(res.message)
      this.alertService.success(res.message)
      console.log(res)
      this.resetpassword= [];
      
    })
  }
  getUser(){
    
    this.apicall.getUserById(this.selectedRow).subscribe(res=>{      
     
      this.users = res});
  
  }

  onSelect(selectedItem: any) {
    this.router.navigate(['/it-admin-adduser/',  selectedItem._id],{ skipLocationChange: true });
   

   
}

onDelete(selectedItem: any){
 
  this.apicall.DeleteUserById(selectedItem._id).subscribe(
    res => { 
  
      this.result = res.message;
      //alert(this.result);
      this.alertService.success(this.result)
      
      this.loadUsers();
    });

   
}

}
