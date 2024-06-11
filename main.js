// Helicopter Game Start

// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;


// Global Variables (Once)
let heliImg = document.createElement("img");
heliImg.src = "img/heliBlueTransparent.png";

let explosion = document.createElement("audio");
explosion.src = "sound/explosion.wav";

let propeller = document.createElement("audio");
propeller.src = "sound/propeller.wav";

let powerupImg = document.createElement("img");
powerupImg.src = "img/slow-down.png";

let mouseIsPressed = false;

// Global Variables (Reset)
let state;
let heli;
let wall1, wall2, wall3;
let powerup;
reset();

// Draw Function
window.addEventListener("load", draw);

function draw() {
  if (state == "start") {
    drawStart();
  } else if (state == "gameon") {
    runGame();
  } else if (state == "gameover") {
    drawGameOver();
  }

  // Request Animation Frame
  requestAnimationFrame(draw);
}

// EVENT STUFF
document.addEventListener("mousedown", mousedownHandler);
document.addEventListener("mouseup", mouseupHandler);

function mousedownHandler() {
  mouseIsPressed = true;

  // Play propeller sound
  propeller.currentTime = 0;
  propeller.play();

  // Start Game On Mousedown
  if (state === "start") {
    state = "gameon";
  }
}

function mouseupHandler() {
  mouseIsPressed = false;
  propeller.pause();
}
