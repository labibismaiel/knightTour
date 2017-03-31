var light = "#E9E9E9";
var dark = 0;
function square(x, y, n, board) {
  //x and y are the coordinates of the square
  //n is the size of the board

  this.x = x;
  this.y = y;
  this.col = (board[x][y] && board[x][y].col) || ((x + y) % 2 !== 0 ? dark : light);
  this.value = (board[x][y] && board[x][y].value) || 0;
  this.neighbors = (board[x][y] && board[x][y].neighbors) || [];
  this.heuristic = (board[x][y] && board[x][y].heuristic) || Infinity;
  this.width = (width - 50) / n;
  this.height = (height - 50) / n;
  this.pixelStartX = this.x * (width - 50) / n;
  this.pixelStartY = this.y * (height - 50) / n;

  this.set = function() {
    this.col = '#37bb22';
    this.value = 1;
    this.highlightNeighbor(true);
  }

  this.unset = function() {
    this.col = (this.x + this.y) % 2 !== 0 ? dark : light;
    this.value = 0;
    this.highlightNeighbor(false);
  }

  this.display = function() {
    fill(this.col);
    rect(this.pixelStartX, this.pixelStartY, this.width, this.height);
    fill('#777');
    text(this.heuristic, this.pixelStartX + 5, this.pixelStartY + 15);
    text(this.value, this.pixelStartX + this.width - 15, this.pixelStartY + this.height - 5);
  }

  this.clicked = function() {
    if(mouseX < this.pixelStartX || mouseX > this.pixelStartX + this.width) return;
    if(mouseY < this.pixelStartY || mouseY > this.pixelStartY + this.height) return;

    if(!this.value) this.set();
    else this.unset();
  }

  this.calcHeuristic = function() {
    var possibilities = [
      {
        x: x + 1,
        y: y + 2
      },
      {
        x: x + 2,
        y: y + 1
      },
      {
        x: x + 1,
        y: y - 2
      },
      {
        x: x + 2,
        y: y - 1
      },
      {
        x: x - 2,
        y: y + 1
      },
      {
        x: x - 1,
        y: y + 2
      },
      {
        x: x - 2,
        y: y - 1
      },
      {
        x: x - 1,
        y: y - 2
      }
    ];
    this.neighbors = [];
    for(var i = 0; i < n; i++) {
      if(possibilities[i].x > -1 && possibilities[i].x < n && possibilities[i].y > -1 && possibilities[i].y < n) {
        if(!board[possibilities[i].x][possibilities[i].y] || board[possibilities[i].x][possibilities[i].y].value) {
          continue;
        }
        this.neighbors.push(possibilities[i]);
      }
    }

    this.heuristic = this.neighbors.length;
  }

  this.highlightNeighbor = function(val) {
    return;
    var min = Infinity;
    this.neighbors.forEach(function(neighbor) {
      if(board[neighbor.x][neighbor.y].heuristic < min) min = board[neighbor.x][neighbor.y];
      board[neighbor.x][neighbor.y].col = val ? "#950" : (board[neighbor.x][neighbor.y].x + board[neighbor.x][neighbor.y].y) % 2 !== 0 ? dark : light;
    });
    if(val) {
      min.col = "#A00";
    }
  }
}
