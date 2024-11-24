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
  const boardLength = 8;
  const [squares, setSquares] = useState(Array(boardLength ** 2).fill(Values.EMPTY));
  const [squaresXY, setSquaresXY] = useState(Array(boardLength).fill(Array(boardLength).fill(Values.EMPTY)));

  const winner = calculateWinner(squares);
  let status = "";
  if (winner) {
    status = "You win!";
  };

  function handleClickXY(r, c) {
    const nextSquares = [];
    for (let row of squaresXY) {
      nextSquares.push(row.slice());
    }

    // use switch statement to get current state of square and generate new
    switch(nextSquares[r][c]) {
      case Values.EMPTY: 
        nextSquares[r][c] = Values.X;
        break;
      case Values.X: 
        nextSquares[r][c] = Values.QUEEN;
        // handleAutomaticX(r,c);
        break;
      case Values.QUEEN:
        nextSquares[r][c] = Values.EMPTY;
        break;
      default:
        alert("Oops! default in switch case");
        break;
    };
    setSquaresXY(nextSquares); // next state of squares array
  }

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
        {squaresXY.map((row, r) => (
          <div className="board-row">
            {row.map((col, c) => (
              <Square value={squaresXY[r][c]} row={r} col={c} region={1} onSquareClick={() => handleClickXY(r, c)} /> 

            ))}
          </div>

        ))}
       
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
