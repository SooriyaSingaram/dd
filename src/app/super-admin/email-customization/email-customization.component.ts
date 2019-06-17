import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from 'ngx-alerts';

import { email } from '../global-values/global';
import { ApicallService } from '../../services/apicall.service';

@Component({
  selector: 'app-email-customization',
  templateUrl: './email-customization.component.html',
  styleUrls: ['./email-customization.component.css']
})
export class EmailCustomizationComponent implements OnInit {

  @Input() values: email;

  result; list;
  global;
  custID;
  status: boolean = false;
  emailTemplate: boolean = false;templates;
  TemplatesSettings; TemplatesList: any = [];
  constructor(private service: ApicallService, private alertService: AlertService) { }

  ngOnInit() {
    this.values = new email;

    this.service.getemailvalues().subscribe(res => {
      this.list = res;
      console.log(res)

      this.custID = this.list[this.list.length - 1].customizeId;
      this.templates=res[0].templatesList
      console.log(this.templates)
      // this.custID=this.list[0].customizeId
    });
    this.TemplatesList=[];
    this.service.getTemplates().subscribe(res => {
      for (let i in res) {
        this.TemplatesList.push({ "id": res[i]._id, "itemName": res[i].templateName })
      }
    });

    console.log(this.TemplatesList)

    this.TemplatesSettings = {
      singleSelection: false,
      text: "Select Templates",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class",
      badgeShowLimit: 1
    }

  }


  AddData() {
    this.service.addemailvalues(this.values).subscribe(
      res => {
        this.result = res.message;
        this.alertService.success(this.result)
        this.ngOnInit();
      });
  }

  UpdateData() {
    console.log(this.values)
    this.service.updateemailvalues(this.values).subscribe(
      res => {
        this.result = res.message;
        this.alertService.success(this.result)

        this.status = false;
        this.emailTemplate = false;

        this.ngOnInit();
      });
  }

  editData(id) {
    this.status = true;
    this.emailTemplate = true;

    this.service.editemailvalues(id).subscribe(
      res => {
        this.values = res
      });

  }

  templatesList: any = [];

  changeTemplate(e, template) {
    console.log(template)
    let id = template[template.length - 1].id;
    let templateName=template[template.length - 1].itemName;
    console.log(this.custID)
    this.values.templatesList.push({ "id":id, "itemName": templateName })
    console.log(this.values.templatesList)

    this.service.checkTemplate(id, this.custID).subscribe(res => {
      console.log(res)
      this.service.updateemailvalues(this.values).subscribe(
        res => {
          this.result = res.message;

  
        });
    })

  }

  OnItemDeSelect(e, template){
    if(template.length ==0){
      this.values.templatesList.length = 0;
      this.service.checkTemplate(e.id, this.custID).subscribe(res => {
        console.log(res)
        this.service.updateemailvalues(this.values).subscribe(
          res => {
            this.result = res.message;

    
          });
      })
     
    }
    else{
      let id = e.id;
      console.log(id)
      this.service.checkTemplate(e.id, this.custID).subscribe(res => {
        console.log(res)
        this.values.templatesList = this.values.templatesList.filter(item => item.id != e.id);
        console.log(this.values.templatesList)

        this.service.updateemailvalues(this.values).subscribe(
          res => {
            this.result = res.message;

          });
      })

    }


  }

  assignTemplate() {
    this.service.addemailvalues(this.values).subscribe(
      res => {
        this.result = res.message;
        console.log(res)
      });

    this.emailTemplate = true;
    this.status = true;

  }

}


