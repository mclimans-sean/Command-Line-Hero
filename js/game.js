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
var health = 1;
var particles = [];
var numParticles = 40;
var maxSpeed = 10;
var switchDepth = false;
var enemy;
var _width;
var isEnemyReachedBottomResult = false;
// var updateParticles = false;
var helpCommands = [];
var countToUpdateTime = 0;
var maxTimeReached = 0;
var isGameOver = false;
var messages = ["Awesome", "Great", "Maniac", "Woooaaaha"];
var weatherParticles = [];
var countUpdateWeatherParticle = 0;

window.onload = function() {

  // factory.createGridEntities();
  factory.createBricks();
  //  factory.createCoins();
  factory.createEnemies();
  canvas.init();
  levelManager.buildStage(stages[0]);

  // testing server request


  utility.getElement("preloader").innerHTML = "Loading help commands...";
  utility.getElement("preloader").style.display = "block";

  $.getJSON("https://cors-anywhere.herokuapp.com/fhdhaidari.com/clih/help.php", function(result) {

    //console.log("Result === " , result[0]["right"]);


    var key = Object.keys(result[0]);

    //console.log("Key 1 " , key[1]);

    for (var i = 0; i < Object.keys(result[0]).length; i++) {
      helpCommands.push(key[i] + " : " + result[0][key[i]]);
    }

    //console.log(helpCommands.toString());
    utility.getElement("preloader").style.display = "none";
    //anim.fadeOut("preloader");

  });


  ////////////////////////////

  // // creating the particles
  // for (var i = 0; i < numParticles; i += 1) {
  //   // particles.push(particle.create(200, 200, Math.random() * maxSpeed + 2, Math.random() * Math.PI * 2));
  //   particles[i] = particle.create(200, 200, Math.random() * maxSpeed + 2, Math.random() * Math.PI * 2);
  //
  // }

  addParticles();
  // addWeatherParticles();
  // calculateHealth();

  var moveLeft = function() {
    sound.playWhip();
    xSpeed = -10;
  }

  var up = function() {
    attack = true;
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

  // var attack = function() {
  //   attack = true;
  // }

  var help = function() {
    addNewInput("Help-");
    lineIndex++;
    for (var i = 0; i < helpCommands.length + 1; i++) {
      addNewInput(helpCommands[i]);
      lineIndex++;
    }
  }

  var history = function() {
    addNewInput("History-");
    lineIndex ++;
    for (var i = 0; i < command.history().length + 1; i++) {
      addNewInput(command.history()[i]);
      lineIndex++;
    }
  }


  $("body").click(function() {
    inputs[lineIndex].focus();
  });

  reset();

  command.left = moveLeft;
  command.right = moveRight;
  command.up = up;
  command.down = moveDown;
  command.clear = clear;
  command.pause = pause;
  command.slow = slow;
  // command.attack = attack;
  command.help = help;

  heroStepLength = settings.gridSize + canvas.padding;

  EnemyManager.setup();
  start();

  addNewInput();


  function addParticles() {
    for (var i = 0; i < numParticles; i += 1) {
      // particles.push(particle.create(200, 200, Math.random() * maxSpeed + 2, Math.random() * Math.PI * 2));
      particles[i] = particle.create(-400, -400, Math.random() * maxSpeed + 2, Math.random() * Math.PI * 2);

    }
  }

  function addWeatherParticles () {
    for (var i = 0; i < 40; i += 1) {
      var obj = {
        x: i * 40,
        y: i * 40,
        xVel: utility.getRandomRange(2, 1),
        yVel: Math.random() * 10
      };
      weatherParticles.push(obj);
    }
  }

  function calculateHealth() {
    for (var i = 0; i < factory.brickArray.length; i++) {
      if (factory.brickArray[i].isActive) {
        health++;
      }
    }
  }

  function setupHighScore() {

    if (localStorage.highScore) {
      maxTimeReached = localStorage.getItem("highScore");
      // localStorage.setItem("highScore", 0);

    } else {

      localStorage.setItem("highScore", 0);
      maxTimeReached = 0;
    }
  }

  function saveHighScore(_val) {
    if (maxTimeReached < _val) {
      localStorage.highScore = _val.toString();
    }
  }

  function start() {

    setupHighScore();

    console.log("High-Score ", localStorage.highScore);
    anim.fadeIn();
    gameState = 1;
    sound.playMusic();

    //   setTimeout(function() {
    //      requestAnimationFrame(update);
    //      // Drawing code goes here
    //  }, 0 / 60);
    //

    //update();
    timer = setInterval(update, settings.TIME_DELAY);
  }

  function addNewInput(_text) {

    var fontColor = "#444444";
    if (lineIndex > 0) {
      inputs[lineIndex].disabled = true;

      // console.log("input disabled");
    }

    if (_text == undefined) {
      _text = "";
    } else {

      fontColor = "#2222CC";
    }
    goingUpIndex = lineIndex;

    var input = document.createElement("INPUT");
    input.setAttribute("type", "text");
    input.setAttribute("value", _text);
    input.style.color = fontColor;
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

    clearEffectCounter += 10;
    if (clearEffectCounter >= canvas.width) {
      clearEffectCounter = 0;
    }
    canvas.context.clearRect(0, 0, clearEffectCounter + 10, clearEffectCounter);
    if (switchDepth) {
      hero.draw();
    }

    updateParticles();


    drawEntities();

    updateHeroPosition();

    if (!switchDepth) {
      hero.draw();
    }

  }


  function updateParticles() {

    for (var i = 0; i < numParticles; i += 1) {
      var p = particles[i];
      p.update();
      // console.log("updating");
      canvas.context.strokeStyle = "#666666"
      // canvas.context.beginPath();
      // canvas.context.arc(p.position.getX(), p.position.getY(), 10, 10, Math.PI * 2, false);

      canvas.context.strokeRect(p.position.getX(), p.position.getY(), 2, 2);
      canvas.context.fill();

  //   }
  //   countUpdateWeatherParticle ++;
  //   if(countUpdateWeatherParticle > 4) {
  //   for (var j = 0; j < weatherParticles.length; j++) {
  //     var weatherParticle = weatherParticles[j];
  //     // weatherParticle.update();
  //     canvas.context.strokeStyle = "#DDDDDD"
  //     weatherParticle.x = utility.getRandomRange(500, 20);
  //
  //     weatherParticle.y = utility.getRandomRange(500, 20);
  //
  //     canvas.context.strokeRect(weatherParticle.x, weatherParticle.y, 6, 6);
  //
  //     canvas.context.fill();
  //
  //   }
  //   countUpdateWeatherParticle = 0;
  }
}

  function drawEntities() {

    for (var i = 0; i < factory.brickArray.length; i++) {
      // factory.gridArray[i].draw();

      // if (factory.coinsArray[i] != null) {
      //   factory.coinsArray[i].draw();
      // }
      //
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
    if (hero.x + hero.width >= 500 || hero.x <= 10) {
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
      enemy = factory.enemiesArray[i];

      _width = settings.gridSize;

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

      enemy = factory.enemiesArray[i];
      _width = settings.gridSize;

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



  function isEnemyReachedBottom() {

    for (var i = 0; i < factory.enemiesArray.length; i++) {

      var enemy = factory.enemiesArray[i];

      if (enemy.isActive && !enemy.isHit) {

        if (enemy.y > 480) {
          return true;
        }
      }

    }

    return false;

  }

  function reset() {
    global.score = 0;
    targetX = hero.x;
    targetY = hero.y;
  }

  function update() {


    if (gameState == 1) {
      draw(); // always draw, Pablo Picasso ;)

      updateTexts();


      updateTimeMessage();

      slowCounter++;

      if (slowCounter >= slowOffset) {

        slowCounter = 0;

        heroEnemyCollisionResult = checkCollisionBetweenHeroAndEnemy();
        // enemyBaseCollisionResult = checkCollisionBetweenEnemyAndBase();

        if (heroEnemyCollisionResult[0]) {
          var enemy = heroEnemyCollisionResult[1];
          //EnemyManager.advance();
          enemy.advance();

          timeToResetMessage = 100;
          consoleMessage = messages[Math.floor((Math.random() * 4 - 0) + 0)];
          //    enemy.isHit = true;
          //  enemy.hit(40);


          for (var j = 0; j < numParticles; j++) {
            if (particles[i]) {
              particles[i] = null;
              delete particles[i];
            }
          }

          particles = [];
          for (var i = 0; i < numParticles; i += 1) {
            // particles.push(particle.create(200, 200, Math.random() * maxSpeed + 2, Math.random() * Math.PI * 2));
            particles[i] = particle.create(enemy.x, enemy.y, Math.random() * maxSpeed + 2, Math.random() * Math.PI * 2);

          }

          sound.playHit();
          var rndm = Math.floor((Math.random() * 500) + 40);
          //output.push( rndm = rndm - (rndm % multiplier) );

          canvas.context.strokeStyle = "#111111";
          rndm = rndm - (rndm % settings.GRID_SIZE)
          // enemy.x =  Math.floor(Math.random() * (560 - 0)) + 0;
          enemy.x = rndm;
          enemy.y = 0;
          anim.shake(utility.getElement("canvas"));
          EnemyManager.advance();

        }

        enemyBaseCollisionResult = isEnemyReachedBottom();
        //if (enemyBaseCollisionResult[0]) {
        if (enemyBaseCollisionResult) {
          var enemy = enemyBaseCollisionResult[1];

          if (health > 0) {
            health--;
          }

        }

        EnemyManager.update();

        if (health <= 0) {
          saveHighScore(global.time);
          EnemyManager.removeEnemies();
          consoleMessage = "You lose. Type the 'reset' command to replay";
          isGameOver = true;
          //global.time = 0;
        }

        if (gameState == 1 && !isGameOver) {
          countToUpdateTime++;
          if (countToUpdateTime > 60) { // I used this method in order to not divide by 1000 (num seconds).
            global.time++;
            countToUpdateTime = 0;
          }
          // global.score ++;
        }

        //updateInsanelMode();

        if (isAttack) {
          // console.log("attacking");
          ySpeed = (targetY - hero.y) * 0.1;
          if (hero.y - targetY < 1) {
            isAttack = false;
            ySpeed = 5;
            //xSpeed = 0;
          }
        }
      }
    }
    //requestAnimationFrame(update);
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

  function updateTexts() {

    // utility.getElement("score-txt").innerHTML = "Score " + global.score;
    // utility.getElement("score-txt").innerHTML = "Score: " + Math.round(global.time / 100);

    utility.getElement("max-time-txt").innerHTML = "High Score: " + maxTimeReached;
    utility.getElement("score-txt").innerHTML = "Score: " + global.time;
    // utility.getElement("base-health-text").innerHTML = "Health: " + health;
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
      if (goingUpIndex >= 0) {

        inputs[lineIndex].value = command.history()[goingUpIndex];
        currentString = command.history()[goingUpIndex];
        goingUpIndex--;

      }
    }

    if (event.keyCode == 40) { // pressed up
      if (goingUpIndex < lineIndex - 1) {
        goingUpIndex++;
        inputs[lineIndex].value = command.history()[goingUpIndex];
        currentString = command.history()[goingUpIndex];


      }
    }

    if (event.keyCode == 13) {

      currentString = "";
      currentString = inputs[lineIndex].value.trim();

      //if (currentString.trim() != "history") {

      command.historyList.push(currentString);
      //}

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
        // inputs[lineIndex].value = "History: " + command.history();
        // addNewInput();
        // lineIndex++;

        history();
      }

      if (currentString.trim() == "reset") {
        location.reload();
      }


      if (currentString == "up" && !isAttack) {
        isAttack = true;
        targetY = hero.y - (Math.abs(hero.y - 0));
      }
      currentString = "";

    }


  });

}
