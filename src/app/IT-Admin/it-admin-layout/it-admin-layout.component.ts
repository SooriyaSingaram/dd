import { Component, OnInit, Input } from '@angular/core';
import { ApicallService } from '../../services/apicall.service';
import { UserModel } from '../../User';
@Component({
  selector: 'app-it-admin-layout',
  templateUrl: './it-admin-layout.component.html',
  styleUrls: ['./it-admin-layout.component.css']
})
export class ItAdminLayoutComponent implements OnInit {
  @Input() users: UserModel;
  constructor(private apicall: ApicallService) { }
  username: string;
  id: string;
  ITAdminList: any[]=[];
  usersCount: any[] = [];
  OrgAdminCount:any[]=[];
  TemplatesList: any;
  TempaltesCount :number
  ngOnInit() {
    this.users = new UserModel();
    this.id = localStorage.getItem("userId")
    this.username = localStorage.getItem("currentUser");

    this.apicall.getUserById(this.id).subscribe(res => {
      this.users = res;
      // this.selectedTemplates =this.users.selectedTemplates["0"]
      let orgid = this.users.OrganizationId
      this.apicall.getOrganizationById(orgid).subscribe(res => {
        this.TemplatesList = res.templates
        this.TempaltesCount = this.TemplatesList.length
      })
    });
    this.apicall.getUserList().subscribe(res => {
      for (let admins of res) {

        if (admins.role == "R001") {
          this.OrgAdminCount.push(admins)
        }
       else  if (admins.role == "R002") {
          this.ITAdminList.push(admins)
        }
        else {
this.usersCount.push(admins)
        }
      }
    });

  }
}
