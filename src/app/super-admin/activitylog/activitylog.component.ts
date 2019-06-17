import { Component, OnInit } from '@angular/core';
import {ApicallService} from '../../services/apicall.service';
import { Router } from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-activitylog',
  templateUrl: './activitylog.component.html',
  styleUrls: ['./activitylog.component.css']
})
export class ActivitylogComponent implements OnInit {
  userlog: ActivityLog;
  constructor(private apicall: ApicallService, private router: Router) { }

  ngOnInit() {
    this.apicall.getLog().subscribe(res => {
      console.log(res)
      this.userlog = res
    });
    setTimeout(() => {
      $('#example').DataTable({
        "bPaginate": true,
         "bInfo" : false
      });
  }, 1000);
  }

}
export class ActivityLog
{
   
  userId:  String;
  loginTime :  Date;
  logoutTime:  Date;
    
   
}