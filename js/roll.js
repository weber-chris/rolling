const COLS = 45, ROWS = 30;
const MINAREAWIDTH = 3;
const MAXAREAWIDTH = 5;
const MINFLOORHEIGHT = 3;
const MAXFLOORHEIGHT = 7;
const STARTCOL = 3;
const STARTPLATEAU = 10;
const STARTSPEED = 400;
const SPEEDINCREASE = 0.7;

let score;

let board = [];
let lose;
let gameSpeed;
let speedChanged = false;
let gameInterval;
let speedInt;
let intervalRender;

let plateauLeft;
let floorHeight;

let currentCol, currentRow;

// clears the board
function init() {
    clearBoard();
    setInitLandscape();
    score = 0;
}

function clearBoard() {
    for (let col = 0; col < COLS; ++col) {
        board[col] = [];
        for (let row = 0; row < ROWS; ++row) {
            board[col][row] = 0;
        }
    }
}

function setInitLandscape() {

    for (let col = 0; col <= STARTPLATEAU; col++) {
        for (let row = ROWS - MINFLOORHEIGHT; row < ROWS; ++row) {
            board[col][row] = 1;
        }
    }

    let col = STARTPLATEAU;
    while (col < COLS) {
        const plateauWidth = getRandomInt(MINAREAWIDTH, MAXAREAWIDTH);
        plateauLeft = plateauWidth;
        floorHeight = getRandomInt(MINFLOORHEIGHT, MAXFLOORHEIGHT);
        for (let plateau = 0; plateau < plateauWidth && ++col < COLS; plateau++) {
            // col++;
            for (let row = ROWS - floorHeight; row < ROWS; ++row) {
                board[col][row] = 1;
            }
            plateauLeft--;
        }
    }
    currentCol = STARTCOL;
    currentRow = board[STARTCOL].findIndex((element) => {
        return (element === 1)
    }) - 2;
}

function shiftBoardToLeft() {
    board.shift();
    let col = Array(COLS).fill(0);

    if (plateauLeft === 0) {
        plateauLeft = getRandomInt(MINAREAWIDTH, MAXAREAWIDTH);
        floorHeight = getRandomInt(MINFLOORHEIGHT, MAXFLOORHEIGHT);
    }

    for (let row = ROWS - floorHeight; row < ROWS; ++row) {
        col[row] = 1;
    }
    board.push(col);
    plateauLeft--;
}

function moveFigure() {
    if (board[currentCol + 1][currentRow] === 1) {
        //collision
        lose = true;
    } else {
        if (board[currentCol + 1][currentRow + 1] === 0) {
            //gravity
            currentRow += 1;
        }
    }
}

function tick() {
    function lost() {
        clearAllIntervals();
        renderLost();
        return false;
    }

    moveFigure();
    if (lose) {
        return lost();
    }
    shiftBoardToLeft();
    if (lose) {
        lost();
    }
    score++;
    document.getElementById("scoreLabel").innerText = score;

}


function keyPress(key) {
    if (lose) {
        return;
    }
    switch (key) {
        case 'change':
            break;
        case 'jump':
            if (board[currentCol][currentRow + 1] === 1) {
                currentRow -= 5;
            }
            break;
    }
}

function playButtonClicked() {
    newGame();
}

function newGame() {
    clearAllIntervals();
    intervalRender = setInterval(render, 30);
    init();
    lose = false;
    gameSpeed = STARTSPEED;
    gameInterval = setInterval(increasingInterval, gameSpeed);
    speedInt = setInterval(speedUpInterval, 10000);
}


function increasingInterval() {
    if (speedChanged) {
        speedChanged = false;
        clearInterval(gameInterval);
        gameInterval = setInterval(increasingInterval, gameSpeed);
    }
    tick();
}

function speedUpInterval() {
    gameSpeed *= SPEEDINCREASE;
    speedChanged = true;
}

function clearAllIntervals() {
    clearInterval(speedInt);
    clearInterval(gameInterval);
    clearInterval(intervalRender);
}

function getRandomInt(fromInt, toInt) {
    return Math.floor(Math.random() * (toInt - fromInt + 1)) + fromInt;
}

