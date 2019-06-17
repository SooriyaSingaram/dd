import { Component, OnInit, Input } from '@angular/core';
import { ApicallService } from '../services/apicall.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private apicall: ApicallService, private router: Router, private route: ActivatedRoute) {}
  
  @Input() user: ResetPassword;
  ngOnInit() {
      this.user = new ResetPassword();
      this.route.params.subscribe(params => {
          this.user.id = params['id'];
      });
  }
  reset(password) {
      let id = this.user.id.toString();
      this.apicall.postResetPassword(id, password).subscribe(res => {
          let result = res.message;
          alert(result)
          this.router.navigate(['/']);
      }, (err) => {
          console.log(err);
      });
  }
}


export class ResetPassword {

  id: String;
  NewPassword: String;
  confirmPassword: String;

}
