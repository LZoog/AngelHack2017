import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class StateService {

  private url = 'https://pillpopper.jamrizzi.com/';
  private _notify: Subject<any> = new Subject();
  public notify: Observable<any> = this._notify.asObservable();
  private socket;
  constructor() {
    this._notify.next();
    this.socket = io(this.url);
    this.socket.on('notify', () => {
      this._notify.next();
    });
  }
}