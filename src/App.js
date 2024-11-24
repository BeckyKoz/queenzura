// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Square({value, region, onSquareClick}) {
  // const [squareValue, setSquareValue] = useState(Values.EMPTY);
  return (
    <button className={`square region${region}`} onClick={onSquareClick}>
      {value} 
    </button>
  );
}

function Board() {
  const Values = Object.freeze({
    EMPTY: " ",
    X: "x",
    QUEEN: "Q",
  });

  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(36).fill(Values.EMPTY));
  const winner = calculateWinner(squares);
  let status;
  // if (winner) {
  //   status = "Winner: " + winner;
  // } else {
  //   status = "Next player: " + (xIsNext? "X" : "O");
  // }

  function handleClick(i) {
    // if (squares[i] || calculateWinner(squares)) {
    //   return;
    // }
    const nextSquares = squares.slice();
    // use switch statement to get current state of square and generate new
    switch(nextSquares[i]) {
      case Values.EMPTY: 
        nextSquares[i] = Values.X;
        break;
      case Values.X: 
        nextSquares[i] = Values.QUEEN;
        break;
      case Values.QUEEN:
        nextSquares[i] = Values.EMPTY;
        break;
      default:
        alert("Oops! default in switch case");
        break;
    };

    // if (xIsNext) {
    //   nextSquares[i] = "X";
    // } else {
    //   nextSquares[i] = "O";
    // }
    setSquares(nextSquares); // next state of squares array
    // setXIsNext(!xIsNext);
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10, 11],
      [12, 13, 14, 15, 16, 17],
      [18, 19, 20, 21, 22, 23],
      [24, 25, 26, 27, 28, 29],
      [30, 31, 32, 33, 34, 35],
      [0, 6, 12, 18, 24, 30],
      [1, 7, 13, 19, 25, 31],
      [2, 8, 14, 20, 26, 32],
      [3, 9, 15, 21, 27, 33],
      [4, 10, 16, 22, 28, 34],
      [5, 11, 17, 23, 29, 35],
      [0, 7, 14, 21, 28, 35],
      [5, 10, 15, 20, 25, 30],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d, e, f] = lines[i];
      if (squares[a] 
        && squares[a] === squares[b] 
        && squares[a] === squares[c] 
        && squares[a] === squares[d]
        && squares[a] === squares[e]
        && squares[a] === squares[f]) {
        return squares[a];
      }
    }
    return null;
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} region={1} onSquareClick={() => handleClick(0)} /> 
        <Square value={squares[1]} region={1} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} region={3} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} region={3} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} region={4} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} region={4} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} region={1} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} region={2} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} region={3} onSquareClick={() => handleClick(8)} />
        <Square value={squares[9]} region={4} onSquareClick={() => handleClick(9)} />
        <Square value={squares[10]} region={4} onSquareClick={() => handleClick(10)} />
        <Square value={squares[11]} region={5} onSquareClick={() => handleClick(11)} />
      </div>
      <div className="board-row">
        <Square value={squares[12]} region={1} onSquareClick={() => handleClick(12)} />
        <Square value={squares[13]} region={2} onSquareClick={() => handleClick(13)} />
        <Square value={squares[14]} region={3} onSquareClick={() => handleClick(14)} />
        <Square value={squares[15]} region={3} onSquareClick={() => handleClick(15)} />
        <Square value={squares[16]} region={3} onSquareClick={() => handleClick(16)} />
        <Square value={squares[17]} region={5} onSquareClick={() => handleClick(17)} />
      </div>
      <div className="board-row">
        <Square value={squares[18]} region={3} onSquareClick={() => handleClick(18)} />
        <Square value={squares[19]} region={3} onSquareClick={() => handleClick(19)} />
        <Square value={squares[20]} region={3} onSquareClick={() => handleClick(20)} />
        <Square value={squares[21]} region={3} onSquareClick={() => handleClick(21)} />
        <Square value={squares[22]} region={3} onSquareClick={() => handleClick(22)} />
        <Square value={squares[23]} region={5} onSquareClick={() => handleClick(23)} />
      </div>      
      <div className="board-row">
        <Square value={squares[24]} region={3} onSquareClick={() => handleClick(24)} />
        <Square value={squares[25]} region={3} onSquareClick={() => handleClick(25)} />
        <Square value={squares[26]} region={3} onSquareClick={() => handleClick(26)} />
        <Square value={squares[27]} region={3} onSquareClick={() => handleClick(27)} />
        <Square value={squares[28]} region={3} onSquareClick={() => handleClick(28)} />
        <Square value={squares[29]} region={6} onSquareClick={() => handleClick(29)} />
      </div>
      <div className="board-row">
        <Square value={squares[30]} region={3} onSquareClick={() => handleClick(30)} />
        <Square value={squares[31]} region={3} onSquareClick={() => handleClick(31)} />
        <Square value={squares[32]} region={3} onSquareClick={() => handleClick(32)} />
        <Square value={squares[33]} region={6} onSquareClick={() => handleClick(33)} />
        <Square value={squares[34]} region={6} onSquareClick={() => handleClick(34)} />
        <Square value={squares[35]} region={6} onSquareClick={() => handleClick(35)} />
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
