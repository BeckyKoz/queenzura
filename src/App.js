import './App.css';
import { useState } from 'react';

function Square({value, region, row, col, onSquareClick}) {
  return (
    <button className={`square region${region} row${row} col${col}`} onClick={onSquareClick}>
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
  const boardLength = 6;
  const [squares, setSquares] = useState(Array(boardLength ** 2).fill(Values.EMPTY));
  const winner = calculateWinner(squares);
  let status = "";
  if (winner) {
    status = "You win!";
  };

  function handleClick(i) {
    if (calculateWinner(squares)) {
      return;
    }
    // helper function to implement automatic x's when adding a queen
    function handleAutomaticX(ind) {
      const len = nextSquares.length;
      const fl = Math.floor(ind / boardLength);
      // i is index of queen being added. Use to calculate all x's to add automatically
      for (let j = 0; j < nextSquares.length; j++) {
        if (nextSquares[j] === Values.EMPTY) {
          if ((ind % boardLength) === (j % boardLength)) {
            nextSquares[j] = Values.X;
          } else if ((j >= boardLength*fl) && (j < boardLength*(fl+1))) {
            nextSquares[j] = Values.X;
          } else if (j === ind + boardLength + 1) {
            nextSquares[j] = Values.X;
          } else if (j === ind - boardLength - 1) {
            nextSquares[j] = Values.X;
          } else if (j === ind - boardLength + 1) {
            nextSquares[j] = Values.X;
          } else if (j === ind + boardLength - 1) {
            nextSquares[j] = Values.X;
          } else {
            nextSquares[j] = nextSquares[j];
          }
        };
      };
    };
  
    const nextSquares = squares.slice();
    // use switch statement to get current state of square and generate new
    switch(nextSquares[i]) {
      case Values.EMPTY: 
        nextSquares[i] = Values.X;
        break;
      case Values.X: 
        nextSquares[i] = Values.QUEEN;
        handleAutomaticX(i);

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
    // first confirm correct number of Queens
    let queenCounter = 0;
    for (let element of squares) {
      if (element == "Q") {
        queenCounter += 1;
      }
    }
    if (queenCounter != boardLength) {
      return;
    }
    
    // if correct number of queens, compare their locations with the solution
    const solutionIndices = [0, 9, 13, 23, 26, 34];
    for (let i of solutionIndices) {
      if (squares[i] !== "Q") {
        return false;
      }
    }
    return true;
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} row={0} col={0} region={1} onSquareClick={() => handleClick(0)} /> 
        <Square value={squares[1]} row={0} col={1} region={1} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} row={0} col={2} region={3} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} row={0} col={3} region={3} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} row={0} col={4} region={4} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} row={0} col={5} region={4} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} row={1} col={0} region={1} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} row={1} col={1} region={2} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} row={1} col={2} region={3} onSquareClick={() => handleClick(8)} />
        <Square value={squares[9]} row={1} col={3} region={4} onSquareClick={() => handleClick(9)} />
        <Square value={squares[10]} row={1} col={4} region={4} onSquareClick={() => handleClick(10)} />
        <Square value={squares[11]} row={1} col={5} region={5} onSquareClick={() => handleClick(11)} />
      </div>
      <div className="board-row">
        <Square value={squares[12]} row={2} col={0} region={1} onSquareClick={() => handleClick(12)} />
        <Square value={squares[13]} row={2} col={1} region={2} onSquareClick={() => handleClick(13)} />
        <Square value={squares[14]} row={2} col={2} region={3} onSquareClick={() => handleClick(14)} />
        <Square value={squares[15]} row={2} col={3} region={3} onSquareClick={() => handleClick(15)} />
        <Square value={squares[16]} row={2} col={4} region={3} onSquareClick={() => handleClick(16)} />
        <Square value={squares[17]} row={2} col={5} region={5} onSquareClick={() => handleClick(17)} />
      </div>
      <div className="board-row">
        <Square value={squares[18]} row={3} col={0} region={3} onSquareClick={() => handleClick(18)} />
        <Square value={squares[19]} row={3} col={1} region={3} onSquareClick={() => handleClick(19)} />
        <Square value={squares[20]} row={3} col={2} region={3} onSquareClick={() => handleClick(20)} />
        <Square value={squares[21]} row={3} col={3} region={3} onSquareClick={() => handleClick(21)} />
        <Square value={squares[22]} row={3} col={4} region={3} onSquareClick={() => handleClick(22)} />
        <Square value={squares[23]} row={3} col={5} region={5} onSquareClick={() => handleClick(23)} />
      </div>      
      <div className="board-row">
        <Square value={squares[24]} row={4} col={0} region={3} onSquareClick={() => handleClick(24)} />
        <Square value={squares[25]} row={4} col={1} region={3} onSquareClick={() => handleClick(25)} />
        <Square value={squares[26]} row={4} col={2} region={3} onSquareClick={() => handleClick(26)} />
        <Square value={squares[27]} row={4} col={3} region={3} onSquareClick={() => handleClick(27)} />
        <Square value={squares[28]} row={4} col={4} region={3} onSquareClick={() => handleClick(28)} />
        <Square value={squares[29]} row={4} col={5} region={6} onSquareClick={() => handleClick(29)} />
      </div>
      <div className="board-row">
        <Square value={squares[30]} row={5} col={0} region={3} onSquareClick={() => handleClick(30)} />
        <Square value={squares[31]} row={5} col={1} region={3} onSquareClick={() => handleClick(31)} />
        <Square value={squares[32]} row={5} col={2} region={3} onSquareClick={() => handleClick(32)} />
        <Square value={squares[33]} row={5} col={3} region={6} onSquareClick={() => handleClick(33)} />
        <Square value={squares[34]} row={5} col={4} region={6} onSquareClick={() => handleClick(34)} />
        <Square value={squares[35]} row={5} col={5} region={6} onSquareClick={() => handleClick(35)} />
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
        <h2>{}</h2>
        <Board />

      </header>
    </div>
  );
}

export default App;
