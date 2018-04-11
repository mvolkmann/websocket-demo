import React from 'react';
import {routeSetup} from 'react-hash-route';
import {reduxSetup} from 'redux-easy';

import App from './App';
import './index.css';

const initialState = {
  message: 'initial message'
};

const render = reduxSetup({component: <App />, initialState});
routeSetup(render);
