import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApicallService } from '../services/apicall.service';
declare var $: any;
@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {

  constructor(private router: Router, private apicall: ApicallService) { }
  CountList: any;
  OrgCount: number;
  OrgAdminList: any[] = [];
  ITAdmin: any[] = [];
  userCount: any;
  ///
 
  ////
  ngOnInit() {


    this.apicall.superAdminHomePage().subscribe(res => {
      for (let r of res) {
        if (r.role == "standard users") {
          this.userCount = r.count
        }
      }
    })
    this.apicall.getTemplates().subscribe(res => this.CountList = res.length)
    this.apicall.getOrganization().subscribe(res =>
      this.OrgCount = res.length
    )
    this.apicall.superAdminUserList().subscribe(res => {
      res.forEach((item, index) => {
        if (index == 0) {
          this.OrgAdminList = item.R001
        }
        else {
          this.ITAdmin = item.R002
        }
      });
    })

    setTimeout(() => {
      $('#example').DataTable({
        "bPaginate": false,
        "bInfo": false
      });
      $('#example1').DataTable({
        "bPaginate": false,
        "bInfo": false
      });
    }, 1000);
  }

  onSelect(selectedItem: any) {
    this.router.navigate(['/adduser/', selectedItem._id], { skipLocationChange: true });
  }

  logout() {
    localStorage.removeItem('currentToken');
    this.router.navigate(['/']);
  }

}
