var factory = {

  brickArray: [],
  enemiesArray: [],

  createBricks: function(numBricks = 11) {
    for (var i = 0; i < numBricks; i++) {
      var brick = new Brick();
      this.brickArray.push(brick);
    }
  },

  createEnemies: function (numberOfEnemies = 4) {
    for (var i = 0; i < numberOfEnemies; i++) {
      var enemy = new Enemy();
      this.enemiesArray.push(enemy);
    }
  }
}
