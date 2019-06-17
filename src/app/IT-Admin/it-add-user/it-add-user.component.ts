import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { take, takeUntil } from 'rxjs/operators';
import { OrderPipe } from 'ngx-order-pipe';
import { AlertService } from 'ngx-alerts';
import { UserModel } from '../../User';
import { ApicallService } from '../../services/apicall.service';
import { ChartService } from '../../services/chart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModelDataService } from '../../services/model-data.service';


@Component({
  selector: 'app-it-add-user',
  templateUrl: './it-add-user.component.html',
  styleUrls: ['./it-add-user.component.css']
})
export class ItAddUserComponent implements OnInit {
  @Input() users: UserModel;
  order: string;
  ascending: boolean = false;
  SelectaRole;
  sortedCollection: any[];
  constructor(private apicall: ApicallService, private router: Router, private route: ActivatedRoute, private model: ModelDataService, private service: ChartService, private orderPipe: OrderPipe, private alertService: AlertService) {
    this.sortedCollection = orderPipe.transform(this.message);
  }

  message: any;
  id: String;
  private sub: any;
  status: boolean = false;
  result: string;
  role_list: any[];
  parentcompany_list: any[] = [];
  dropdownSettings: any;
  selectedItems: any[] = [];
  OrganizationId: string;
  TemplatesSettings = {};
  TemplatesList: any[] = [];
  showPassword: boolean = false
  showloader: boolean = false;
  resetForm() {
    this.users = new UserModel();
  }
  goToUser() {
    this.router.navigate(['/it-admin-userlist'], { skipLocationChange: true });
  }
  editUser() { 

    let termpParent = [];
    for (let i of this.users.ParentCompany) {
      termpParent.push(i.itemName)
    }
    this.users.ParentCompany.length = 0;
    this.users.ParentCompany = termpParent;
    this.apicall.UpdateUserById(this.users).subscribe(
      res => {
        this.result = res.message;      
        this.alertService.success(this.result)
        this.router.navigate(['/it-admin-userlist'], { skipLocationChange: true });
      },
      (err) => {        
        this.alertService.danger(err._body)
        this.router.navigate(['/it-admin-userlist'], { skipLocationChange: true });
      }

    );
  }
  showPass() {
    this.showPassword = true;
  }
  ngOnInit() {
    this.getRole()
    this.getParentCompany()
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    if (this.id != "0") {
      this.users = new UserModel();
      this.apicall.getUserById(this.id).subscribe(res => {      
        this.parentCompanuManuplate(res)
        this.getTemplateList(res.selectedTemplates)
      });
      this.status = true;
    }
    else {
      this.users = new UserModel();
      this.users.OrganizationId = localStorage.getItem("OrganizationId");
      this.apicall.getOrganizationById(this.users.OrganizationId).subscribe(res => {
        this.users.selectedThemes = res.theme
        this.TemplatesList = res.templates
       
      })
      this.status = false;
    }
    let name = localStorage.getItem("currentUser");    
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select ",
      enableSearchFilter: true,
      classes: "myclass custom-class"
    }  
  }
  getRole() {
    this.apicall.getRole().subscribe(res => {
      this.role_list = res;

      this.role_list.forEach((item, index) => {
        if (item.admin) this.role_list.splice(index, 1);
      });      
      this.role_list.splice(this.role_list.find(x => x.roleId == "R001"), 1)
      this.role_list.splice(this.role_list.find(x => x.roleId == "R002"), 1)
    });
  }

  parentCompanuManuplate(userdata) {    
    let userParentCompany = [];  
    this.service.getUserFilter("ParentCompany").subscribe(res => {
      for (let j = 0; j < userdata.ParentCompany.length; j++) {
        for (let i in res) {
          if (res[i]._id.ParentCompany == userdata.ParentCompany[j]) {
            userParentCompany.push({ "id": i, "itemName": res[i]._id.ParentCompany })
          }
        }
      }

      userdata.ParentCompany.length = 0;
      userdata.ParentCompany = userParentCompany;
      this.users = userdata;


    });
   

  }
  getParentCompany() {
    this.service.getUserFilter( "ParentCompany").subscribe(res => {
    // let data =  res.sort(function(a, b) {
    //     var textA = a._id.ParentCompany.toUpperCase();
    //     var textB = b._id.ParentCompany.toUpperCase();
    //     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    // });
      for (let i in res) {
        this.parentcompany_list.push({ "id": i, "itemName": res[i]._id.ParentCompany })
        
      }
    });

  }
  //get Tempaltes

  getTemplateList(userTemplates: any) {
    let orglist: any;
    this.users.OrganizationId = localStorage.getItem("OrganizationId");
    this.apicall.getOrganizationById(this.users.OrganizationId).subscribe(res => {
      this.TemplatesList = res.templates
      let temp: any = [];
      for (let i of this.TemplatesList) {
        temp.push(i.itemName)
      }
      let mismatch = userTemplates.filter(item => temp.indexOf(item.itemName) < 0);    
      for (let i of mismatch) {
        userTemplates.forEach((item, index) => {
          if (item === i) userTemplates.splice(index, 1);
        });
      }          
      this.users.selectedThemes = res.theme
    })

  }


  onItemSelect(item: any) {
    this.selectedItems = item;
  }
  OnItemDeSelect(item: any) {
    this.selectedItems.splice(item.id, 1);
  }
  

  saveuser() {
    this.showloader = true;
    this.users.OrganizationId = localStorage.getItem("OrganizationId");  
    let termpParent = [];
    for (let i of this.users.ParentCompany) {
      termpParent.push(i.itemName)
    }
    this.users.ParentCompany.length = 0;
    this.users.ParentCompany = termpParent;
    this.apicall.postUser(this.users).subscribe(
      res => {
        this.result = res.message;
        this.showloader = false;      
        this.alertService.success(this.result)
        this.router.navigate(['/it-admin-userlist'], { skipLocationChange: true });
      },
      (err) => {
        console.log(err);
        this.alertService.danger(err._body)
        this.showloader = false;
        this.router.navigate(['/it-admin-userlist'], { skipLocationChange: true });
      });
  }




}
