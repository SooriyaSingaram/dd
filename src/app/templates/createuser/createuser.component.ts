import { Component, OnInit,Input } from '@angular/core';
import { AlertService } from 'ngx-alerts';

import { ModelDataService } from '../../services/model-data.service';
import {UserModel  } from '../../User';
import {ApicallService} from '../../services/apicall.service';
import {ChartService} from '../../services/chart.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.scss']
})
export class CreateuserComponent implements OnInit {
  @Input() user:UserModel;
  constructor(private apicall :ApicallService,private router:Router,private route: ActivatedRoute,private model: ModelDataService, private service:ChartService, private alert: AlertService ) { }
  themenumber: number;
  username_: string;
  userid: string;
  TemplatesName= [{"id":1 , "itemName":"Market Share"},{"id":2,"itemName":"Product Trend"},{"id":3,"itemName":"OEM Trend"},{"id":4,"itemName":"Top 10 Returners"},{"id":5,"itemName":"Copies & Remans"}];
  parentcompany_list:any[]=[];
  role_list:any[];
  tables:any[]=[];
  selectedItem:any[];
  selectedtable:any[];
  selectedItems :any[]= [];
  dropdownSettings = {};
  selectedTheme:any[];
  selectedTemplate:any[];
  assigntemplate:any[]=[];
  assigntheme:any[]=[];
  id: String;
  result:string;
  ngOnInit() {
    this.user = new UserModel();
    this.username_ = localStorage.getItem("currentUser");
    this.userid = localStorage.getItem("userId");

    this.apicall.getUserById(this.userid).subscribe(res => {

      let themetype: string = res.selectedThemes[0];
    
      this.themenumber = +themetype.substr(themetype.length - 1);
     
      let result = res.selectedTable  
      let result2 = res.selectedTable2
      let result3 = res.selectedTable3
      let result4 = res.selectedTable4
      let result5 = res.selectedTable5
     this.setMenu(result)
     this.setMenu(result2)
     this.setMenu(result3)
     this.setMenu(result4)
     this.setMenu(result5)
     this.assigntemplate.push(res.selectedTemplates[0]);
     this.assigntheme.push(themetype)
    
    });

    this.service.getUserFilter("ParentCompany").subscribe(res => {
    
      for(let i in res){
        this.parentcompany_list.push({"id":i,"itemName":res[i]._id.ParentCompany })
      }
   
   
    });
    this.apicall.getRole().subscribe(res => {     
      this.role_list = res;
     });
     this.dropdownSettings = { 
      singleSelection: false, 
      text:"Select ",
     
      enableSearchFilter: true,
      classes:"myclass custom-class"
    }
   
  }
  dynamicTemplates:any[]=[];
  tablename: string;
  selectedTableResult: any[];
  
  addUser(){
   
    // this.user.TemplateName = this.tables;
    // this.user.ParentCompany = this.selectedItems
    // this.user.NoOfTemplates = this.user.TemplateName.length
    // this.user.selectedTemplates =  this.assigntemplate
    // this.user.selectedThemes = this.assigntheme
    // this.model.setData(this.user)
    
    this.saveUser()  
   
  }

  saveUser(){
    this.apicall.postUser(this.user).subscribe(
      res => {

        this.result = res.message;
        //alert(this.result);
        this.alert.success(this.result)
        this.goToDashboard()
      },
      (err) => {

      
          this.alert.danger(err._body)
          
}
      

    );
  }
  onItemSelect(item: any) {
    this.selectedItems.push(item.itemName)
   }
   OnItemDeSelect(item:any){
   this.selectedItems.splice(item.id,1);
   }
   onTempSelect(item:any){
   this.tables.push(item.itemName);
    
   this.tablename = item.itemName;
   
  //  for (let entry of this.dynamicTemplates) {
  //    if (entry.table == "Market Share" && item.itemName == "Market Share" ) {
  //     this.user.selectedTable = entry.charts
     
  //    }
  //    if (entry.table == "Product Trend" && item.itemName  == "Product Trend" ) {
  //     this.user.selectedTable2 = entry.charts
     
  //    }
  //     if (entry.table == "OEM Trend" && item.itemName == "OEM Trend" ) {
  //     this.user.selectedTable3 = entry.charts
      
  //    }
  //    else if (entry.table  == "Top 10 Returners" && item.itemName == "Top 10 Returners" ) {
  //     this.user.selectedTable4 = entry.charts
      
  //    }
  //    else if (entry.table  == "Copies & Remans"  && item.itemName == "Copies & Remans" ) {
  //     this.user.selectedTable5 = entry.charts
    
  //    }
    
     

  //  }
   this.model.setData(this.user);  
  }
   onTempDeSelect(item: any) {
     this.tables.splice(item.id,1);
    
    }
   

    setMenu(result) {
      let tablename:string;
      for (let looptables of result) {
       
        
        tablename = looptables.table[0]
      }
      
      this.dynamicTemplates.push({
        table:tablename,
        charts:result
      }) 
      
       
 
  
    }
    loadTableData(menu) {
      
      this.tablename = menu;
      for (let entry of this.dynamicTemplates) {
        if (entry.table == this.tablename ) {
          this.selectedTableResult = entry.charts
         
        }
  
      }
    
  
    }
    goToDashboard(){
      this.apicall.getUserById(this.userid).subscribe(res => {
        let themetype:string =  res.selectedThemes[0];
        this.themenumber = +themetype.substr(themetype.length - 1);
       
        this.selectedTheme = res.selectedThemes;
          
        this.selectedTemplate = res.selectedTemplates;
      
         if( this.selectedTemplate[0] == "template1" ){
          localStorage.setItem("userId",this.userid);
         this.router.navigate(['/temp1_theme1']);
        
         }
         else if( this.selectedTemplate[0] == "template2" ){
           localStorage.setItem("userId",this.userid);
         this.router.navigate(['/temp1_theme1']);
        
         }
         else if(this.selectedTemplate[0] == "template3" ){
           localStorage.setItem("userId",this.userid);
         this.router.navigate(['/temp1_theme1']);
        
         }
         else if(this.selectedTemplate[0] == "template4" ){
           localStorage.setItem("userId",this.userid);
         this.router.navigate(['/temp1_theme1']);
        
         }
         else if( this.selectedTemplate[0] == "template5" ){
           localStorage.setItem("userId",this.userid);
         this.router.navigate(['/temp1_theme1']);
        
         }
    });
    }
    changePassword() {

      this.router.navigate(['/changepassword/', this.userid]);
    }

    logout(){
      localStorage.removeItem('currentToken');
        this.router.navigate(['/']);
    }
   
  
    UserProfile(){
      this.router.navigate(['/userprofile']);
    }
  
   
}
