import React from 'react';

const url = 'ws://127.0.0.1:8000/ws/record/';

const record = (length, ms, ondata, onstop) => {
  return navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
    var options = {
      // mimeType: 'audio/webm',
      mimeType: 'audio/wav',
    };
    const mediaRecorder = new MediaRecorder(stream, options);
    mediaRecorder.ondataavailable = ondata;
    mediaRecorder.onstop = onstop;
    console.log('starting');
    mediaRecorder.start(ms);
    return mediaRecorder;
  }, (e) => console.log(e));
};

export const App = (props) => {
  const [recording, setRecording] = React.useState(false);
  const [mr, setMr] = React.useState();

  const createSocket = () => {
    const socket = new WebSocket(url);
    socket.onopen = () => {
      console.log('OPEN');
      record(5000, 100, (event) => {
        console.log(event.data);
        socket.send(event.data);
      }, () => {
        console.log('STOP MR');
        socket.close();
      }).then(setMr);
    };
    socket.onclose = () => console.log('CLOSE');
    // x.onmessage = handleMessage;
    return socket;
  };

  const recordOrStop = () => {
    if (recording) {
      mr.stop();
    } else {
      createSocket();
    }
    setRecording(!recording);
  };

  return <div className={app}>
    <p>
      <button onClick={recordOrStop}>
        {recording ? 'Stop' : 'Record'}
      </button>
    </p>
  </div>;
};
