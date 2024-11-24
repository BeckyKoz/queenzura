import './App.css';
import { useState } from 'react';

function Square({value, region, row, col, hasManualX, onSquareClick}) {
  return (
    <button data-isManual={hasManualX} className={`square region${region} row${row} col${col}`} onClick={onSquareClick}>
      {value} 
    </button>
  );
}

function Board() {
  const Values = Object.freeze({
    EMPTY: " ",
    AUTOX: "X",
    QUEEN: "Q",
    MANUALX: "x",
  });

  function ResetButton() {
    return (
      <button className={'reset'} onClick={() => setSquaresXY(Array(boardLength).fill(Array(boardLength).fill(Values.EMPTY)))}>
        Reset
      </button>
    )
  }
  const boardLength = 6;
  // const [squares, setSquares] = useState(Array(boardLength ** 2).fill(Values.EMPTY));
  const [squaresXY, setSquaresXY] = useState(Array(boardLength).fill(Array(boardLength).fill(Values.EMPTY)));
  const regions = [
    [1, 1, 3, 3, 4, 4],
    [1, 2, 3, 4, 4, 5],
    [1, 2, 3, 3, 3, 5],
    [3, 3, 3, 3, 3, 5],
    [3, 3, 3, 3, 3, 6],
    [3, 3, 3, 6, 6, 6],
  ];
  const solutionIndexPairs = [
    {r: 0, c: 0},
    {r: 1, c: 3},
    {r: 2, c: 1},
    {r: 3, c: 5},
    {r: 4, c: 2},
    {r: 5, c: 4},
  ];

  const winner = calculateWinner(squaresXY);
  let status = "";
  if (winner) {
    status = "You win!";
  };

  function handleClickXY(r, c) {
    if (calculateWinner(squaresXY)) {
      return;
    }

    // helper function to implement automatic x's when adding a queen
    function handleAddAutoX(r, c) { 
      // r, c is row and col of queen being added. Use to calculate all x's to add automatically
      // alert(nextSquares.length);
      // do row
      for (let i = 0; i < boardLength; i++) {
        if (nextSquares[r][i] === Values.EMPTY) {
          nextSquares[r][i] = Values.AUTOX;
        };
        // for (let j = 0; j < boardLength; j++) {
        //   if () {
        //     if () {
        //       nextSquares[j] = Values.X;
        //     } else if ((j >= boardLength*fl) && (j < boardLength*(fl+1))) {
        //       nextSquares[j] = Values.X;
        //     } else if (j === ind + boardLength + 1) {
        //       nextSquares[j] = Values.X;
        //     } else if (j === ind - boardLength - 1) {
        //       nextSquares[j] = Values.X;
        //     } else if (j === ind - boardLength + 1) {
        //       nextSquares[j] = Values.X;
        //     } else if (j === ind + boardLength - 1) {
        //       nextSquares[j] = Values.X;
        //     } else {
        //       nextSquares[j] = nextSquares[j];
        //     }
        //   };
  
        // };
      };
      // do column
      

      // do halo
    };

    const nextSquares = [];
    for (let row of squaresXY) {
      nextSquares.push(row.slice());
    }

    // use switch statement to get current state of square and generate new
    switch(nextSquares[r][c]) {
      case Values.EMPTY: 
        nextSquares[r][c] = Values.MANUALX;
        break;
      case Values.AUTOX: 
      case Values.MANUALX:
        nextSquares[r][c] = Values.QUEEN;
        handleAddAutoX(r,c);
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

  // function handleClick(i) {
  //   if (calculateWinner(squares)) {
  //     return;
  //   }
  //   // helper function to implement automatic x's when adding a queen
  //   function handleAutomaticX(ind) {
  //     const len = nextSquares.length;
  //     const fl = Math.floor(ind / boardLength);
  //     // i is index of queen being added. Use to calculate all x's to add automatically
  //     for (let j = 0; j < nextSquares.length; j++) {
  //       if (nextSquares[j] === Values.EMPTY) {
  //         if ((ind % boardLength) === (j % boardLength)) {
  //           nextSquares[j] = Values.X;
  //         } else if ((j >= boardLength*fl) && (j < boardLength*(fl+1))) {
  //           nextSquares[j] = Values.X;
  //         } else if (j === ind + boardLength + 1) {
  //           nextSquares[j] = Values.X;
  //         } else if (j === ind - boardLength - 1) {
  //           nextSquares[j] = Values.X;
  //         } else if (j === ind - boardLength + 1) {
  //           nextSquares[j] = Values.X;
  //         } else if (j === ind + boardLength - 1) {
  //           nextSquares[j] = Values.X;
  //         } else {
  //           nextSquares[j] = nextSquares[j];
  //         }
  //       };
  //     };
  //   };
  
  //   const nextSquares = squares.slice();
  //   // use switch statement to get current state of square and generate new
  //   switch(nextSquares[i]) {
  //     case Values.EMPTY: 
  //       nextSquares[i] = Values.X;
  //       break;
  //     case Values.X: 
  //       nextSquares[i] = Values.QUEEN;
  //       handleAutomaticX(i);
  //       break;
  //     case Values.QUEEN:
  //       nextSquares[i] = Values.EMPTY;
  //       break;
  //     default:
  //       alert("Oops! default in switch case");
  //       break;
  //   };
  //   setSquares(nextSquares); // next state of squares array
  // }


  function calculateWinner(squaresXY) {
    // first confirm correct number of Queens
    let queenCounter = 0;
    for (let element of squaresXY) {
      for (let e of element) {
        if (e == "Q") {
          queenCounter += 1;
        }
      }
    }
    if (queenCounter != boardLength) {
      return;
    }
    // if correct number of queens, compare their locations with the solution

    for (let solution of solutionIndexPairs) {
      if (squaresXY[solution.r][solution.c] !== "Q") {
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
              <Square value={squaresXY[r][c]} row={r} col={c} region={regions[r][c]} onSquareClick={() => handleClickXY(r, c)} /> 

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
