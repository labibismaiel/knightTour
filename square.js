var light = "#E9E9E9";
var dark = 0;
function square(x, y, n, board) {
  //x and y are the coordinates of the square
  //n is the size of the board

  this.x = x;
  this.y = y;
  this.col = (board[x][y] && board[x][y].col) || ((x + y) % 2 !== 0 ? dark : light);
  this.value = (board[x][y] && board[x][y].value) || 0;
  this.neighbors = [];
  this.heuristic = (board[x][y] && board[x][y].heuristic) || Infinity;
  this.width = (width - 50) / n;
  this.height = (height - 50) / n;
  this.pixelStartX = this.x * (width - 50) / n;
  this.pixelStartY = this.y * (height - 50) / n;

  this.set = function() {
    this.col = '#080';
    this.value = 1;
  }

  this.unset = function() {
    console.log('unsetting', this.value)
    this.col = (this.x + this.y) % 2 !== 0 ? dark : light;
    this.value = 0;
  }

  this.display = function() {
    fill(this.col);
    rect(this.pixelStartX, this.pixelStartY, this.width, this.height);
    fill('#777');
    text(this.heuristic, this.pixelStartX + 5, this.pixelStartY + 15);
  }

  this.clicked = function() {
    if(mouseX < this.pixelStartX || mouseX > this.pixelStartX + this.width) return;
    if(mouseY < this.pixelStartY || mouseY > this.pixelStartY + this.height) return;
    console.log('called', this.value, this.y)

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

    for(var i = 0; i < n; i++) {
      if(possibilities[i].x > -1 && possibilities[i].x < n && possibilities[i].y > -1 && possibilities[i].y < n) {
        if(!board[possibilities[i].x][possibilities[i].y]) return;
        this.neighbors.push(possibilities[i]);
      }
    }

    this.heuristic = this.neighbors.length;
  }
}
