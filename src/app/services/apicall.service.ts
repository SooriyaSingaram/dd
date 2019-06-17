import { HttpModule, Http,Response,RequestOptions,Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import { Role } from '../super-admin/user-role/role'
import 'rxjs/add/operator/map'
import { UserModel } from '../User'
import { Templates } from '../WidgetsModel'

import {Organization  } from '../Organization';
import {TriggerField  } from '../TriggerFields';
import {globalValues,email  } from '../super-admin/global-values/global';


@Injectable()
export class ApicallService {

  returnCommentStatus:Object = [];

   public url: string = "http://35.170.221.105:4000";
  // public url: string = "http://192.168.1.125:4000";
  

  constructor(private http: Http) {}

  uploadLogo(fileToUpload) {
   
    let formData = new FormData();
    formData.append('file', fileToUpload);
    let headers = new Headers();
    let token: string = localStorage.getItem("currentToken");
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });  
    let api_Url: string = `${this.url}/api/organization/upload`
    return this.http.post(api_Url, formData, options).map((response: Response) => response.json());
   
  }

  superAdminHomePage(){
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
  
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });

    let api_Url: string = `${this.url}/api/organization/homePage/userCount`
   
    return this.http.get(api_Url,options).map(response=> response.json());
  }
  userAuthentication(){
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
  
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });

    let api_Url: string = `${this.url}/api/checkAuthentication`
   
    return this.http.get(api_Url,options).map(response=> response.json());
  }
  superAdminUserList(){
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
  
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });

    let api_Url: string = `${this.url}/api/organization/homePage/adminList`
   
    return this.http.get(api_Url,options).map(response=> response.json());
  }
  
  postLogin(user:UserModel) {
    let api_Url: string = `${this.url}/user/login`
   
    return this.http.post(api_Url, user, {  }).map(res =>  res.json());     	    
 }
 getLog(){
  let headers = new Headers({ 'Accept': 'application/json' });
  let token: string = localStorage.getItem("currentToken");

  headers.append('x-access-token', token);
  let options = new RequestOptions({ headers: headers });

  let api_Url: string = `${this.url}/user/getLog`
 
  return this.http.get(api_Url,options).map((response: Response)=> response.json());
 }
 setLogout(userid){
  let body = {"id" :  userid}
  let api_Url: string = `${this.url}/user/logout`
  let headers = new Headers({ 'Accept': 'application/json' });
  let token: string = localStorage.getItem("currentToken");

  headers.append('x-access-token', token);
  let options = new RequestOptions({ headers: headers });
  return this.http.post(api_Url, body,options).map(res =>  res.json());    
 }
 postForgotPassword( email:String) {

  let api_Url: string = `${this.url}/user/forgotPassword`
  return this.http.post(api_Url, {"email": email}, {  }).map(res =>  res.json());     	    
}

postResetPassword(id:string, password:String) {
  
    let api_Url: string = `${this.url}/user/resetPassword`
    return this.http.post(api_Url, {id:id,newPassword:password}, {  }).map(res =>  res.json());     	    
  }

postChangePassword( resetpassword:Object) {

  let headers = new Headers({ 'Accept': 'application/json' });
  let token: string = localStorage.getItem("currentToken");

  headers.append('x-access-token', token);
  let options = new RequestOptions({ headers: headers });

let id: string = localStorage.getItem("userId");

let oldPassword :string =resetpassword['oldPassword'];    // => 'white'  
let newPassword :string =resetpassword['newPassword'];    // => 'black'

let api_Url: string = `${this.url}/api/userProfile/changePassword`
  return this.http.post(api_Url, { "id":id,"oldPassword":oldPassword,"newPassword":newPassword},options ).map(res =>  res.json());     	    
}

organizationBasedUsers( id) {
  
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
  
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
  
  let api_Url: string = `${this.url}/api/userProfile/getOrgBasedUsers`
    return this.http.post(api_Url, { "OrganizationId":id},options ).map(res =>  res.json());     	    
  }

postOrganization( organization:Organization) {

  let headers = new Headers({ 'Accept': 'application/json' });
  let token: string = localStorage.getItem("currentToken");

  headers.append('x-access-token', token);
  let options = new RequestOptions({ headers: headers });

  let api_Url: string = `${this.url}/api/organization`
    return this.http.post(api_Url, organization, options).map(res =>  res.json());     	    
  }
  postUser( user:UserModel) {

    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
  
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
 
    let api_Url: string = `${this.url}/user/register`
      return this.http.post(api_Url, user, options).map(res =>  res.json());     	    
    }

    getRole(){

      let headers = new Headers({ 'Accept': 'application/json' });
      let token: string = localStorage.getItem("currentToken");
    
      headers.append('x-access-token', token);
      let options = new RequestOptions({ headers: headers });

      let api_Url: string = `${this.url}/api/role`
     
      return this.http.get(api_Url,options).map((response: Response)=> response.json());
  }
  getOrganization(){

    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
  
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });

    let api_Url: string = `${this.url}/api/organization`
   
    return this.http.get(api_Url,options).map((response: Response)=> response.json());
}
getUserList(){

  let headers = new Headers({ 'Accept': 'application/json' });
  let token: string = localStorage.getItem("currentToken");

  headers.append('x-access-token', token);
  let options = new RequestOptions({ headers: headers });

  let api_Url: string = `${this.url}/api/userProfile`
 
  return this.http.get(api_Url,options).map((response: Response)=> response.json());
}

