import '@babel/polyfill';
import * as React from 'react';
import { render } from 'react-dom';
import { App } from './components';
import './styles/sanitize.css';

render(<App />, document.getElementById('root'));
