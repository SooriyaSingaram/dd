import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ApicallService} from '../../services/apicall.service';


@Component({
  selector: 'app-it-header',
  templateUrl: './it-header.component.html',
  styleUrls: ['./it-header.component.css']
})
export class ItHeaderComponent implements OnInit {
id:string;
  constructor(private router: Router,private apicall: ApicallService) { }

  ngOnInit() {
    this.id = localStorage.getItem("userId");
  }

  logout(){
    let id = localStorage.getItem("userId")
    this.apicall.setLogout(id);
    localStorage.removeItem('currentToken');
      this.router.navigate(['/']);
  }
  changePassword() {
    this.router.navigate(['/adminchangepassword'],{ skipLocationChange: true });
  }

}
