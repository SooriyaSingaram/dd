import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModelDataService } from '../services/model-data.service';
import { AlertService } from 'ngx-alerts';

import { ApicallService } from '../services/apicall.service';
import { UserModel } from '../User';


import { Response } from '@angular/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private alertService: AlertService, private apicall: ApicallService, private router: Router, private model: ModelDataService) { }
  @Input() users: UserModel;
  responseStatus: Object = [];
  role: String;
  token: String;
  name: String;
  id: string;
  selectedTheme: any[];
  selectedTemplate: any[];
  selectedtable: any[];

  submitLogin() {
    this.users.userName=this.users.userName.trim();
    this.users.userName =this.users.userName.toLowerCase()
    this.apicall.postLogin(this.users).subscribe(

      res => {
        this.role = res.role;
        this.token = res.access_token;
        this.name = res.userName;
        this.id = res.id;
        this.selectedTheme = res.selectedThemes;
        let OrganizationId = res.OrganizationId;
        this.selectedTemplate = res.selectedTemplates;
        localStorage.setItem("currentToken", this.token.toString());
        localStorage.setItem("currentUser", this.name.toString());        
        if (this.role == "Super Admin") {
          localStorage.setItem("RoleName", "Super Admin")
          this.router.navigate(['/super-admin'], { skipLocationChange: true });
        }
        else if (res.master == "Super Admin") {
          console.log(res.master)
          localStorage.setItem("userId", this.id.toString())
          this.router.navigate(['/super-admin'], { skipLocationChange: true });
        }
        else if (this.role == "R001") {
          localStorage.setItem("OrganizationId", OrganizationId.toString())
          localStorage.setItem("userId", this.id.toString())
          localStorage.setItem("RoleName", "Organization User")
          this.router.navigate(['/it-admin-layout'], { skipLocationChange: true });
        }
        else if (this.role == "R002") {
          localStorage.setItem("OrganizationId", OrganizationId.toString())
          localStorage.setItem("userId", this.id.toString())
          localStorage.setItem("RoleName", "IT Admin")
          this.router.navigate(['/it-admin-layout'], { skipLocationChange: true });
        }
        else {
          localStorage.setItem("RoleName", "Standard User")
          localStorage.setItem("userId", this.id.toString());
          this.router.navigate(['/temp1_theme1/1']);
        }
      },
      (err) => {
        this.alertService.danger(JSON.parse(err._body).message)
      });
  }

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      if (localStorage.getItem('RoleName') == ("Super Admin")) {
        this.router.navigate(['/super-admin'], { skipLocationChange: true });
      }
      else if (localStorage.getItem('RoleName') == ("IT Admin") || (localStorage.getItem('RoleName') == "Organization User")) {
        this.router.navigate(['/it-admin-userlist'], { skipLocationChange: true });
      } else {
        this.router.navigate(['/temp1_theme1/1']);
      }
    }
    this.users = new UserModel();
  }

}
