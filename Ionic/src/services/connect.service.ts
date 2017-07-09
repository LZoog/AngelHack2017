import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Http, Response } from '@angular/http';

@Injectable()
export class ConnectService {

  url: string = 'https://pillpopper.jamrizzi.com/api';

  constructor(private http: Http) {
  }


  getQuestionsAndAnswers(id) {
    return this.http.get(`${this.url}/prescriptions/${id}/questions?filter={"include": "answers"}`)
      .map(this.formatResponse)
      .catch(this.handleError);
  }

  getPrescriptions() {
    return this.http.get(`${this.url}/prescriptions`)
      .map(this.formatResponse)
      .catch(this.handleError);
  }

  formatResponse(res: Response) {
    const response = res.json();
    console.log(response);
    return response|| {};
  }

  handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}