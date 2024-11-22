// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Square() {
  const [value, setValue] = useState(null);
  
  function handleClick() {
    setValue('X');
  }
  return (
    <button 
      className="square"
      onClick={handleClick}
    >
      {value} 
    </button>
  );
}

function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
      </div>      <div className="board-row">
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
      </div>

    </>
  ) 
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Queenzura!</h1>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h2>{}</h2>
        <Board />
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
