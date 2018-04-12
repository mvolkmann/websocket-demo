import {Component} from '@angular/core';

import {getWebSocket, wsDispatch} from '../ws-dispatch';

const URL_PREFIX = 'http://localhost:3000/#';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  innerHash = 'foo';
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

  swapInner() {
    this.innerHash = this.innerHash === 'foo' ? 'bar' : 'foo';
  }
}