getUserById(_id:String){

  let headers = new Headers({ 'Accept': 'application/json' });
  let token: string = localStorage.getItem("currentToken");

  headers.append('x-access-token', token);
  let options = new RequestOptions({ headers: headers });

  let api_Url: string = `${this.url}/api/userProfile`

  return this.http.get(api_Url+"/"+_id,options).map((response: Response)=> response.json());
}

getOrganizationById(_id:String){

  let headers = new Headers({ 'Accept': 'application/json' });
  let token: string = localStorage.getItem("currentToken");

  headers.append('x-access-token', token);
  let options = new RequestOptions({ headers: headers });

  let api_Url: string = `${this.url}/api/organization`

  return this.http.get(api_Url+"/"+_id,options).map((response: Response)=> response.json());
}
UpdateOrganizationById(organization:Organization){
  
  let headers = new Headers({ 'Accept': 'application/json' });
  let token: string = localStorage.getItem("currentToken");

  headers.append('x-access-token', token);
  let options = new RequestOptions({ headers: headers });

  let api_Url: string = `${this.url}/api/organization`

  return this.http.put(api_Url+"/"+organization._id,organization,options).map((response: Response)=> response.json());
}

DeleteOrganizationById(_id:String){

  let headers = new Headers({ 'Accept': 'application/json' });
  let token: string = localStorage.getItem("currentToken");

  headers.append('x-access-token', token);
  let options = new RequestOptions({ headers: headers });

  let api_Url: string = `${this.url}/api/organization`

  return this.http.delete(api_Url+"/"+_id,options).map((response: Response)=> response.json());
}

UpdateUserById( user:UserModel){
  
  let headers = new Headers({ 'Accept': 'application/json' });
  let token: string = localStorage.getItem("currentToken");

  headers.append('x-access-token', token);
  let options = new RequestOptions({ headers: headers });

  let api_Url: string = `${this.url}/api/userProfile`

  return this.http.put(api_Url+"/"+user._id,user,options).map((response: Response)=> response.json());
}
DeleteUserById(_id:String){

  let headers = new Headers({ 'Accept': 'application/json' });
  let token: string = localStorage.getItem("currentToken");

  headers.append('x-access-token', token);
  let options = new RequestOptions({ headers: headers });

  let api_Url: string = `${this.url}/api/userProfile`

  return this.http.delete(api_Url+"/"+_id,options).map((response: Response)=> response.json());
}


