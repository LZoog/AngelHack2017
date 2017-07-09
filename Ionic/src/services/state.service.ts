import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
// import * as io from 'socket.io-client';

@Injectable()
export class StateService {
  
  private defaultState = {
    prescriptions: [
      {
        name: 'Ritalin',
        description: 'Ritalin (Mathylphenidate) can treat ADHD and narcolepsy.'
      },
      {
        name: 'Valium',
        description: 'Valium (Diazepam) can treat anxiety, muscle spasms, and seizures'
      }
    ]
  };

  // private url = 'https://pillpopper.jamrizzi.com/socket';
  private _data: BehaviorSubject<any> = new BehaviorSubject(this.defaultState);
  public state: Observable<any> = this._data.asObservable();
  // private socket;
  constructor() {
    this._data.next(this.defaultState);
    // this.socket = io(this.url);
    // this.socket.on('data_recieved', data => {
    //   this._data.next(data);
    // });
  }
}