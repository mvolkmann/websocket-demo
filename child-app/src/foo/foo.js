import React, {Component} from 'react';
import {watch} from 'redux-easy';

import {getWebSocket, wsDispatch} from '../ws-dispatch';
import logo from './logo.svg';
import './foo.css';

class Foo extends Component {
  constructor() {
    super();

    // Must do this before calling wsDispatch with this port.
    getWebSocket(1235);
  }

  sendMessage = () => {
    const msg = 'Hello from React! ' + Date.now();
    wsDispatch(1235, 'message', msg);
  };

  render() {
    return (
      <div className="foo">
        <header className="header">
          <img src={logo} className="logo" alt="logo" />
          <h1 className="title">Welcome to React</h1>
        </header>
        <div>{this.props.message}</div>
        <button onClick={this.sendMessage}>Send Message</button>
      </div>
    );
  }
}

export default watch(Foo, {message: ''});
