import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from 'ngx-alerts';

import { UserModel } from '../../User';
import { ApicallService } from '../../services/apicall.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @Input() user: UserModel;
  constructor(private apicall: ApicallService, private router: Router, private route: ActivatedRoute, private alert: AlertService) { }

  id: String;
  private sub: any;
  status: boolean;
  result: string;
  role_list: any[] = [];
  organization_list: any[];

  showloader: boolean = false;
  addUser() {

    if ((this.user.role == "R001") || (this.user.role == "R002")) {
      this.user.ParentCompany = ["All"];
    }
    this.showloader = true;
    this.apicall.getOrganizationById(this.user.OrganizationId).subscribe(res => {
      this.user.selectedTemplates = res.templates
      this.user.selectedThemes = res.theme
    })

    this.apicall.postUser(this.user).subscribe(
      res => {
        this.result = res.message;
        this.showloader = false;
        // alert(this.result);
        this.alert.success(this.result)
        this.router.navigate(['/userlist'], { skipLocationChange: true });
      },
      (err) => {
        console.log(err);
        this.showloader = false;
        // alert(err._body)

        this.alert.danger(err._body)
      });
  }

  resetForm() {
    this.user = new UserModel();
  }
  goToUser() {
    this.router.navigate(['/userlist'], { skipLocationChange: true });
  }
  roledata;
  getRoles() {

    let name = localStorage.getItem("currentUser");

    // if (name == "SuperAdmin") {
    //   this.role_list = [{
    //     "roleName": "Organization Admin",
    //     "roleId": "R001"
    //   }, {
    //     "roleName": "IT Admin",
    //     "roleId": "R002"
    //   }]
    // }
    // else{
      
    this.apicall.getRole().subscribe(res => {
      this.roledata =res;
      debugger
      this.roledata.map((user) => {
        if ((user.roleId == 'R001') || (user.roleId == 'R002') || (user.admin == true)) {
          
          this.role_list.push(user)
          
        }
      })
    });
    // }

  }
  getOrganization() {
    this.apicall.getOrganization().subscribe(res => {
      this.organization_list = res;
    });
  }

  editUser() {
    this.apicall.UpdateUserById(this.user).subscribe(
      res => {
        this.result = res.message;
        // alert(this.result);
        this.alert.success(this.result)
        this.router.navigate(['/userlist'], { skipLocationChange: true });
      },
      (err) => {
        console.log(err);
        // alert(err._body)
        this.alert.danger(err._body)

      }
    );
  }

  hidediv: boolean = true;
  ngOnInit() {
    this.getRoles();
    this.getOrganization();

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    if (this.id != "0") {
      this.user = new UserModel();
      this.apicall.getUserById(this.id).subscribe(res => {

        this.user = res;
        this.user.OrganizationId = res.OrganizationId;

        if (this.user.role != "R001" && this.user.role != "R002") {
          this.apicall.getRole().subscribe(res => {
            res.map((user) => {
              if ((user.roleId == 'R001') || (user.roleId == 'R002') || (user.admin == true)) {
                this.role_list.push(user)
              }
            })
           // this.role_list = res;
          });
        }

      });
      this.status = true;
    }
    else {
      this.hidediv = false
      this.user = new UserModel();
      this.status = false;
    }
  }

}
