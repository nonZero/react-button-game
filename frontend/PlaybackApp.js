import React from 'react';

const play = url => {
  const socket = new WebSocket(url);
  socket.binaryType = 'arraybuffer';

  const context = new AudioContext();
  const sampleRate = 44000;

  let startAt = 0;
  let i = 0;
  socket.onmessage = function(event) {
    const j = i++;
    var floats = new Float32Array(event.data);
    console.log(j, floats.length);
    const source = context.createBufferSource();
    source.connect(context.destination);
    const buffer = context.createBuffer(1, floats.length, sampleRate);
    buffer.getChannelData(0).set(floats);
    source.buffer = buffer;
    startAt = Math.max(context.currentTime, startAt);
    source.start(startAt);
    startAt += buffer.duration;
  };

  socket.onopen = () => {
    console.log('OPEN');
  };

  socket.onclose = () => console.log('CLOSE');

  return socket;
};

export const PlaybackApp = ({url}) => {

  return <div>
    <p>
      <button onClick={() => play(url)}>
        Play
      </button>
    </p>
  </div>;
};
