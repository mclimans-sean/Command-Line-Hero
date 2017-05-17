var Hero = {

  x: 0,
  y: 0,
  id: 0,
  row: 0,
  col: 0,
  width: 0,
  height: 0,
  bgColor: "white",
  originY: 0,

  create: function(_x, _y, _row, _col) {
    var obj = Object.create(this);
    this.x = _x;
    this.y = _y;
    this.row = _row;
    this.col = _col;

    return obj;
  },

  reset: function(_x, _y, _row, _col) {
    this.x = _x;
    this.y = _y;
    this.row = _row;
    this.col = _col;
  },

  draw: function() {
    canvas.context.fillStyle = settings.HERO_COLOR;
    canvas.context.strokeRect(this.x, this.y, settings.gridSize, settings.gridSize);

    // canvas.context.fillStyle = 'rgba(0,0,0,0.8)';
    // canvas.context.fillRect(this.x - 2, this.y + 5, settings.gridSize / 4, settings.gridSize / 4);
//
//     canvas.context.save();
// canvas.context.rotate(0.1);
// // draw your object
// canvas.context.restore();


    // canvas.context.rotate(20*Math.PI/180);
    //canvas.context.fillRect(this.x + 27, this.y + 5, settings.gridSize / 4, settings.gridSize / 4);
    canvas.context.stroke();
  },

  update: function(_x, _y) {
    this.x = _x;
    this.y = _y;
  },

  drawImageRot : function(img,x,y,width,height,deg) {

    //Convert degrees to radian
    var rad = deg * Math.PI / 180;

    //Set the origin to the center of the image
    ctx.translate(x + width / 2, y + height / 2);

    //Rotate the canvas around the origin
    ctx.rotate(rad);

    //draw the image
    ctx.drawImage(img,width / 2 * (-1),height / 2 * (-1),width,height);

    //reset the canvas
    ctx.rotate(rad * ( -1 ) );
    ctx.translate((x + width / 2) * (-1), (y + height / 2) * (-1));
}

};
