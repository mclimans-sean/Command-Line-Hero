var levelManager = {

  currentLevelIndex: 0,
  startPos :0,
  positions: [],

  buildStage: function(map) {

    global.map = map;
    var padding = canvas.padding;
    var brickIndex = 0;
    var gridIndex = 0;
    var coinIndex = 0;

    var xStart = (500 - map[0].length * (settings.GRID_SIZE)) / 2;

    // xStart += padding - 5;
    // this.startPos = xStart;
    //console.log("xStart " , xStart);


    for (var i = 0; i < map.length; i++) {

      for (var j = 0; j < map[i].length; j++) {

        if (map[i][j] == 1) {
          factory.brickArray[brickIndex].add(0 + (settings.GRID_SIZE + padding) * j, 50 + (settings.GRID_SIZE + padding) * i, 40, 40);
          factory.brickArray[brickIndex].draw();
          brickIndex++;
        }
        if (map[i][j] == 2) {
          hero = Hero.create(0 + (settings.GRID_SIZE + padding) * j, 50 + (settings.GRID_SIZE + padding) * i, i, j);
          hero.draw();
          hero.originY = hero.y;
        }
      }
    }
  },

}
