import React from 'react';

const url = 'ws://127.0.0.1:8000/ws/play/';

var context = new AudioContext();
var sampleRate = 44000;
var startAt = 0;

export const App = (props) => {
  const [mr, setMr] = React.useState();

  const play = () => {
    const socket = new WebSocket(url);
    socket.binaryType = 'arraybuffer';
    let i = 0;
    socket.onmessage = function(event) {
      const j = i++;
      console.log(event.data, j);
      context.decodeAudioData(event.data).then(buf => {
        console.log(buf, j);
        const source = context.createBufferSource();
        source.buffer = buf;
        source.connect(context.destination);
        source.start(0);
      });
      // var floats = new Float32Array(event.data);
      // console.log(floats.length);
      // if (!floats.length) {
      //   return
      // }
      // var source = context.createBufferSource();
      // var buffer = context.createBuffer(1, floats.length, sampleRate);
      // buffer.getChannelData(0).set(floats);
      // source.buffer = buffer;
      // source.connect(context.destination);
      // startAt = Math.max(context.currentTime, startAt);
      // source.start(startAt);
      // startAt += buffer.duration;
    };

    socket.onopen = () => {
      console.log('OPEN');
    };

    socket.onclose = () => console.log('CLOSE');
    return socket;
  };

  return <div>
    <p>
      <button onClick={play}>
        Play
      </button>
    </p>
  </div>;
};
