var currentString = "";
var consoleMessage = "Go go go!";
var statusMode = "SANE";
var keyCode = undefined;
var timer = undefined;
var heroEnemyCollisionResult = undefined;
var enemyBaseCollisionResult = undefined;
var isFreezing = false;
var insaneMode = false;
var allowMove = true;
var xSpeed = 0;
var ySpeed = 0;
var xVel = 0;
var yVel = 0;
var targetX = 0;
var targetY = 0;
var clearEffectCounter = 0;
var timeToResetMessage = 0;
var heroStepLength = 0;
var lineIndex = 0;
var goingUpIndex = 0;
var slowCounter = 0;
var slowOffset = 0;
var gameState = 1;
var speed = 1;
const FRICTION = 0.9;
var inputs = [];
var isAttack = false;
var originY = 0;
var health = 0;
var particles = [];
var numParticles = 40;
var maxSpeed = 10;
var switchDepth = false;

var addParticles = false;

window.onload = function() {

  // factory.createGridEntities();
  factory.createBricks();
//  factory.createCoins();
  factory.createEnemies();
  canvas.init();
  levelManager.buildStage(stages[0]);



  // // creating the particles
  for (var i = 0; i < numParticles; i += 1) {
    // particles.push(particle.create(200, 200, Math.random() * maxSpeed + 2, Math.random() * Math.PI * 2));
    particles[i] = particle.create(200, 200, Math.random() * maxSpeed + 2, Math.random() * Math.PI * 2);

  }


  calculateHealth();

  var moveLeft = function() {
    sound.playWhip();
    xSpeed = -10;
  }

  var moveRight = function() {
    sound.playWhip();
    xSpeed = 10;
  }

  var moveUp = function() {
    //sound.playWhip();
    //ySpeed = -1;
  }

  var moveDown = function() {
    sound.playWhip();
    ySpeed = 10;
  }

  var pause = function() {
    if (gameState == 0) {
      gameState = 1;
      consoleMessage = "Game is running";
    } else {
      gameState = 0;
      consoleMessage = "Game is paused";
    }
  }

  var clear = function() {
    if (currentString == "clear") {

      var myNode = document.getElementsByClassName("terminal")[0];

      while (myNode.hasChildNodes()) {
        myNode.removeChild(myNode.lastChild);
      }

      lineIndex = 0;
      inputs = [];

      addNewInput();
      // lineIndex ++;
    }
  }

  var slow = function() {
    if (slowOffset == 0) {
      slowOffset = 3;
    } else {
      slowOffset = 0;
    }
  }

  var attack = function() {
    attack = true;
  }

  $("body").click(function() {
    inputs[lineIndex].focus();
  });

  reset();

  command.left = moveLeft;
  command.right = moveRight;
  command.up = moveUp;
  command.down = moveDown;
  command.clear = clear;
  command.pause = pause;
  command.slow = slow;
  command.attack = attack;

  heroStepLength = settings.gridSize + canvas.padding;

  EnemyManager.setup();
  start();

  addNewInput();



  function calculateHealth() {
    for (var i = 0; i < factory.brickArray.length; i++) {
      if (factory.brickArray[i].isActive) {
        health++;
      }
    }
  }

  function start() {
    gameState = 1;

  //   setTimeout(function() {
  //      requestAnimationFrame(update);
  //      // Drawing code goes here
  //  }, 0 / 60);
   //

    //update();
  timer = setInterval(update, settings.TIME_DELAY);
  }

  function addNewInput() {

    if (lineIndex > 0) {
      inputs[lineIndex].disabled = true;
      // console.log("input disabled");
    }

    goingUpIndex = lineIndex;

    var input = document.createElement("INPUT");
    input.setAttribute("type", "text");
    input.setAttribute("value", "");
    input.className = "terminalInput";
    input.id = "test";
    document.getElementsByClassName("terminal")[0].appendChild(input);
    input.focus();
    inputs.push(input);

  }

  function dontMoveEffect() {

    anim.shake(utility.getElement("canvas"));
    consoleMessage = "Shaking :)";
    sound.playError();
    timeToResetMessage = 50;

  }

  function updateInsanelMode() {

    if (insaneMode) {
      statusMode = "INSANE";
      clearEffectCounter += 5;
      if (clearEffectCounter > canvas.width) {
        clearEffectCounter = 0;
      }
    } else {
      statusMode = "SANE";
      // clearEffectCounter = canvas.width;
    }

  }

  function draw() {

    clearEffectCounter += 20;
    if(clearEffectCounter >= canvas.width) {
      clearEffectCounter = 0;
    }
    canvas.context.clearRect(0, 0, clearEffectCounter + 10 , clearEffectCounter);
    if (switchDepth) {
      hero.draw();
    }

    if (addParticles) {

      for (var i = 0; i < numParticles; i += 1) {
        var p = particles[i];
        p.update();
        // console.log("updating");
        canvas.context.strokeStyle = "#666666"
        // canvas.context.beginPath();
        // canvas.context.arc(p.position.getX(), p.position.getY(), 10, 10, Math.PI * 2, false);

        canvas.context.strokeRect(p.position.getX(), p.position.getY(), 2, 2);
        canvas.context.fill();

      }
    }


    drawEntities();
    updateHeroPosition();

    if (!switchDepth) {
      hero.draw();
    }

  }

  function drawEntities() {

    for (var i = 0; i < factory.brickArray.length; i++) {
      //  factory.gridArray[i].draw();

      // if (factory.coinsArray[i] != null) {
      //   factory.coinsArray[i].draw();
      // }

      if (factory.brickArray[i] != null) {
        factory.brickArray[i].draw(insaneMode);
      }

      if (factory.enemiesArray[i] != null) {
        factory.enemiesArray[i].draw();
      }
    }
  }

  function updateHeroPosition() {

    if (isHeroOutOfBorders()) {
      xSpeed *= -1;
    }

    if (hero.y > hero.originY) { // if hero exceeds the ground-level put on ground.
      hero.y = hero.originY;
      ySpeed = 0;
      isAttack = false;
    }

    xSpeed *= FRICTION;
    //ySpeed *= FRICTION;
    hero.x += xSpeed;
    hero.y += ySpeed;

  }

  function isHeroOutOfBorders() {
    if (hero.x + hero.width >= 530 || hero.x <= 0) {
      return true;
    }
  }

  function updateTimeMessage() {
    if (timeToResetMessage > 0) {
      timeToResetMessage--;

      if (timeToResetMessage == 1) {
        timeToResetMessage = 0;
        consoleMessage = "Go go go!";
      }
    }
  }

  // another type of collision detection, based on entity's position
  function checkCollisionBetweenHeroAndEnemy() {
    for (var i = 0; i < factory.enemiesArray.length; i++) {
      var enemy = factory.enemiesArray[i];

      var _width = settings.gridSize;

      if (enemy.isActive && !enemy.isHit) {
        if (hero.x < enemy.x + _width && hero.x + _width > enemy.x &&
          hero.y < enemy.y + _width && hero.y + _width > enemy.y) {
          // console.log("There is a collision ", i);
          return [true, enemy];
        }
      }
    }
    return [false, null];
  }
  //////////////////////////////////////////////////////////////////

  function checkCollisionBetweenEnemyAndBase() {
    for (var i = 0; i < factory.enemiesArray.length; i++) {

      var enemy = factory.enemiesArray[i];
      var _width = settings.gridSize;

      if (enemy.isActive && !enemy.isHit) {

        for (var j = 0; j < factory.brickArray.length; j++) {

          var basePart = factory.brickArray[j];

          if (basePart.isActive && !basePart.removed) {

            if (basePart.x < enemy.x + _width && basePart.x + _width > enemy.x &&
              basePart.y < enemy.y + _width && basePart.y + _width > enemy.y) {

              // console.log("There is a collision, with the base ");
              return [true, enemy, basePart];

            }

          }

        }
      }

    }

    return [false, null, null];

  }

  function reset() {
    global.score = 0;
    targetX = hero.x;
    targetY = hero.y;
  }

  function update() {





    if (gameState == 1) {
      draw(); // always draw, Pablo Picasso ;)

      slowCounter++;

      if (slowCounter >= slowOffset) {

        slowCounter = 0;

        heroEnemyCollisionResult = checkCollisionBetweenHeroAndEnemy();
        enemyBaseCollisionResult = checkCollisionBetweenEnemyAndBase();

        if (heroEnemyCollisionResult[0]) {
          var enemy = heroEnemyCollisionResult[1];
          //EnemyManager.advance();
          enemy.advance();
          //    enemy.isHit = true;
          //  enemy.hit(40);


          for(var j = 0; j < numParticles; j ++) {
            if(particles[i]) {
              particles[i] = null;
              delete particles[i];
            }
          }
          particles = [];
          for (var i = 0; i < numParticles; i += 1) {
            // particles.push(particle.create(200, 200, Math.random() * maxSpeed + 2, Math.random() * Math.PI * 2));
            particles[i] = particle.create(enemy.x, enemy.y, Math.random() * maxSpeed + 2, Math.random() * Math.PI * 2);

          }
          addParticles = true;


          sound.playHit();
          var rndm = Math.floor( ( Math.random() * 500 ) + 40 );
          //output.push( rndm = rndm - (rndm % multiplier) );




          canvas.context.strokeStyle = "#111111";
          rndm = rndm - (rndm % settings.GRID_SIZE)
          // enemy.x =  Math.floor(Math.random() * (560 - 0)) + 0;
          enemy.x = rndm;
          enemy.y = 0;
          // requestAnimationFrame(update);






          // EnemyManager.moveUp();
          //enemy.isActive = false;
          anim.shake(utility.getElement("canvas"));
          EnemyManager.advance();

        }

        if (enemyBaseCollisionResult[0]) {
          var enemy = enemyBaseCollisionResult[1];
          var basePart = enemyBaseCollisionResult[2];
          //enemy.isHit = true;
          //  enemy.hit(10);
          // factory.brickArray.splice(0, 1);
          if(health > 0) {
            health--;
          }

          //basePart.isActive = false;
          basePart.deactivate();
          basePart.removed = true;
        }

        EnemyManager.update();

        if(health <= 0) {
          consoleMessage = "You lose. Click 'Reset game' to replay";
        }

        if (gameState == 1) {
          global.time++;
        }

        //updateInsanelMode();
        updateTexts();

        if (isAttack) {
          // console.log("attacking");
          ySpeed = (targetY - hero.y) * 0.1;
          if (hero.y - targetY < 1) {
            isAttack = false;
            ySpeed = 5;
            xSpeed = 0;
          }
        }
      }
    }
    //requestAnimationFrame(update);
  }


  function updateTexts() {
    // utility.getElement("score-txt").innerHTML = "Score " + global.score;
    utility.getElement("score-txt").innerHTML = "Score: " + Math.round(global.time / 100);
    utility.getElement("base-health-text").innerHTML = "Health: " + health;
    utility.getElement("console").innerHTML = consoleMessage;
    // utility.getElement("status-txt").innerHTML = "Mode: " + statusMode;
  }

  $(document).keydown(function(event) {

    if (event.keyCode == 9) { // tab pressed
      event.preventDefault();

      var isCommandExist = false;
      isCommandExist = command.checkCommandSubString(inputs[lineIndex].value);
      if (isCommandExist[0]) {
        inputs[lineIndex].value = isCommandExist[1];
        currentString = isCommandExist[1];
      }

    }

    if (event.keyCode == 38) { // pressed up
      if (goingUpIndex > 0) {
        goingUpIndex--;
        inputs[lineIndex].value = command.history()[goingUpIndex];
        currentString = command.history()[goingUpIndex];

      }
    }

    if (event.keyCode == 13) {

      currentString = "";
      currentString = inputs[lineIndex].value.trim();

      if (currentString.trim() != "history") {

        command.historyList.push(currentString);
      }

      // console.log("current string ", currentString);

      addNewInput();
      lineIndex++;

      if (command.checkCommand(currentString)) {
        // console.log("Yes, this command does exist");
        command[currentString]();
      } else {
        inputs[lineIndex].value = "Command " + "'" + currentString + "'" + " cannot be found";
        addNewInput();
        lineIndex++;
      }

      if (currentString.trim() == "history") {
        inputs[lineIndex].value = "History: " + command.history();
        addNewInput();
        lineIndex++;
      }


      if (currentString == "attack" && !isAttack) {
        isAttack = true;
        targetY = hero.y - (Math.abs(hero.y - 0));
      }
      currentString = "";

    }


  });

}
