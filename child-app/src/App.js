import React from 'react';
import {getHash} from 'react-hash-route';
import Bar from './bar/bar';
import Foo from './foo/foo';

const componentMap = {
  bar: <Bar />,
  foo: <Foo />
};

const App = () => componentMap[getHash() || 'foo'];

export default App;