postTrigger( trigger:TriggerField) {

  let headers = new Headers({ 'Accept': 'application/json' });
  let token: string = localStorage.getItem("currentToken");

  headers.append('x-access-token', token);
  let options = new RequestOptions({ headers: headers });

  let api_Url: string = `${this.url}/api/webCondition`

    return this.http.post(api_Url, trigger, options).map(res =>  res.json());     	    
  }
  updateTrigger( trigger:TriggerField) {

    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
  
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
  
    let api_Url: string = `${this.url}/api/webCondition`
  
      return this.http.put(api_Url+"/"+trigger._id, trigger, options).map(res =>  res.json());     	    
    }

  getTriggerById(_id:String){

    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
  
    headers.append('x-access-token', token);
    
    let options = new RequestOptions({ headers: headers });
    let api_Url: string = `${this.url}/api/webCondition`
    return this.http.get(api_Url+"/"+_id,options).map((response: Response)=> response.json());
  }
  
  
  
  
    GetTriggerList() {
  
      let headers = new Headers({ 'Accept': 'application/json' });
      let token: string = localStorage.getItem("currentToken");
     
      headers.append('x-access-token', token);
      
      let options = new RequestOptions({ headers: headers });
      let api_Url: string = `${this.url}/api/webCondition`
      return this.http.get(api_Url,options).map((response: Response)=> response.json());	    
      }
    
      
      DeleteTriggerById(_id:String){

        let headers = new Headers({ 'Accept': 'application/json' });
        let token: string = localStorage.getItem("currentToken");
      
        headers.append('x-access-token', token);
        let options = new RequestOptions({ headers: headers });
      
        let api_Url: string = `${this.url}/api/webCondition`
      
        return this.http.delete(api_Url+"/"+_id,options).map((response: Response)=> response.json());
      }
  postRole(role:Role){

    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
  
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
    
    let api_Url: string = `${this.url}/api/role`
    return this.http.post(api_Url, role, options).map(res =>  res.json());    
  }

  getPermissionMaster(){

    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
  
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
  
     let api_Url: string = `${this.url}/user/rolePermission`
   
    return this.http.get(api_Url,options).map((response: Response)=> response.json());

  }

  getRoleById(roleId){
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
  
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
  
    let api_Url: string = `${this.url}/api/role`
  
    return this.http.get(api_Url+"/"+roleId,options).map((response: Response)=> response.json());
  }

  DeleteRoleById(roleId){
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
  
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
  
    let api_Url: string = `${this.url}/api/role`
  
    return this.http.delete(api_Url+"/"+roleId,options).map((response: Response)=> response.json());
  }

  UpdateRoleById(role:Role){
    
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
  
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
  
    let api_Url: string = `${this.url}/api/role`
  
    return this.http.put(api_Url+"/"+role.roleId,role,options).map((response: Response)=> response.json());
  }

  postTemplate(template:Templates){
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
  
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
 
    let api_Url: string = `${this.url}/api/template`
      return this.http.post(api_Url, template, options).map(res =>  res.json());   
  }

  updateTemplate(template:Templates){
    console.log(template)
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
  
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
  
    let api_Url: string = `${this.url}/api/template`
  
    return this.http.put(api_Url+"/"+template._id,template,options).map((response: Response)=> response.json());
  }

  getTemplates(){
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
  
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
  
    let api_Url: string = `${this.url}/api/template`
   
    return this.http.get(api_Url,options).map((response: Response)=> response.json());
  }
  getTemplateById(_id){
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
  
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
  
    let api_Url: string = `${this.url}/api/template`
   
    return this.http.get(api_Url+"/"+_id,options).map((response: Response)=> response.json());
    
  }
 DeleteTemplateById(_id:String){
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
  
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
  
    let api_Url: string = `${this.url}/api/template`
  
    return this.http.delete(api_Url+"/"+_id,options).map((response: Response)=> response.json());
  }
  getCountry(){
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
    let api_Url: string = `${this.url}/api/userProfile/get/CountryList`
    return this.http.get(api_Url,options).map((response: Response)=> response.json());
  }
  checkTemplateName(templatename:String){
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
  
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
    let body = {"templateName": templatename}
    let api_Url: string = `${this.url}/api/template/checkTemplateName` 
    
      return this.http.post(api_Url, body, options).map(res =>  res.json());   
  }

  getAuth(){
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
  
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
    let api_Url: string = `${this.url}/api/checkAuthentication` 
      return this.http.get(api_Url, options).map(res =>  res.json());   
  }

  addGlobalvalues(global : globalValues){
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
  
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
  
    let api_Url: string = `${this.url}/api/report`
   
    return this.http.post(api_Url,global,options).map((response: Response)=> response.json());
  }

  getGlobalvalues(){
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
  
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
  
    let api_Url: string = `${this.url}/api/report`
   
    return this.http.get(api_Url,options).map((response: Response)=> response.json());
  }

  editGlobalvalues(id){
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
  
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
  
    let api_Url: string = `${this.url}/api/report`
   
    return this.http.get(api_Url+"/"+id,options).map((response: Response)=> response.json());
  }

  updateGlobalvalues(global : globalValues){
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
  
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
  
    let api_Url: string = `${this.url}/api/report`
   
    return this.http.put(api_Url+"/"+global._id,global,options).map((response: Response)=> response.json());
  }
  addemailvalues(global : email){
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
  
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
  
    let api_Url: string = `${this.url}/api/customize`
   
    return this.http.post(api_Url,global,options).map((response: Response)=> response.json());
  }

  getemailvalues(){
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
  
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
  
    let api_Url: string = `${this.url}/api/customize`
   
    return this.http.get(api_Url,options).map((response: Response)=> response.json());
  }

  editemailvalues(id){
    console.log(id)
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
  
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
  
    let api_Url: string = `${this.url}/api/customize`
   
    return this.http.get(api_Url+"/"+id,options).map((response: Response)=> response.json());
  }

  updateemailvalues(global : email){
    console.log(global)
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
  
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
  
    let api_Url: string = `${this.url}/api/customize`
   
    return this.http.put(api_Url+"/"+global._id,global,options).map((response: Response)=> response.json());
  }

  checkTemplate(id,custis){
    let body={
      templateId:id,
      customEmailId:custis
      
    }
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
  
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
  
    let api_Url: string = `${this.url}/api/customize/checkTemplate`
   
    return this.http.post(api_Url,body,options).map((response: Response)=> response.json());
  }

}
