import { Component, OnInit,Input } from '@angular/core';
import { AlertService } from 'ngx-alerts';
import { Reset } from '../User'

import {ApicallService} from '../services/apicall.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  @Input()resetpassword: Reset;

  // resetpassword:Object= [];
  themenumber:number;

  constructor(private apicall :ApicallService,private router:Router,private route: ActivatedRoute,private alertService : AlertService) { }
  id: String;
  username:string;
  private sub: any;
  selectedTheme:any[];
  selectedTemplate:any[];
  selectedtable:any[];
  ngOnInit() {
    this.resetpassword= new Reset();
    this.username = localStorage.getItem("currentUser");
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; 
       
   });

   this.apicall.getUserById(this.id).subscribe(res => {
    let themetype:string =  res.selectedThemes[0].itemName;
    this.themenumber = +themetype.substr(themetype.length - 1);
});
  }
  submitPassword(data){
  
    this.apicall.postChangePassword(data).subscribe(

      res => {
      
       this.alertService.success(res.message);
       this.goToDashboard()
     },
     (err) => {
      this.alertService.danger(JSON.parse(err._body).message);
       console.log(JSON.parse(err._body));
      
     }
     
        ); 
  }

  goToDashboard(){
    this.router.navigate(['/homepage'],{ skipLocationChange: true });

  }
  logout(){
    localStorage.removeItem('currentToken');
      this.router.navigate(['/']);
  }

  UserProfile(){
    this.router.navigate(['/userprofile/',this.id],{ skipLocationChange: true });
  }
  
}

