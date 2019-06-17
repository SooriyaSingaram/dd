import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from 'ngx-alerts';

import { Organization } from '../../Organization';
import { ApicallService } from '../../services/apicall.service';
import { ChartService } from '../../services/chart.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.css'],

})
export class AddOrganizationComponent implements OnInit {
  @Input() organization: Organization;
  constructor(private apicall: ApicallService, private router: Router, private route: ActivatedRoute, private service: ChartService, private alertService : AlertService) { }
  // variables declaration
  status: boolean;
  id: String;
  private sub: any;
  result: string;
  PartnerName: any[] = [];
  dropdownSettings = {};
  TemplatesSettings = {};
  selectedtheme:any;
  TemplatesList:any[]=[];
  countryList:any;
  Themes = [{id:1 , "itemName":"Grey-Theme1"},{id:2 , "itemName":"Purple-Theme2"},{id:3, "itemName":"Green-Theme3"},{id:4 , "itemName":"Violet-Theme4"},{id:5 , "itemName":"Blue-Theme5"},{id:6 , "itemName":"Red-Theme6"},{id:7 , "itemName":"White-Theme7"}] 
  //end  variables declaration
 // On Page Load
 ngOnInit() {

  this.dropdownSettings = { 
    singleSelection: true, 
    text:"Select Theme",
    selectAllText:'Select All',
    unSelectAllText:'UnSelect All',
    enableSearchFilter: true,
    classes:"myclass custom-class"
  }
  this.TemplatesSettings = { 
    singleSelection: false, 
    text:"Select Templates",
    selectAllText:'Select All',
    unSelectAllText:'UnSelect All',
    enableSearchFilter: true,
    classes:"myclass custom-class",
    badgeShowLimit:3
  }

  //Get List of Partner Names
  this.service.getUserFilter("PartnerName").subscribe(res => { 
    for (let i=0;i<res.length;i++) {
    this.PartnerName.push(res[i]._id)
    }
  });
//
//get id in url
  this.sub = this.route.params.subscribe(params => {
    this.id = params['id'];
  });



  //load templates

  this.getTemplateList()
this.getCountryList()

if (this.id != "0") {
  this.organization = new Organization();
  this.apicall.getOrganizationById(this.id).subscribe(res => {
    this.organization = res;
    this.selectedtheme = this.organization.theme
    this.TemplatesList.map((item)=>{
     this.organization.templates.map((usertemp)=>{
       
       if(item.id == usertemp.id){
        if(item.itemName != usertemp.itemName){
          usertemp.itemName = item.itemName;
        }
       }
     })
    })
    
  });

  this.status = true;
}
else {
  this.organization = new Organization();
  this.status = false;
}

}
  //method

  //get Tempaltes

  getTemplateList(){
  
   this.apicall.getTemplates().subscribe(res => {    
      for(let i in res){
        this.TemplatesList.push({"id":res[i]._id,"itemName":res[i].templateName })
      } });

  }
  showloader :boolean=false;
  //saveOrganization
  addOrganization() {  
    this.showloader = true; 
    this.apicall.postOrganization(this.organization).subscribe(
      res => {
        this.result = res.message;
        this.showloader = false;
        //alert(this.result);
        this.alertService.success(this.result)
        this.router.navigate(['/organizationlist'],{ skipLocationChange: true });
      },
      (err) => {
        console.log(err._body)
        this.showloader = false;
        
      //  alert(err._body);
      this.alertService.danger(JSON.parse(err._body))
      
      
    //   }

    // );
  })
}
  getImage(event){    
    let image = event.target.files[0]; 
    this.apicall.uploadLogo(image).subscribe(res => {      
    this.organization.logo =  res.logo
   
  })
  }

  

  //Reset Form fields
  resetForm() {
    this.organization = new Organization();
  }
  //Go to Organization List
  goToOrg() {
    this.router.navigate(['/organizationlist'],{ skipLocationChange: true });
  }
  //Edit Particular Organization Data
  editOrganization() {

    this.apicall.UpdateOrganizationById(this.organization).subscribe(
      res => {

        this.result = res.message
        // alert(this.result);
        this.alertService.success(this.result);
        this.router.navigate(['/organizationlist'],{ skipLocationChange: true });
      },
      (err) => {

     console.log(err._body)
        this.showloader = false;
        
      //  alert(err._body);
      this.alertService.danger(JSON.parse(err._body))
      }
    );
  }


  getCountryList(){
    this.apicall.getCountry().subscribe(res => {    
     this.countryList = res;
    });
  }
 
}
