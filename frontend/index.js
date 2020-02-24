import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import {App} from './PlaybackApp';
// import {App} from './RecordApp';

var mountNode = document.getElementById('app');
ReactDOM.render(<App/>, mountNode);
