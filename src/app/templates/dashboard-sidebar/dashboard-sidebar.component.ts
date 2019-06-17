import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../services/apicall.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChartService } from '../../services/chart.service';
@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss']
})
export class DashboardSidebarComponent implements OnInit {
  id: String;
  username: string;
  themenumber: number;
  Rolename: string;
  hideusercreation: boolean = true;
  samplearray: any[] = [];
  orglogo: any;
  homeMenu: boolean;
  showloader:boolean=false
  public IdValue;
  selected: any={ id: '1', itemName: 'Home' };
  constructor(private service: ChartService, private apicall: ApicallService, private router: Router) { }
  ngOnInit() {
    this.showloader=true;
    this.IdValue = '1';
    this.Rolename = localStorage.getItem("RoleName")
    if (this.Rolename == "Standard User") {
      this.hideusercreation = false
    }
    this.username = localStorage.getItem("currentUser");
    this.id = localStorage.getItem("userId");
    this.apicall.getUserById(this.id).subscribe(res => {
      let userTemplates = res.selectedTemplates

      this.apicall.getOrganizationById(res.OrganizationId).subscribe(response => {
        this.orglogo = response.logo
        let themetype: string = response.theme[0].itemName;
        // this.themenumber = +themetype.substr(themetype.length - 1);
        this.themenumber = response.theme[0].id
        this.showloader=false;     
        
        let TemplatesList = response.templates
        let temp: any = [];
        for (let i of TemplatesList) {
          temp.push(i.itemName)
        }
        
        let mismatch = userTemplates.filter(item => temp.indexOf(item.itemName) < 0);
        for (let i of mismatch) {
          userTemplates.forEach((item, index) => {
            if (item === i) userTemplates.splice(index, 1);
          });
        }
        userTemplates.unshift({ id: '1', itemName: 'Home' })

      })      
      this.samplearray = userTemplates;
    })

    
  }
  
  ;
  select(item) {
    this.IdValue = item.id;
    this.selected = item;
    this.showloader=true;
    let self = this;
    setTimeout(function(){
     
      self.showloader=false;
      
    },1800)
  };
  isActive(item) {
    return this.selected === item;
  };
  loadTableData(data: string) {
    
      this.router.navigate(['/temp1_theme1/', data]);      
  }

  changeShowStatus() {

    let side_nav = document.getElementById('respnsive_mobile');
    if (side_nav.classList.contains('respnsive_mobile')) {
      side_nav.classList.remove('respnsive_mobile')
    }
    else {
      side_nav.classList.add('respnsive_mobile')

    }

  }


}
