import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../services/apicall.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChartService } from '../../services/chart.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private service: ChartService, private apicall: ApicallService, private router: Router) { }
  id: String;
  username: string;
  private sub: any;
  hideusercreation: boolean = true;
  userid: string;
  CopiesTable: any;
  MarketShareTable: any[] = [];
  TopReturnTable: any;
  Rolename: string;
  tablename: string;
  samplearray: any[] = [];
  widgetsResult: any;
  showloader:boolean=true;
  ngOnInit() {
    //load Widgets
    this.service.getWidgetResult().subscribe(res => {

      this.widgetsResult = res

    });
    //
    this.Rolename = localStorage.getItem("RoleName")

    this.username = localStorage.getItem("currentUser");
    this.userid = localStorage.getItem("userId");
    this.apicall.getUserById(this.userid).subscribe(res => {

      this.getTopReturns()

    });
    setTimeout(()=>{
      this.showloader = false;
 },150);

  }
  getTopReturns() {
  
    this.service.getTopResults().subscribe(res => {
     
      this.MarketShareTable =res;
    })
  }

  changePassword() {

    this.router.navigate(['/changepassword/', this.userid], { skipLocationChange: true });
  }

  goToTrigger() {
    this.router.navigate(['/usertrigger/', this.userid], { skipLocationChange: true });

  }

  CreateUser() {


    this.router.navigate(['/createstandarduser'], { skipLocationChange: true });
  }
  GoToHome() {
    this.router.navigate(['/homepage'], { skipLocationChange: true });

  }

  logout() {
    localStorage.removeItem('currentToken');
    this.router.navigate(['/']);
  }

  UserProfile() {
    this.router.navigate(['/userprofile'], { skipLocationChange: true });
  }

}
