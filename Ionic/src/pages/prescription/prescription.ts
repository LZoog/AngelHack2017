import { ConnectService, StateService } from './../../services';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PrescriptionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-prescription',
  templateUrl: 'prescription.html',
})
export class PrescriptionPage {

  state: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public connectService: ConnectService,
    public stateService: StateService
  ) {
    this.state = this.navParams.data;
    this.stateService.notify.subscribe(() => {
      this.fetchPrescriptionQuestions();
    })
  }

  ionViewDidLoad() {
    this.fetchPrescriptionQuestions();
  }

  fetchPrescriptionQuestions() {
    this.connectService.getQuestionsAndAnswers(this.state.id)
      .subscribe(questions => this.state.questions = questions);
  }

  get questions() {
    return this.state.questions;
  }

}
