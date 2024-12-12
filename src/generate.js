const Values = Object.freeze({
    EMPTY: " ",
    AUTOX: "X",
    QUEEN: "Q",
    MANUALX: "x",
  });

const generatedBoard = 
    {
      solutionIndexPairs: [
      ],
      regions: [
      ],
    //  madeBy: Makers.AUTO,
    };

let queens = [];
let regionArray = [];

function generateRandomIndex(boardLen) {
    let ind = Math.floor(Math.random() * boardLen);
    return ind;
}

// helper function to return solution index pairs
function returnGeneratedSolutionIndexPairs(genQueens) {
    let indexPairsArray = [];
    for (let i = 0; i < genQueens.length; i++) {
        let indexPair = {};
        let ind = genQueens[i].indexOf(Values.QUEEN);
        indexPair.r = i;
        indexPair.c = ind;
        indexPairsArray.push(indexPair);
    } 
    return indexPairsArray;
}

function placeQueens(boardLen) { // boardlength
    queens = [];
    for (let i = 0; i < boardLen; i++) {
        queens.push([]);
        for (let j = 0; j < boardLen; j++) {
            queens[i].push(0);
        }
    }
    let queenCount = 0;
    for (let i = 0; i < boardLen; i++) {
        if (!queens[i].includes(0)) {
            return false;
        }
        while (queens[i].includes(0)) {
            let ind = generateRandomIndex(boardLen);
            while (queens[i][ind] !== 0){
                ind = generateRandomIndex(boardLen);
            }
            if (queens[i][ind] === 0) { // find empty spot
                queens[i][ind] = Values.QUEEN;
                queenCount += 1;
                addAutoX(i, ind, queens, boardLen);
            }; 
        }
    };
    if (queenCount !== boardLen) {
        return false;        }
    return true;
  }

  // helper function to implement automatic X's when adding a queen
  function addAutoX(r, c, queens, boardLen) { 
    function updateEmptyToAutoX(r, c) {
      if (queens[r][c] === 0) {
        queens[r][c] = Values.AUTOX;
      };
    };

    // helper function to do rows and columns
    function doRowsCols(r, c) {
      for (let i = 0; i < boardLen; i++) {
        // do row
        updateEmptyToAutoX(r, i);
        // do column
        updateEmptyToAutoX(i, c);
      };
    };
    // helper function to do make doing halo more efficient
    function doHalo(row, col) {
      if ((row >= 0) && (row < boardLen) && (col >= 0) && (col < boardLen)) {
        updateEmptyToAutoX(row, col);
      };
    };
    doRowsCols(r, c);
    doHalo(r-1, c-1);
    doHalo(r-1, c+1);
    doHalo(r+1, c-1);
    doHalo(r+1, c+1);
  };

function generateQueenBoard(num) {
    let result = false;
    while (result === false) {
        let answer = placeQueens(num);
        if (answer === true) {
            result = true; 
        }; 
    };
};

function generateEmptyRegionArray(boardLen) {
    for (let i = 0; i < boardLen; i++) {
        regionArray.push([]);
        for (let j = 0; j < boardLen; j++) {
            regionArray[i].push(0);
        }
    }
}

function addQueensToRegionsArray() {
    for (let obj of generatedBoard.solutionIndexPairs) {
        let row = obj.r;
        let col = obj.c;
        regionArray[row][col] = Values.QUEEN;
    }
    return regionArray;
    }

function createWorkingQueens(boardLen) {
    queens = [];
    regionArray = [];
    // create an given size array with zeroes and populate with queens
    generateQueenBoard(boardLen);

    // create an object that contains ordered index pairs of all queen locations
    let arr = returnGeneratedSolutionIndexPairs(queens);
    generatedBoard.solutionIndexPairs = arr;
    
    // create empty regions array of correct board length
    generateEmptyRegionArray(boardLen);
    generatedBoard.regions = regionArray;

    // add queens to regions array
    regionArray = addQueensToRegionsArray();
    generatedBoard.regions = regionArray;
    return [generatedBoard.regions, generatedBoard.solutionIndexPairs];
}
// function drawEachRegion() {
//     let regionsArray = generatedBoard.regions;
//     let solutionIndexPairs = generatedBoard.solutionIndexPairs;

//     const len = regionsArray.length;
//     let queenNum;
//     // for (let i = 1; i < len; i++) {
//     //     let pair = solutionIndexPairs[i];
//     //     let [r, c] = [pair.r, pair.c];
//     //     queenNum = solutionIndexPairs[r][c];
//     //     if (pair.c > solutionIndexPairs[i-1].c) {
//     //         checkBorderSquares(pair.r, pair.c+1, queenNum+1);
//     //     } else {
//     //         checkBorderSquares(pair.r, pair.c-1, queenNum+1);
//     //     }
//     //     addAutoX(pair.r, pair.c, regionsArray, len);
    
//     // }
//     // for (let pair of solutionIndexPairs) {
//     //     let [r, c] = [pair.r, pair.c];
//     // }

//     addAutoX(pair.r, pair.c, regionsArray, len);

//     // check for whether next queen is on the left or right of the current queen
//     let pair2 = solutionIndexPairs[1];
//     if (pair2.c > pair.c) {
//         checkBorderSquares(pair.r, pair.c+1, queenNum+1);
//     } else {
//         checkBorderSquares(pair.r, pair.c-1, queenNum+1);
//     }
//     addAutoX(pair2.r, pair2.c, regionsArray, len);

//     let pair3 = solutionIndexPairs[2];
//     checkBorderSquares(pair3.r, pair3.c, queenNum+2);


//     console.log("current regionsArray =", regionsArray);
//     generatedBoard.regions = regionsArray;

//     return regionsArray;
// }


