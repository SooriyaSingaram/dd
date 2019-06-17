import { Injectable } from '@angular/core';
import { UserModel } from '../User'
import { Templates } from '../WidgetsModel'
import { Role } from '../super-admin/user-role/role'
import { ApicallService } from '../services/apicall.service';

@Injectable()
export class ModelDataService {

  public user: UserModel;
  public template: Templates;
  public roles: Role;

  constructor(private apicall: ApicallService) { }

  setData(data: UserModel) {
    this.user = data;
  }
  getData() {
    return this.user;

  }
  setTemplateData(data: Templates) {
    console.log(data)
    this.template = data;
  }
  getTemplateData() {
    return this.template;

  }

  setRoleData(id: string) {
    console.log(id)
    this.apicall.getUserById(id).subscribe(res => {
      if(res){
        this.apicall.getRoleById(res.role).subscribe(response => {
          this.roles = response
          console.log(response)
          return true;
        })
      }
     
      
    })
  

    // this.roles = data;
  }
  getRoleData() {
    return this.roles
  }


}
