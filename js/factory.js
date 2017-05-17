var factory = {

  gridArray: [],
  brickArray: [],
  coinsArray: [],
  enemiesArray: [],

  createGridEntities: function(numberOfGridEntites = 10) {
    for (var i = 0; i < numberOfGridEntites; i++) {
      var gridEntity = new GridEntity();
      this.gridArray.push(gridEntity);
    }
  },

  createBricks: function(numBricks = 11) {
    for (var i = 0; i < numBricks; i++) {
      var brick = new Brick();
      this.brickArray.push(brick);
    }
  },

  createCoins: function(numberOfCoins = 40) {
    for (var i = 0; i < numberOfCoins; i++) {
      var coin = new Coin();
      this.coinsArray.push(coin);
    }
  },

  createEnemies: function (numberOfEnemies = 4) {
    for (var i = 0; i < numberOfEnemies; i++) {
      var enemy = new Enemy();
      this.enemiesArray.push(enemy);
    }
  }
}
