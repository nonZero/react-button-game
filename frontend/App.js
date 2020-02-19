import React from 'react';

const url = 'ws://127.0.0.1:8000/ws/game1/';

export const App = (props) => {
  const handleMessage = (e) => {
    const data = JSON.parse(e.data);
    console.log(data);
    setTurn(data.mode);
  };
  const createSocket = () => {
    const x = new WebSocket(url);
    x.onopen = () => console.log('OPEN');
    x.onclose = () => console.log('CLOSE');
    x.onmessage = handleMessage;
    return x;
  };
  const [turn, setTurn] = React.useState(true);
  const [socket, setSocket] = React.useState(createSocket);

  const clickTurn = () => {
    socket.send(JSON.stringify({action: 'click'}));
    setTurn(false);
  };

  return <div className={app}>
    <p>
      {turn ? 'Your Turn' : 'NOT your turn...'}
    </p>
    <p>
      <button onClick={clickTurn} disabled={!turn}>
        Click me
      </button>
    </p>
  </div>;
};
