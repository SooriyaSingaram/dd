import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from 'ngx-alerts';
import { ChartService } from '../../services/chart.service';

import { globalValues } from './global';
import { ApicallService } from '../../services/apicall.service';

@Component({
  selector: 'app-global-values',
  templateUrl: './global-values.component.html',
  styleUrls: ['./global-values.component.css']
})
export class GlobalValuesComponent implements OnInit {

  @Input() values: globalValues;

  result; list;
  global;
  status: boolean = false;
  PartnerName: any[] = [];
  
  constructor(private service: ApicallService,private alertService : AlertService,private chartservice: ChartService) { }

  ngOnInit() {
    this.values = new globalValues;

    this.service.getGlobalvalues().subscribe(res => {
      this.list = res;
    })

    this.chartservice.getUserFilter("PartnerName").subscribe(res => { 
      for (let i=0;i<res.length;i++) {
      this.PartnerName.push(res[i]._id)
      }
    });
  }

  AddData() {
    this.service.addGlobalvalues(this.values).subscribe(
      res => {
        this.result = res.message;
        this.alertService.success(this.result)
      });
  }

  UpdateData() {
    this.service.updateGlobalvalues(this.values).subscribe(
      res => {
        this.result = res.message;
        this.alertService.success(this.result)
        
        this.status = false;
        this.ngOnInit();
      });
  }

  editData(id) {
    this.status = true;
    this.service.editGlobalvalues(id).subscribe(
      res => {
        this.values = res
      });


  }

}
