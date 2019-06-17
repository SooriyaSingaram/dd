import { Organization } from "./Organization";
export class TriggerField
{
   
    ConditionName:  String;
    PropertyName :  String;
    ComparisonOperator:  String;
    ConditionValue:  String;
    UsersList:any;
    conditionList:any=[];
    Period:String;
    Template: String;
    OrganizationId:  String;
    organizationName:String;
    _id:String;
   
}