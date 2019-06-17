import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApicallService } from '../../services/apicall.service';
import { Role } from './role';
import { AlertService } from 'ngx-alerts';
declare var $: any;


@Component({
  selector: 'app-user-role-list',
  templateUrl: './user-role-list.component.html',
  styleUrls: ['./user-role-list.component.css']
})
export class UserRoleListComponent implements OnInit {

  @Input() role: Role;


  result: string;
  rolelist: any;
  id: String;
  private sub: any;
  status: boolean = false;
  permissionList: any;
  roleAccess: any[] = [];
  showDelete: boolean = false
  allowAddOrg: boolean = false
  showEdit: boolean = false
  constructor(private apicall: ApicallService, private router: Router, private route: ActivatedRoute,private alertService : AlertService) { }
  crudList = ["Create", "Read", "Update", "Delete"]
  ngOnInit() {
    this.role = new Role();
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

          let org = response.permission.find(x => x.Roles)
          if (org.Roles.find(x => x == "Delete")) {

            this.showDelete = true;
          }
          if (org.Roles.find(x => x == "Create")) {

            this.allowAddOrg = true;
          }
          if (org.Roles.find(x => x == "Update")) {

            this.showEdit = true;
          }
        })
      })
    }
    this.getRoleList();
    this.getPermissionList();
    setTimeout(() => {
      $('#example').DataTable({
        "bPaginate": false,
         "bInfo" : false
      });
    }, 1000);

  }
  permissions: any;
  reserData() {
    this.role = new Role();
  }

  addRole() {
    this.role.permission = this.list
    console.log(this.role)
    this.apicall.postRole(this.role).subscribe(
      res => {
        this.result = res.message;

        this.alertService.success(this.result)
        this.getRoleList();
        this.reserData()
      },

      (err) => {
        this.alertService.danger(JSON.parse(err._body));
         console.log(JSON.parse(err._body));
      });

  }

  UpdateRole() {
    this.role.permission = this.list

    this.apicall.UpdateRoleById(this.role).subscribe(
      res => {
        this.result = res.message;

        this.alertService.success(this.result)
        this.getRoleList();
        this.reserData();
        this.status = false;

      },
      (err) => {
        console.log(err);
        this.status = false;

        this.alertService.danger(err._body)
      });
  }

  getRoleList() {

    this.apicall.getRole().subscribe(res => {
      this.rolelist = res;
    });

  }
  list = [] = []
  getPermissionList() {

    this.apicall.getPermissionMaster().subscribe(res => {
      this.permissionList = res

      for (let i of this.permissionList) {
        var obj = {}
        obj[i] = []
        this.list.push(obj)
      }
    });



  }

  setcreate(event, selection, table) {
    if(event){
      this.list.map((data) => {
        if (data.hasOwnProperty(table)) {
          data[table].push(selection)
        }
      })
    }
    if(!event){
      this.list.map((data) => {
        if (data.hasOwnProperty(table)) {
          data[table].splice(selection,1)
        }
      })
    }
  }
  onSelect(selectedItem: any) {

    this.role = new Role();
    this.apicall.getRoleById(selectedItem.roleId).subscribe(res => {
      this.role = res;
    
    });

    this.status = true;
    this.getRoleList()
  }

  onDelete(selectedItem: any) {
    if (confirm("Are you sure, you want to delete the Role :  " + selectedItem.roleName)) {
    this.apicall.DeleteRoleById(selectedItem.roleId).subscribe(
      res => {
        this.result = res.message;
        this.alertService.success(this.result)
        this.getRoleList();
        this.reserData()

      });
    }
    else{

    }
  }
  setProperty(e){
    if (e ) {
      this.role.admin = e;
    }
    if (!e) {
      this.role.admin = e;
    }

  }
}


