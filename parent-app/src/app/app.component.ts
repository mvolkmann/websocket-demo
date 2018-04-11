import {Component} from '@angular/core';
import {getWebSocket, wsDispatch} from '../ws-dispatch';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  message = '';

  constructor() {
    getWebSocket(1234, this);
  }

  dispatchSet(path, value) {
    const type = '@@set ' + path;
    const payload = {path, value};
    wsDispatch(1234, type, payload);
  }

  sendMessage() {
    this.dispatchSet('message', 'Hello from Angular! ' + Date.now());
  }
}
