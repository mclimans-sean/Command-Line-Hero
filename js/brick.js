function Brick() {

  this.x = 0;
  this.y = 0;
  this.row = 0;
  this.col = 0;
  this.id = 0;
  this.isActive = false;
  this.indexColor = 0;
  this.color = "#111111";

  this.draw = function(change_color = false) {
    if (this.isActive) {
      //var gridSize = canvas.width / global.map[0].length ;
      // if (change_color) {
      //   //this.color = settings.BRICK_COLOR_ARRAY[this.indexColor];
      //   //this.indexColor += 1;
      //   this.color = utility.getRandomColor();
      //   if (this.indexColor > settings.BRICK_COLOR_ARRAY.length - 1) {
      //     this.indexColor = 0;
      //   }
      // } else {
      //   //this.color = settings.BRICK_COLOR;
      //   this.color = settings.BRICK_COLOR;
      // }
      canvas.context.strokeStyle = this.color;
      canvas.context.strokeRect(this.x, this.y, settings.gridSize, settings.gridSize);
      canvas.context.stroke();
    }

  };

  this.add = function(_x, _y, _row, _col, _id) {
      this.x = _x;
      this.y = _y;
      this.row = _row;
      this.col = _col;
      this.isActive = true;
    },

    this.reset = function(_x, _y, _row, _col, _id) {
      this.x = _x;
      this.y = _y;
      this.row = _row;
      this.col = _col;
      this.id = _id;

    };

    this.deactivate = function () {
      this.color = "#888888";
    }
}
