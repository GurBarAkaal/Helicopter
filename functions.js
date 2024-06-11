// FUNCTIONS
let distance = 0;
let best = 0;
let isSlowed = false; // Global Variable

// Walls
let wall1Speed = -3;
let wall2Speed = -3;
let wall3Speed = -3;

// Powerup
let powerupSpeed = -3;

// Draw Start Screen
function drawStart() {
  drawMainComponents();

  // Start Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("CLICK TO START", 350, 285);

  ctx.font = "25px Consolas";
  ctx.fillText("CLICK AND HOLD LEFT MOUSE BUTTON TO GO UP", 100, 450);
  ctx.fillText("RELEASE TO GO DOWN", 415, 480);
}

function runGame() {
  // LOGIC
  moveHeli();
  moveWalls();
  checkCollisions();
  movePowerUp();

  // DRAW
  drawGame();
  distance++;
}
function moveHeli() {
  // Accelerate upward if mouse is pressed
  if (mouseIsPressed) {
    heli.speed += -1;
  }

  // Apply Gravity (accel)
  heli.speed += heli.accel;

  // Constrain Speed (max/min)
  if (heli.speed > 5) {
    heli.speed = 5;
  } else if (heli.speed < -5) {
    heli.speed = -5;
  }

  // Move Helicopter by its speed
  heli.y += heli.speed;
}

function movePowerUp() {
  powerup.x += powerupSpeed;
  if (powerup.x + powerup.w < 0) {
    resetPowerUp(); // Reset powerup position
  }
}

function resetPowerUp() {
  powerup.x = cnv.width + 500; // Reset powerup position
  powerup.y = Math.random() * 300 + 100; // Generate a new random y position
}

function moveWalls() {
  // Wall 1
  wall1.x += wall1Speed;
  if (wall1.x + wall1.w < 0) {
    wall1.x = wall3.x + 500;
    wall1.y = Math.random() * 300 + 100;
  }

  // Wall 2
  wall2.x += wall2Speed;
  if (wall2.x + wall2.w < 0) {
    wall2.x = wall1.x + 500;
    wall2.y = Math.random() * 300 + 100;
  }

  // Wall 3
  wall3.x += wall3Speed;
  if (wall3.x + wall3.w < 0) {
    wall3.x = wall2.x + 500;
    wall3.y = Math.random() * 300 + 100;
  }
}

function checkCollisions() {
  // Collision with Top and Bottom Green Bars
  if (heli.y < 50) {
    gameOver();
  } else if (heli.y + heli.h > cnv.height - 50) {
    gameOver();
  }

  // Collision with powerup
  if (
    heli.x + heli.w > powerup.x &&
    heli.x < powerup.x + powerup.w &&
    heli.y + heli.h > powerup.y &&
    heli.y < powerup.y + powerup.h
  ) {
    slowGame();
    resetPowerUp(); // Reset powerup position
  }

  // Collision with the Walls

  // Wall1 Collision
  if (
    heli.x + heli.w > wall1.x &&
    heli.x < wall1.x + wall1.w &&
    heli.y + heli.h > wall1.y &&
    heli.y < wall1.y + wall1.h
  ) {
    gameOver();
  }

  // Wall2 Collision
  if (
    heli.x + heli.w > wall2.x &&
    heli.x < wall2.x + wall2.w &&
    heli.y + heli.h > wall2.y &&
    heli.y < wall2.y + wall2.h
  ) {
    gameOver();
  }

  // Wall3 Collision
  if (
    heli.x + heli.w > wall3.x &&
    heli.x < wall3.x + wall3.w &&
    heli.y + heli.h > wall3.y &&
    heli.y < wall3.y + wall3.h
  ) {
    gameOver();
  }
}

function slowGame() {
  if (!isSlowed) {
    console.log("Walls are slowing down.");

    // Slow down all wall speeds by half
    wall1Speed = -1.5;
    wall2Speed = -1.5;
    wall3Speed = -1.5;
    powerupSpeed = -1.5;

    isSlowed = true;
    setTimeout(resetSpeed, 5000); // Reset wall speeds after 5 seconds
  }
}

function resetSpeed() {
  console.log("Resetting wall speeds.");
  isSlowed = false;

  // Reset wall speeds back to their original values
  wall1Speed = -3;
  wall2Speed = -3;
  wall3Speed = -3;
  powerupSpeed = -3;
}

function gameOver() {
  explosion.play();
  state = "gameover";
  if (distance > best) {
    best = distance;
    best += 1;
  }
  setTimeout(reset, 2000);
}

// Draw Game Elements
function drawGame() {
  drawMainComponents();
  drawWalls();
}

// Draw Game Over Screen
function drawGameOver() {
  drawMainComponents();
  drawWalls();

  // Circle around Helicopter
  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(heli.x + heli.w / 2, heli.y + heli.h / 2, 60, 0, 2 * Math.PI);
  ctx.stroke();

  // Game Over Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("GAME OVER", 350, 285);
}

// HELPER FUNCTIONS

function reset() {
  state = "start";
  distance = 0;
  heli = {
    x: 200,
    y: 250,
    w: 80,
    h: 40,
    speed: 0,
    accel: 0.7,
  };
  wall1 = {
    x: cnv.width,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
  };
  wall2 = {
    x: cnv.width + 500,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
  };
  wall3 = {
    x: cnv.width + 1000,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
  };
  powerup = {
    x: cnv.width + 500,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 50,
  };
}

function drawWalls() {
  ctx.fillStyle = "green";
  ctx.fillRect(wall1.x, wall1.y, wall1.w, wall1.h);
  ctx.fillRect(wall2.x, wall2.y, wall2.w, wall2.h);
  ctx.fillRect(wall3.x, wall3.y, wall3.w, wall3.h);
}

function drawMainComponents() {
  // Background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Green Bars
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, cnv.width, 50);
  ctx.fillRect(0, cnv.height - 50, cnv.width, 50);

  // Green Bar Text
  ctx.font = "30px Consolas";
  ctx.fillStyle = "black";
  ctx.fillText("HELICOPTER GAME", 25, 35);
  ctx.fillText("DISTANCE:" + distance, 25, cnv.height - 15);
  ctx.fillText("BEST:" + best, cnv.width - 250, cnv.height - 15);

  // Helicopter
  ctx.drawImage(heliImg, heli.x, heli.y);

  //Powerup
  ctx.drawImage(powerupImg, powerup.x, powerup.y, powerup.w, powerup.h);
}
