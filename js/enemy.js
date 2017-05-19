function Enemy() {

  this.x = 0;
  this.y = 0;
  this.width = 0;
  this.height = 0;
  this.row = 0;
  this.col = 0;
  this.id = 0;
  this.isActive = false;
  this.indexColor = 0;
  this.color = settings.ENEMY_COLOR;
  this.xSpeed = 0;
  this.ySpeed = 0;
  this.targetX = 0;
  this.targetY = 0;
  this.count = 0;
  this.timeToRespawn = 0;
  this.countToRespawn = 0;
  this.moveRight = true;
  this.moveDelay = Math.floor(Math.random() * (4 - 1)) + 1;
  this.targetSize = 0;
  this.isHit = false;
  this.ySpeed = 0;
  this.speedLimit = 2;

  this.draw = function(change_color = false) {
    if (this.isActive) {
      this.indexColor = 0;
      canvas.context.save();
      canvas.context.strokeStyle = this.color;
      canvas.context.strokeRect(this.x, this.y, this.width / 1.5, this.height);
      canvas.context.stroke();
    }
  };

  this.add = function(_x, _y, _row, _col, _id) {
      this.x = Math.floor(Math.random() * (560 - 0)) + 0;
      this.y = _y;
      this.row = _row;
      this.col = _col;
      this.isActive = true;
      this.width = settings.gridSize;
      this.height = settings.gridSize;
      this.targetY = 50;
      this.moveDelay = Math.floor(Math.random() * (4 - 1)) + 1;

      this.ySpeed = Math.floor(Math.random() * (this.speedLimit - 0.2)) + 0.2;
      // this.moveDelay = 2;
    };

    this.advance = function () {
      this.speedLimit += 0.4;
      this.ySpeed = Math.floor(Math.random() * (this.speedLimit - 0.2)) + 0.2;
    };

    this.update = function (targetX, targetY) {

    this.count ++;


    if(this.count >= this.moveDelay) {

      this.count = 0;
      this.x += this.xSpeed;
      this.y += this.ySpeed;
    }
  }
}
