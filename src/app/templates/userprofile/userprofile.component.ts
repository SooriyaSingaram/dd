import { Component, OnInit, Input } from '@angular/core';
import { ApicallService } from '../../services/apicall.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModelDataService } from '../../services/model-data.service'
import { UserModel } from '../../User';
import { AlertService } from 'ngx-alerts';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
  @Input() users: UserModel;
  constructor(private apicall: ApicallService ,private alertService : AlertService,private router: Router, private route: ActivatedRoute) { }
  id: String;
  username: string;
  private sub: any;
  selectedTheme: any[];
  selectedTemplate: any[];
  selectedtable: any[];
  themenumber: number;
  role_list: any;
  status :boolean;
  permenantdisable:boolean = true;
  result:string;
  ngOnInit() {
    this.status=true
    this.users = new UserModel();
  
    this.apicall.getRole().subscribe(res => {
      this.role_list = res;
    })
    this.username = localStorage.getItem("currentUser");
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; 
       
   });

   this.apicall.getUserById(this.id).subscribe(res => {
    
     this.users=res;
    let themetype:string =  res.selectedThemes[0].itemName;
    this.themenumber = +themetype.substr(themetype.length - 1);

});
  }
  goToDashboard(){
    this.router.navigate(['/homepage'],{ skipLocationChange: true });

  }
  changePassword() {

    this.router.navigate(['/changepassword/', this.id],{ skipLocationChange: true });
  }

  logout() {
    localStorage.removeItem('currentToken');
    this.router.navigate(['/'],{ skipLocationChange: true });
  }
  UserProfile(){
    this.router.navigate(['/userprofile'],{ skipLocationChange: true });
  }

  Edit(){
    this.status = false

  }

  updateProfile(){
    this.apicall.UpdateUserById(this.users).subscribe(
      res => {
        this.result = res.message;
        this.alertService.success(this.result);
        this.goToDashboard();
      },
      (err) => {
       
        this.alertService.danger(JSON.parse(err._body).message)
      }
    );
  }
}
