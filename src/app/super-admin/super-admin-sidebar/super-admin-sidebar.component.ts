import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../services/apicall.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-super-admin-sidebar',
  templateUrl: './super-admin-sidebar.component.html',
  styleUrls: ['./super-admin-sidebar.component.css']
})
export class SuperAdminSidebarComponent implements OnInit {

  constructor(private apicall: ApicallService, private router: Router) { }
  templateMenu: boolean = false;
  orgMenu: boolean = false;
  userMenu: boolean = false;
  triggerMenu: boolean = false;
  roleMenu: boolean = false;
  p;
  ngOnInit() {
   let rolename =  localStorage.getItem("RoleName");
   if(rolename ==  "Super Admin"){
     console.log(rolename)
    this.templateMenu = true;
    this.orgMenu= true;
    this.userMenu = true;
    this.triggerMenu= true;
    this.roleMenu = true;
   }
   else{
    let id = localStorage.getItem("userId")
    this.apicall.getUserById(id).subscribe(res => {
      console.log(res)
      this.apicall.getRoleById(res.role).subscribe(response => {
        console.log(response)
        
        let org = response.permission.find(x => x.Organization)
        let role = response.permission.find(x => x.Roles)
        let users = response.permission.find(x => x.UserManagement)
        let template = response.permission.find(x => x.Template)
        let trigger = response.permission.find(x => x.Trigger)
        if (org.Organization.length > 0) {
          this.orgMenu = true;
        }
        if (role.Roles.length > 0) {
          this.roleMenu = true;
        }
        if (users.UserManagement.length > 0) {
          this.userMenu = true;
        }
        if (template.Template.length > 0) {
          this.templateMenu = true;
        }
        if (trigger.Trigger.length > 0) {
          this.triggerMenu = true;
        }
      })



    })
   }
    
  }

  redirect(menu){
   
    this.router.navigate([menu],{ skipLocationChange: true });
  }

}
