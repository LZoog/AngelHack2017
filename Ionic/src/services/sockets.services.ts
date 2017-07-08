import {Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SocketsService {
  private url = 'https://pillpopper.jamrizzi.com/socket';
  private _data = new Subject();
  public data = this._data.asObservable();
  private socket;
  constructor () {
    this.socket = io(this.url);
    this.socket.on('data_recieved', data => {
      this._data.next(data);
    });
  }
}