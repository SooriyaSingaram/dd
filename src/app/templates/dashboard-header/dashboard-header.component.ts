import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../services/apicall.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChartService } from '../../services/chart.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {
  id: String;
  themenumber: number;


  constructor(private service: ChartService, private apicall: ApicallService, private router: Router) { }
  ngOnInit() {

    this.id = localStorage.getItem("userId");
    this.apicall.getUserById(this.id).subscribe(res => {
      this.apicall.getOrganizationById(res.OrganizationId).subscribe(response => {
        console.log(response)
		   let themetype: string = response.theme[0].itemName;
      // this.themenumber = +themetype.substr(themetype.length - 1);
      this.themenumber=response.theme[0].id;
      
      console.log(this.themenumber)
      
	  });
    })
  }
  logout() {
    let id = localStorage.getItem("userId")
    this.apicall.setLogout(id).subscribe(res =>res);
    localStorage.removeItem('currentToken');
    localStorage.clear();
    localStorage.clear();
    this.router.navigate(['/']);
  }
  changePassword() {
    this.router.navigate(['/changepassword/', this.id],{ skipLocationChange: true });
  }
  UserProfile() {
    this.router.navigate(['/userprofile/', this.id],{ skipLocationChange: true });
  }
}