function drawRegions() {
    let regionsArray = generatedBoard.regions;
    let solutionIndexPairs = generatedBoard.solutionIndexPairs;

    const len = regionsArray.length;
    let pair = solutionIndexPairs[0];

    let r = pair.r;
    let c = pair.c;
    let queenNum = regionsArray[r][c];
    if (r > (len)/2) {
        for (let i = 0; i < 3; i++) {
            regionsArray[r][c] = queenNum;
            r -= 1;
        }
    } else {
        for (let i = 0; i < 3; i++) {
            regionsArray[r][c] = queenNum;
            r += 1;
        }
    };
    addAutoX(pair.r, pair.c, regionsArray, len);

    // check for whether next queen is on the left or right of the current queen
    let pair2 = solutionIndexPairs[1];
    if (pair2.c > pair.c) {
        checkBorderSquares(pair.r, pair.c+1, queenNum+1);
    } else {
        checkBorderSquares(pair.r, pair.c-1, queenNum+1);
    }
    addAutoX(pair2.r, pair2.c, regionsArray, len);

    for (let i = 3; i < len; i++) {
        let pair = solutionIndexPairs[i-1];
        checkBorderSquares(pair.r, pair.c, queenNum + i - 1);
        addAutoX(pair.r, pair.c, regionsArray, len);
    }
    // for (let i = 2; i < len; i++) {
    //     let pair = solutionIndexPairs[i];
    //     let queenNum = regionsArray[pair.r][pair.c];
    //     checkBorderSquares(pair.r, pair.c, queenNum);
    //     addAutoX(pair.r, pair.c, regionsArray, len);
    // }

    console.log("current regionsArray =", regionsArray);

    // check remaining empty squares
    for (let pair of solutionIndexPairs) {
        let nextQueen = regionsArray[pair.r][pair.c];
        checkBorderSquares(pair.r, pair.c, nextQueen); 
    }

    console.log("finished regionsArray =", regionsArray);
    generatedBoard.regions = regionsArray;
    return regionsArray;
}

function setFirstRegion() {
    let regionsArray = generatedBoard.regions;
    let solutionIndexPairs = generatedBoard.solutionIndexPairs;

    const len = regionsArray.length;
    const ind = generateRandomIndex(len);
    const pair = solutionIndexPairs[ind];

    let r = pair.r;
    const c = pair.c;
    let queenNum = regionsArray[r][c];
    if (r > (len)/2) {
        for (let i = 0; i < 3; i++) {
            regionsArray[r][c] = queenNum;
            r -= 1;
        }
    } else {
        for (let i = 0; i < 3; i++) {

            regionsArray[r][c] = queenNum;
            r += 1;
        }
    };
    addAutoX(pair.r, pair.c, regionsArray, len);

    generatedBoard.regions = regionsArray;
    console.log(regionsArray);
    checkBorderSquares(pair.r, pair.c, queenNum+1);
    addAutoX(pair.r, pair.c, regionsArray, len);

    // fillNextRegion(ind);
    return regionsArray;
}

function checkBorderSquares(r, c, regionNum) { // check borders of a queen
    let regionsArray = generatedBoard.regions;
    let solutionIndexPairs = generatedBoard.solutionIndexPairs;
    const len = regionsArray.length;
    
    let regionTop = (r > 0) ? regionsArray[r-1][c] : false;
    let regionLeft = (c > 0) ? regionsArray[r][c-1] : false;
    let regionRight = (c < len - 1) ? regionsArray[r][c+1] : false;
    let regionBottom = (r < len - 1) ? regionArray[r+1][c] : false;
    // console.log("regionTop = ", regionTop);
    // console.log("regionLeft = ", regionLeft);
    // console.log("regionRight = ", regionRight);
    // console.log("regionBottom = ", regionBottom);
    if (regionLeft !== false) {
        if (regionLeft === Values.AUTOX) {
            regionsArray[r][c-1] = regionNum;
            checkBorderSquares(r, c-1, regionNum);
        }
    }
    if (regionBottom !== false) {
        if (regionBottom === Values.AUTOX) {
            regionsArray[r+1][c] = regionNum;
            checkBorderSquares(r+1, c, regionNum);
        }
    }
    if (regionTop !== false) {
        if (regionTop === Values.AUTOX) {
            regionsArray[r-1][c] = regionNum;
            checkBorderSquares(r-1, c, regionNum);
        }
    }
    if (regionRight !== false) {
        if (regionRight === Values.AUTOX) {
            regionsArray[r][c+1] = regionNum;
            checkBorderSquares(r, c+1, regionNum);
        }
    }

    return regionsArray;
}

function fillNextRegion(nextNum) { 
    let regionsArray = generatedBoard.regions;
    let solutionIndexPairs = generatedBoard.solutionIndexPairs;

    const len = regionsArray.length;
    const pair = solutionIndexPairs[nextNum];

    const r = pair.r;
    const c = pair.c;

    const regionNum = regionsArray[r][c];
    console.log("regionNum =", regionNum);


    generatedBoard.regions = regionsArray;
    console.log(regionsArray);
    return regionsArray;
}


function assignQueenStartingRegions() {
    let counter = 1;
    for (let obj of generatedBoard.solutionIndexPairs) {
        let row = obj.r;
        let col = obj.c;
        generatedBoard.regions[row][col] = counter;
        counter++
    }
}

function generateRegionsFromQueens(newLen, newRegions) {
    let startRegions = newRegions;
    console.log("does this have queens?", startRegions);
    assignQueenStartingRegions(startRegions);
    // setFirstRegion();
    // setSecondRegion();
    drawRegions();
    // drawEachRegion();
    console.log(" basdf  ", startRegions);
    return startRegions;
}

export { createWorkingQueens, generateRegionsFromQueens, setFirstRegion };