import { Component } from '@angular/core';

/**
 * Generated class for the PrescriptionCardComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'prescription-card',
  templateUrl: 'prescription-card.html'
})
export class PrescriptionCardComponent {

  text: string;

  constructor() {
    console.log('Hello PrescriptionCardComponent Component');
    this.text = 'Hello World';
  }

}
