var canvas = {

  playGround: undefined,
  context: undefined,
  width: 0,
  height: 0,
  padding: 1,

  init: function() {

    this.playGround = document.getElementById("canvas");
    this.context = this.playGround.getContext("2d");
    this.playGround.setAttribute("width", settings.CANVAS_WIDTH);
    this.playGround.setAttribute("height", settings.CANVAS_HEIGHT);
    this.playGround.style.backgroundColor = settings.CANVAS_COLOR;
    this.width = this.playGround.width;
    // this.width = 500;
    this.height = this.playGround.height;


    // settings.gridSize = (this.width - (this.width * 0.05 ) ) / stages[0][1].length;


    settings.gridSize = (this.width * 1)  / stages[0][1].length

    let addedToWidth  = this.padding * stages[0][1].length;
    let addedToHeight = this.padding * stages[0].length;
    let newWidth  = this.width  + addedToWidth;
    let newHeight = this.height + addedToHeight;

    //this.padding += newWidth;
    this.changeSize(newWidth, newHeight);

  },

  changeSize: function(_width, _height) {

    this.playGround.setAttribute("width", _width);
    this.playGround.setAttribute("height", _height);
    this.width = this.playGround.width;
    this.height = this.playGround.height;

  },

  getDrawArea: function() {
    return playGround;
  },

  getContext: function() {
    return context;
  }

};
