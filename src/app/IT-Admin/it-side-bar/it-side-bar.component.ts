import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../services/apicall.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModelDataService } from '../../services/model-data.service';

@Component({
  selector: 'app-it-side-bar',
  templateUrl: './it-side-bar.component.html',
  styleUrls: ['./it-side-bar.component.css']
})
export class ItSideBarComponent implements OnInit {

  constructor(private apicall: ApicallService, private router: Router,private model :ModelDataService ) { }
  username: string;
  adminMenu: boolean = false;
  orgMenu: boolean = false;
  userMenu: boolean = false;
  permissions:any;
  menulist: any[] = [];
  ngOnInit() {
    let role = localStorage.getItem("RoleName")
    let id = localStorage.getItem("userId")
    // this.permissions =  this.model.getRoleData().permission
    // console.log(this.permissions)

    this.apicall.getUserById(id).subscribe(res => {     
        this.apicall.getRoleById(res.role).subscribe(response => {
          let org = response.permission.find(x => x.Organization)
          let admin = response.permission.find(x => x.AdminManagement)
          let users = response.permission.find(x => x.UserManagement)       
          if (org.Organization.length > 0 && admin.AdminManagement.length > 0) {
            this.adminMenu = true;
            this.orgMenu = true;
          }
          if (users.UserManagement.length > 0) {
            this.userMenu = true;
          } 
        })
    
     
      
    })
         
    
    this.username = localStorage.getItem("currentUser");

  }
  homeMenu: boolean;
  selected: any;
  select(item) {
    this.selected = item;
    // if (item == "Edit Organization") {
    //   this.router.navigate(['/editorg']);
    // }
    // else if (item == "User Management") {
    //   this.router.navigate(['/it-admin-userlist']);
    // }
    // else if (item == "Admin Management") {
    //   this.router.navigate(['/adminmanagement/0']);
    // }
    // else if (item == "Dashboard") {
    //   this.router.navigate(['/it-admin-layout']);
    // }

  };
  isActive(item) {
    if (item == 'data') {
      this.homeMenu = true
    } else {
      this.homeMenu = false
    }
    return this.selected === item;
  };
  redirect(menu){
   
    this.router.navigate([menu],{ skipLocationChange: true });
  }

}

