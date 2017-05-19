const EnemyManager = {

  numActiveEnemies: 5,

  setup: function() {

    for (var i = 0; i < this.numActiveEnemies; i++) {
      let enemy = factory.enemiesArray[i];
      enemy.add();
      var rndm = Math.floor((Math.random() * 500) + settings.GRID_SIZE);
      rndm = rndm - (rndm % settings.GRID_SIZE)
      enemy.x = rndm;
      enemy.y = 0;
    }
  },

  removeEnemies : function () {
    for (var i = 0; i < factory.enemiesArray.length; i++) {
      factory.enemiesArray[i].isActive = false;
    }
  },

  update: function() {
    for (var i = 0; i < this.numActiveEnemies; i++) {
      var enemy = factory.enemiesArray[i];
      enemy.update();
    }
  }
}
