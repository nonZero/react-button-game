import React from 'react';

export const App = (props) => {
  const [turn, setTurn] = React.useState(true);

  const clickTurn = () => setTurn(false);

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
