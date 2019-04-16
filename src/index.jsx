import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';

render((() => <hi>Hi React</hi>)(), document.getElementById('app'));
