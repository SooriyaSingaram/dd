import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from 'ngx-alerts';

import { UserModel } from '../../User';
import { ApicallService } from '../../services/apicall.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-createadmin',
  templateUrl: './createadmin.component.html',
  styleUrls: ['./createadmin.component.css']
})
export class CreateadminComponent implements OnInit {

  @Input() users: UserModel;
  constructor(private apicall: ApicallService, private router: Router, private route: ActivatedRoute, private alertService: AlertService) { }

  id: String;
  private sub: any;
  status: boolean = false;
  result: string;
  adminList: any[] = [];
  OrganizationId: string;
  addAdmin: boolean = false
  allowEdit: boolean = false
  allowDelete: boolean = false
  allowRead: boolean = false
  showloader: boolean = false;

  editUser() {

    this.apicall.UpdateUserById(this.users).subscribe(
      res => {
        this.result = res.message;
        //alert(this.result);
        this.alertService.success(this.result)
        this.resetForm()
        this.loadUsers();
        this.status = false;
      },
      (err) => {
        console.log(err);
        alert(err._body)
      });
  }

  ngOnInit() {

    //Role Access
    let id = localStorage.getItem("userId")

    this.apicall.getUserById(id).subscribe(res => {

      let Orgid = res.OrganizationId


      this.apicall.getRoleById(res.role).subscribe(response => {

        let admin = response.permission.find(x => x.AdminManagement)
        if (admin.AdminManagement.find(x => x == "Delete")) {

          this.allowDelete = true;
        }
        if (admin.AdminManagement.find(x => x == "Create")) {

          this.addAdmin = true;
        }
        if (admin.AdminManagement.find(x => x == "Update")) {

          this.allowEdit = true;
        }
        if (admin.AdminManagement.find(x => x == "Read")) {

          this.allowRead = true;
        }
      })
    })
    //Role Access end
    this.OrganizationId = localStorage.getItem("OrganizationId")
    this.loadUsers();
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    if (this.id != "0") {
      this.apicall.getUserById(this.id).subscribe(res => {
        this.users = res;
        this.users.OrganizationId = res.OrganizationId[0];
      });
      this.status = true;
    }
    else {
      this.users = new UserModel();
      this.status = false;
    }
    setTimeout(() => {
      $('#example').DataTable({
        "bPaginate": false,
        "bInfo": false
      });
    }, 100);
  }
  loadUsers() {
    this.adminList.length = 0;
    this.apicall.getUserList().subscribe(res => {
      let _adminList = res
      for (let admins of _adminList) {
        if (admins.role == "R002") {
          this.adminList.push(admins)
        }
      }
    });
  }
  saveuser() {
    this.showloader = true;
    this.users.OrganizationId = this.OrganizationId
    this.apicall.getOrganizationById(this.users.OrganizationId).subscribe(res => {
      this.users.selectedTemplates = res.templates
      this.users.selectedThemes = res.theme
    })
    this.users.role = "R002"
    this.users.ParentCompany = ['All'];
    this.apicall.postUser(this.users).subscribe(
      res => {
        this.result = res.message;
        this.showloader = false;
        // alert(this.result);
        this.alertService.success(this.result)
        this.resetForm()
        this.loadUsers()
      },
      (err) => {
        console.log(err);
        this.showloader = false;
        this.alertService.danger(JSON.parse(err._body).message);
        console.log(JSON.parse(err._body));
      });
  }
  resetForm() {
    this.users = new UserModel();
  }
  onSelect(selectedItem: any) {

    this.users = new UserModel();
    this.apicall.getUserById(selectedItem._id).subscribe(res => {
      this.users = res;
    });

    this.status = true;
    this.loadUsers()
  }

  onDelete(selectedItem: any) {
    this.apicall.DeleteUserById(selectedItem._id).subscribe(
      res => {
        this.result = res.message;
        this.alertService.success(this.result)

        // alert(this.result);
        this.loadUsers()

      });
  }
}
