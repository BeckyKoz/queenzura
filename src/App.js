import './App.css';
import { useState } from 'react';

function Square({value, region, onSquareClick}) {
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

  function ResetButton() {
    return (
      <button className={'reset'} onClick={() => setSquares(Array(36).fill(Values.EMPTY))}>
        Reset
      </button>
    )
  }
  // const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(36).fill(Values.EMPTY));
  const winner = calculateWinner(squares);
  let status = "";
  if (winner) {
    status = "You win!";
  };

  function handleClick(i) {
    if (calculateWinner(squares)) {
      return;
    }
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
    setSquares(nextSquares); // next state of squares array
  }

  function calculateWinner(squares) {
    const solution = 
      ["Q", " ", " ", " ", " ", " ",
      " ", " ", " ", "Q", " ", " ",
      " ", "Q", " ", " ", " ", " ",
      " ", " ", " ", " ", " ", "Q",
      " ", " ", "Q", " ", " ", " ",
      " ", " ", " ", " ", "Q", " "];
    for (let i = 0; i < solution.length; i++) {
      // const [a, b, c, d, e, f] = lines[i];
      if (solution[i] != squares[i]) {
        return false;
      }
    }
    return true;
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
      <ResetButton />
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
