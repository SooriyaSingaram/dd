import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { AgmCoreModule } from '@agm/core';

import { GenericBoxComponent } from './generic-box.component';

@NgModule({
  imports: [
    CommonModule,
    Ng2Charts,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDBqrbg98l70sYXNoy7tBlwCNAvORG1_Ww'}),
    
  ],
  declarations: [
    GenericBoxComponent
  ],
  exports: [GenericBoxComponent]
})
export class GenericBoxModule { }