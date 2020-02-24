import React from 'react';

const record = (length, ms, ondata) => {
  return navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
    const ctx = new AudioContext();
    const node = ctx.createScriptProcessor(8192 * 2, 1, 1);
    node.addEventListener('audioprocess', (e) => {
      const raw = e.inputBuffer.getChannelData(0);
      ondata(raw.buffer);
    });
    node.connect(ctx.destination);

    const mic = ctx.createMediaStreamSource(stream);
    mic.connect(node);

    return () => {
      stream.getTracks().forEach(function(track) {
        track.stop();
      });
      node.disconnect();
      mic.disconnect();
      ctx.close();
    };
  });
};

export const RecordApp = ({url}) => {
  const [recording, setRecording] = React.useState(false);
  const [socket, setSocket] = React.useState();
  const [stop, setStop] = React.useState();

  const createSocket = () => {
    const socket = new WebSocket(url);
    socket.onopen = () => {
      console.log('OPEN');
      record(5000, 100, buf => {
        socket.send(buf);
      }).then(x => {
        setStop(() => x);
      }).catch(console.error);
    };
    socket.onclose = () => console.log('CLOSE');
    return socket;
  };

  const recordOrStop = () => {
    if (recording) {
      stop();
      socket.close();
    } else {
      setSocket(createSocket());
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
