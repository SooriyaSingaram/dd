import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from 'ngx-alerts';

import { Organization } from '../../Organization';
import { ApicallService } from '../../services/apicall.service';
import { ChartService } from '../../services/chart.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editorganisation',
  templateUrl: './editorganisation.component.html',
  styleUrls: ['./editorganisation.component.css']
})
export class EditorganisationComponent implements OnInit {
  @Input() organization: Organization;
  constructor(private apicall: ApicallService, private router: Router, private route: ActivatedRoute, private service: ChartService,private alertService : AlertService) { }
  status: boolean = false;
  id: String;
  private sub: any;
  result: string;
  PartnerName: any;
  dropdownSettings = {}
  Themes = [{ id: 1, "itemName": "Theme1" }, { id: 2, "itemName": "Theme2" }, { id: 3, "itemName": "Theme3" }, { id: 4, "itemName": "Theme4" }, { id: 5, "itemName": "Theme5" }]

  resetForm() {
    this.organization = new Organization();
  }
  goToOrg() {
    this.router.navigate(['/it-admin-layout'],{ skipLocationChange: true });
  }

  editOrganization() {
    this.apicall.UpdateOrganizationById(this.organization).subscribe(
      res => {

        this.result = res.message;
        //alert(this.result);
        this.alertService.success(this.result)
        this.router.navigate(['/it-admin-layout'],{ skipLocationChange: true });
      },
      (err) => {
        this.alertService.danger(JSON.parse(err._body));
        console.log(JSON.parse(err._body));
      });
  }
  ngOnInit() {
    this.service.getUserFilter( "PartnerName").subscribe(res => {
      this.PartnerName = [res[0]._id]

    });
    this.organization = new Organization();
    this.id = localStorage.getItem("userId")
    this.apicall.getUserById(this.id).subscribe(res => {

      let Orgid = res.OrganizationId
      this.apicall.getOrganizationById(Orgid).subscribe(res => {
        this.organization = res
      })

      //Role Access
      this.apicall.getRoleById(res.role).subscribe(response => {
        let org = response.permission.find(x => x.Organization)

        if (org.Organization.find(x => x == "Update")) {

          this.status = true;
        }

      })

      //Role Access end
    })

    this.dropdownSettings = {
      singleSelection: false,
      text: "Select ",
      disabled: true,
      enableSearchFilter: true,
      classes: "myclass custom-class"
    }
  }
  //Theme selection
  onSelect(item: any) {
    this.organization.theme.length = 0;
    this.organization.theme.push(item);


  }
  onDeSelect(item: any) {
    this.organization.theme.splice(item);


  }

  getImage(event) {
    let image = event.target.files[0];
    this.apicall.uploadLogo(image).subscribe(res => {
      this.organization.logo = res.logo

    })
  }
}
