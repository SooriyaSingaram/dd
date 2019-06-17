import { Component, OnInit } from '@angular/core';
import { AlertService } from 'ngx-alerts';

import {ApicallService} from '../../services/apicall.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adminchangepassword',
  templateUrl: './adminchangepassword.component.html',
  styleUrls: ['./adminchangepassword.component.css']
})
export class AdminchangepasswordComponent implements OnInit {
  id: String;

  resetpassword:Object= [];
  constructor(private apicall :ApicallService,private router:Router,private route: ActivatedRoute, private alertService : AlertService) { }

  ngOnInit() {
 

  }
  submitPassword(data){
  
    this.apicall.postChangePassword(data).subscribe(

      res => {
      
       //alert(res.message);
       this.alertService.success(res.message)
       //this.goToDashboard()
     },
     (err) => {

      this.alertService.danger(JSON.parse(err._body).message);
      console.log(JSON.parse(err._body));
      
     }
     
        ); 
  }

}
