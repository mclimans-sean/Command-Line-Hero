const EnemyManager = {

  multiplier: 0,
  moveDelay: 0,
  numActiveEnemies: 3,
  enemyIndex: 0,

  setup: function() {
    multiplier = (settings.gridSize + canvas.padding);
    //console.log("muli" , multiplier)
    for (var i = 0; i < 3; i++) {
      let enemy = factory.enemiesArray[i];
      enemy.add();
      // enemy.x = levelManager.startPos + i * multiplier * 2;
      // enemy.x =  Math.floor(Math.random() * (560 - 0)) + 0;
      enemy.x = 100 + 200 * (i + 0);
      // enemy.y = levelManager.startPos + - 100 * multiplier;
      enemy.y = 50;
      enemy.row = 0;
      enemy.col = i * 3;

      // console.log("Enemy -- row " , enemy.row, " col " , enemy.col);
    }
  },

  respawn: function() {

  },

  advance: function(enemy) {
    // this.numActiveEnemies += 1;
    // for(var i = 0; i < factory.enemiesArray.length; i ++) {
    //   factory.enemiesArray[i].advance();
    // }

  },

  moveUp: function() {
    for (var i = 0; i < 4; i++) {
      factory.enemiesArray[i].targetY = factory.enemiesArray[i].y - 50;
    }
  },

  update: function() {
    // for (var i = 0; i < factory.enemiesArray.length; i++) {

    for (var i = 0; i < this.numActiveEnemies; i++) {
      this.moveDelay++;

      //  if(this.moveDelay > 1000) {
      var enemy = factory.enemiesArray[i];
      enemy.update();


      if(enemy.y > 500) {
      var rndm = Math.floor((Math.random() * 500) + 40);
      //output.push( rndm = rndm - (rndm % multiplier) );




      rndm = rndm - (rndm % settings.GRID_SIZE)
      // enemy.x =  Math.floor(Math.random() * (560 - 0)) + 0;
      enemy.x = rndm;
      enemy.y = 0;
    }
      //  enemy.y += multiplier;
      // enemy.row ++;

      // levelManager.updateMapIndex(enemy.row, enemy.col, 5);
      // this.moveDelay = 0;
      //  }
    }
  }
}
