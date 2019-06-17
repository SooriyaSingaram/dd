import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserModel } from '../../User';
import { ModelDataService } from '../../services/model-data.service';
import { Templates } from '../../WidgetsModel';
import { ApicallService } from '../../services/apicall.service';
import { AlertService } from 'ngx-alerts';


@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent implements OnInit {
  @Input() template: Templates
  constructor(private router: Router, private model: ModelDataService, private route: ActivatedRoute, private apicall: ApicallService, private alert: AlertService) { }

  status: boolean;

  templates: Array<Object> = [
    {
      template: '../assets/template1/temp1_theme1.jpg',
      name: 'template1'
    },
    {
      template: '../assets/temp2/temp2_theme1.jpg',
      name: 'template2'
    },
    {
      template: '../assets/temp3/temp3_theme1.jpg',
      name: 'template3'
    },
    {
      template: '../assets/temp4/temp4_theme1.jpg',
      name: 'template4'
    },
    {
      template: '../assets/temp5/temp5_theme1.jpg',
      name: 'template5'
    }
  ]

  message = this.model.getData();
  id: String;
  private sub: any;

  ngOnInit() {
    this.template = new Templates()

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    if (this.id != "0") {
      this.template = new Templates();
      this.apicall.getTemplateById(this.id).subscribe(res => {

        this.template = res;
        console.log(res)

      });

      this.status = true;
    }
    else {
      this.template = new Templates();
      this.status = false;
    }
  }


  OnTempSelect(templateType) {
    this.template.templateType = templateType
    this.model.setTemplateData(this.template)

    // this.status=false;
  }

  tempshowhide: boolean = false;
  confirmTemplate(template) {
    console.log(template)
    this.apicall.checkTemplateName(this.template.templateName).subscribe(res => {
      if (res) {
        template = this.template.templateType;
        if (template == undefined) {
          this.tempshowhide = true;
        }
        if (template == "template2") {
          this.router.navigate(['/template2'], { skipLocationChange: true });
        }
        if (template == "template5") {
          this.router.navigate(['/new-template'], { skipLocationChange: true });
        }
        if (template == "template1") {
          this.router.navigate(['/template'], { skipLocationChange: true });
        }
  
        if (template == "template3") {
          this.router.navigate(['/template4'], { skipLocationChange: true });
        }
  
        if (template == "template4") {
          this.router.navigate(['/template4'], { skipLocationChange: true });
        }
      }
      else {
        this.alert.danger("Template Name Already Exist")
      }
    });

  }

  editTemplate(template) {
    console.log(template)
   
      localStorage.setItem("templateName", this.template.templateName.toString());
      localStorage.setItem("templateDesc", this.template.templateDefinition);
      
      this.router.navigate(['/edit-template/', this.id], { skipLocationChange: true });
  }

  goBack(){
    this.router.navigate(['/template-list'])
  }
}
