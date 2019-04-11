var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');
var W = 900, H = 600;
var BLOCK_W = W / COLS, BLOCK_H = H / ROWS;

// draw a single square at (x, y)
function drawBlock(col, row, padding = false) {
    if (padding) {
        ctx.strokeRect(BLOCK_W * col, BLOCK_H * row, BLOCK_W - 1, BLOCK_H - 1);
        ctx.fillRect(BLOCK_W * col, BLOCK_H * row, BLOCK_W - 1, BLOCK_H - 1);
    } else {

        ctx.fillRect(BLOCK_W * col, BLOCK_H * row, BLOCK_W, BLOCK_H);
    }
}

// draws the board and the moving shape
function render() {
    ctx.clearRect(0, 0, W, H);
    renderBoard();
    renderPlayer();
}

function renderBoard() {
    ctx.clearRect(0, 0, W, H);

    for (let col = 0; col < COLS; ++col) {
        for (let row = 0; row < ROWS; ++row) {
            if (board[col][row]) {
                ctx.strokeStyle = 'black';
                ctx.fillStyle = 'cyan';
                drawBlock(col, row, true);
            } else {
                ctx.fillStyle = 'blue';
                drawBlock(col, row);
            }
        }
    }
}

function renderPlayer() {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'black';
    drawBlock(currentCol, currentRow, true);
}

const lost = [
    [1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0], [1, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 1], [0, 1, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 0, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0]
];

function renderLost() {
    const colOffset = Math.floor(COLS / 2) - 11;
    const rowOffset = 8;
    ctx.fillStyle = 'pink';
    for (let col = 0; col < lost.length; col++) {
        for (let row = 0; row < lost[0].length; row++) {
            if (lost[col][row]) {
                drawBlock(colOffset + col, rowOffset + row);
            }
        }
    }
}

