function Brick() {

  this.x = 0;
  this.y = 0;
  this.row = 0;
  this.col = 0;
  this.id = 0;
  this.isActive = false;
  this.indexColor = 0;
  this.color = "#111111";
  this.removed = false;

  this.draw = function(change_color = false) {
    if (this.isActive) {

      canvas.context.strokeStyle = this.color;
      canvas.context.strokeRect(this.x, this.y, canvas.width, settings.gridSize / 8);
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

    this.deactivate = function () {
      this.color = "#888888";
    }
}
