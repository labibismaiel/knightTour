var buffer = 0;
var board = [];
var n = 8;
var started = false;

function drawBoard () {
  background(255);
  stroke(0);

  for (var i = 0; i < n + 2 * buffer; i ++) {
    for (var j = 0; j < n + 2 * buffer; j ++) {
      board[i] = board[i] || [];
      if(board[i][j] == -1) {
        fill(150, 0, 0);
      } else if(board[i][j] > 0) {
        fill(0, 150, 0);
      } else if((i + j) % 2 !== 0) {
        fill(0);
      } else {
        fill(255);
      }
      board[i][j] = new square(i, j, n, board);
      board[i][j].display();
    }
  }
}

function buildHeuristic() {
  for (var i = 0; i < n + 2 * buffer; i ++) {
    for (var j = 0; j < n + 2 * buffer; j ++) {
      board[i][j].calcHeuristic();
    }
  }
}

/*function init() {
  var arr = [];
  for(var i = 0; i < n + 4; i++) {
    for(var j = 0; j < n + 4; j++) {
      if(i < 2 || i > n + 1 || j < 2 || j > n + 1) {
        arr[i] = arr[i] || [];
        arr[i][j] = -1;
      } else {
        arr[i] = arr[i] || [];
        arr[i][j] = 0;
      }
    }
  }
  return arr;
}*/

function setup() {
  createCanvas(600, 600);

  //board = init();
}

function mousePressed() {
  for (var i = 0; i < n; i ++) {
    for (var j = 0; j < n; j ++) {
      board[i][j].clicked();
    }
  }
}

function draw() {
  background(255);
  //rectMode(CENTER);

  drawBoard();

  if(!started) {
    started = true;
    buildHeuristic();
  }
}
