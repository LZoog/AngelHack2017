// import { Observable } from 'rxjs/Observable';
import { ConnectService } from './../../services';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import 'rxjs/Rx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  prescriptions: Array<any> = [];
  constructor(
    public navCtrl: NavController,
    private connectService: ConnectService,
) {
  this.connectService.getPrescriptions()
   .subscribe(
     prescriptions => {
       console.log('?', prescriptions);
       this.prescriptions = prescriptions;
     },
     error => console.log(error)
   );
  }
}
