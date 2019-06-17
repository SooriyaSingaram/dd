import { Organization } from "./Organization";

export class UserModel
{
    _id:String;
    userName:  String;
    emailId:  String;  
    password:  String;
    role:  String;   
    mobile:  String;
    ParentCompany:any;
    OrganizationId:  String;
    repassword:String;     
    selectedTemplates:any;
    selectedThemes:any;  
    

}

export class Reset{
    oldPassword:String;
    newPassword:String;
    confirmNewPassword:String;
  }