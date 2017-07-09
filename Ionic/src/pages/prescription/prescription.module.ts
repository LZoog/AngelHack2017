import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrescriptionPage } from './prescription';
import { Chart } from '../../components/chart/chart.component';

@NgModule({
  declarations: [
    PrescriptionPage,
    Chart
  ],
  imports: [
    IonicPageModule.forChild(PrescriptionPage),
  ],
  exports: [
    PrescriptionPage
  ]
})
export class PrescriptionPageModule {}
