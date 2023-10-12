//purposely bad code so students can fix it - can make it worse

import "./style.css";

const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const bird = document.getElementById("bird");

const scoreText = document.getElementById("scoreText");
let score = 0;
setText("Click to Start!");

let isJumping = false;
let gameOver = true;

document.addEventListener("mousedown", () => {
  if (gameOver === true) {
    startGame();
  } else if (isJumping == false) {
    jump();
  }
});

setInterval(function () {
  Main();
}, 10);

function Main() {
  if (gameOver == false) {
    score = score + 1;
    setText("Score: " + score);

    checkGameOver();
  }
}

function jump() {
  isJumping = true;
  dino?.classList.add("jump");
  setTimeout(removeJump, 500);
}

function removeJump() {
  dino?.classList.remove("jump");
  isJumping = false;
}

function removeObstacles() {
  cactus?.classList.remove("cactusMove");
  bird?.classList.remove("birdMove");
}

function checkGameOver() {
  if (gameOver == false && dino != null && cactus != null && bird != null) {
    //get is dinosaur jumping
    let dinoTop = parseInt(
      window.getComputedStyle(dino).getPropertyValue("top")
    );

    //get cactus position
    let cactusLeft = parseInt(
      window.getComputedStyle(cactus).getPropertyValue("left")
    );

    //get bird position
    let birdLeft = parseInt(
      window.getComputedStyle(bird).getPropertyValue("left")
    );

    //detect cactus collision
    if (dinoTop >= 150 && Math.abs(cactusLeft) < 7) {
      //end game
      endGame();
    }

    //detect bird collision
    if (dinoTop <= 55 && Math.abs(birdLeft) < 11) {
      //end game
      endGame();
    }
  }
}

function startGame() {
  console.log("Game started!");
  gameOver = false;
  score = 0;
  cactus?.classList.add("cactusMove");
  bird?.classList.add("birdMove");
}

function setText(s: string) {
  if (scoreText) {
    scoreText.textContent = s;
  }
}

function endGame() {
  console.log("player died!");
  setText("Final Score: " + score + "! Click To Play Again!");
  gameOver = true;

  //reset player
  removeJump();

  //reset cactus
  removeObstacles();
}
