import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import '../public/css/App.css';

render(<App />, document.getElementById('app'));
