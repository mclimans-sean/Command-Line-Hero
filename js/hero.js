var Hero = {

  x: 0,
  y: 0,
  width: 0,
  height: 0,
  bgColor: "white",
  originY: 0,

  create: function(_x, _y) {
    var obj = Object.create(this);
    this.x = _x;
    this.y = _y;
    return obj;
  },

  draw: function() {
    canvas.context.fillStyle = settings.HERO_COLOR;
    canvas.context.strokeRect(this.x, this.y, settings.gridSize, settings.gridSize);
    canvas.context.stroke();
  },

  update: function(_x, _y) {
    this.x = _x;
    this.y = _y;
  }

};
