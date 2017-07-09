import { Observable } from 'rxjs/Observable';
import { StateService } from './../../services/state.service';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import 'rxjs/Rx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  prescriptions: Observable<any>;
  constructor(
    public navCtrl: NavController,
    private stateService: StateService,
) {
    this.stateService.state.subscribe(({prescriptions}) => this.prescriptions = prescriptions);
  }
}
