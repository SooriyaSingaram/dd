import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ApicallService} from '../../services/apicall.service';


@Component({
  selector: 'app-super-admin-header',
  templateUrl: './super-admin-header.component.html',
  styleUrls: ['./super-admin-header.component.css']
})
export class SuperAdminHeaderComponent implements OnInit {

  constructor(private router: Router,private apicall: ApicallService) { }

  role:string;
  ngOnInit() {

  }

  logout(){
    let id = localStorage.getItem("userId")
    this.apicall.setLogout(id);
    localStorage.removeItem('currentToken');
    localStorage.clear();
      this.router.navigate(['/']);
  }

}
