let gameSeq = [];
let userSeq = [];

let btns = ["blue", "gray", "green", "amber"];

let started = false;
let level = 0;
let maxScore = 0;

let h2MaxScore = document.querySelector("#maxScore");
let h2Detail = document.querySelector("#details");

document.addEventListener("keypress", () => {
  if (started == false) {
    console.log("Game is started");
    started = true;

    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 500);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 500);
}

function errorFlash() {
  let body = document.querySelector("body");
  body.classList.add("error");
  setTimeout(() => {
    body.classList.remove("error");
  }, 100);
  setTimeout(() => { 
    body.classList.add("error"); 
  }, 200);
  setTimeout(() => { 
    body.classList.remove("error"); 
  }, 300);
  setTimeout(() => { 
    body.classList.add("error"); 
  }, 400);
  setTimeout(() => { 
    body.classList.remove("error"); 
  }, 500);
}

function levelUp() {
  userSeq = [];
  level++;
  // h2MaxScore.innerText = `Max Score ${maxScore}`;
  h2Detail.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
    console.log("same value");
  } else {
    console.log("Max Score: ", maxScore);
    h2Detail.innerHTML = `Game Over! Your score was <b>${level}</b> <br>Press any key to start`;
    errorFlash();
    if (level > maxScore) {
      maxScore = level;
      h2MaxScore.innerText = `Max Score ${maxScore}`;
    }
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
