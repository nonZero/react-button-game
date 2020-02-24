import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import {PlaybackApp} from './PlaybackApp';
import {RecordApp} from './RecordApp';

const RECORD_URL = 'ws://127.0.0.1:8000/ws/record/';
const PLAYBACK_URL = 'ws://127.0.0.1:8000/ws/play/';

var mountNode = document.getElementById('app');
ReactDOM.render(<div>
  <RecordApp url={RECORD_URL}/>
  <PlaybackApp url={PLAYBACK_URL}/>
</div>, mountNode);
