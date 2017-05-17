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

        // factory.gridArray[gridIndex].add( xStart + (settings.gridSize + padding) * j, xStart + (settings.gridSize + padding) * i, i, j);
        // factory.gridArray[gridIndex].draw();
        // gridIndex++;

        if (map[i][j] == 1) {

          factory.brickArray[brickIndex].add(0 + (settings.GRID_SIZE + padding) * j, 0 + (settings.GRID_SIZE + padding) * i, 40, 40);
          // factory.brickArray[brickIndex].add( (settings.GRID_SIZE + 1) * j, (settings.gridSize));
          factory.brickArray[brickIndex].draw();
          brickIndex++;

        }
        //
        // if (map[i][j] == 4) {
        //
        //   factory.coinsArray[coinIndex].add(xStart + (settings.gridSize + padding) * j, xStart + (settings.gridSize + padding) * i, i, j);
        //   factory.coinsArray[coinIndex].draw();
        //   // console.log("adding coing");
        //   coinIndex++;
        // }

        if (map[i][j] == 2) {

          hero = Hero.create(0 + (settings.GRID_SIZE + padding) * j, 0 + (settings.GRID_SIZE + padding) * i, i, j);
          hero.draw();
          hero.originY = hero.y;
        }

      }
    }

  },

  getMapIndex: function(_row, _col) {
    return global.map[_row][_col];
  },

  updateMapIndex: function(_row, _col, val) {
    global.map[_row][_col] = val;
  }

}
