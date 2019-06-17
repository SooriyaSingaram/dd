import { Component, OnInit , Input} from '@angular/core';
import { Router } from '@angular/router';

import {ApicallService} from '../services/apicall.service';
import { UserModel } from '../User';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private apicall :ApicallService,private router:Router) { }
  @Input() user:UserModel;
  status:boolean ;
  result:string;
  responseStatus:Object= [];
  submitEmail(){
   let email:String = this.user.emailId;
    
         this.apicall.postForgotPassword(email).subscribe(
   
           res => {   
           this.result =  res.message;
          
          },
          (err) => {
     
            console.log(err);
          
          }
          
             ); 
             this.status = true;   
       }
     
     
   
  ngOnInit() {
    this.user = new UserModel();
  }

  
}
