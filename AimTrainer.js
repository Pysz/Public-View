let targetContainer = document.getElementById("targetcontainer");
let target = document.getElementById("target");
let score = document.getElementById("score");
let accuracy = document.getElementById("accuracy");
let time = document.getElementById("time");
let body = document.body;
let seconds = 31;
let points = 0;
let accHit = 0;
let accTotal = 0;
let countDownInterval = null;
let chanceRed;
let penaltyTimeout = null;
let isFirstGreenDotClicked = false;
let redTime = null;
const redCssColor = "radial-gradient(circle, rgb(240, 15, 15), black 100%)";
const greenCssColor = "radial-gradient(circle, rgb(9, 219, 34), black 100%)";

const startAlert = () => {
  alert(
    "Change window size to desired size. When the red dot turns red wait untill it turns back to green. Otherwise, points will be deducted! CLICK THE GREEN TARGET TO START."
  );
};

const playGunHitSound = () => {
  let gunSound1 = document.getElementById("gunsound1");
  let newGunSound = new Audio(gunSound1.src);

  newGunSound.volume = 0.5;
  newGunSound.play();
};

const playGunMissSound = () => {
  let missSound = document.getElementById("misssound");
  let newGunSound = new Audio(missSound.src);

  newGunSound.volume = 1;
  newGunSound.play();
};

const playredHitSound = () => {
  let redHitSound = document.getElementById("redhitsound");
  let newGunSound = new Audio(redHitSound.src);

  newGunSound.volume = 1;
  newGunSound.play();
};

const shootClick = (event) => {
  let isRedHit = target.style.backgroundImage === redCssColor;

  if (isRedHit) {
    points -= 2;
    playredHitSound();
  } else {
    points++;
    playGunHitSound();
  }

  accHit++;
  accTotal++;
  score.innerHTML = "Score - " + points;

  let aimWidth = targetContainer.offsetWidth;
  let aimHeight = targetContainer.offsetHeight;

  const targetPosition = () => {
    let x = Math.random() * (aimHeight - 18);
    let y = Math.random() * (aimWidth - 18);

    target.style.transform = `translate(${y}px, ${x}px)`;
  };
  targetPosition();

  if (accHit > 0) {
    updateAcc();
  }
  event.stopPropagation();

  if (!isFirstGreenDotClicked) {
    startCount();
    isFirstGreenDotClicked = true;
  }

  spawnNewTarget();
};

const missClick = () => {
  playGunMissSound();
  accTotal++;
  updateAcc();
};

const updateAcc = () => {
  if (accTotal > 0) {
    accuracy.innerHTML = Math.floor((accHit / accTotal) * 100) + "%";
  } else {
    accuracy.innerHTML = "0%";
  }
};

const countDown = () => {
  if (seconds > 0) {
    seconds--;
    time.innerHTML = seconds;
    timeWarn();
  } else {
    clearInterval(countDownInterval);
    body.style.backgroundImage = redCssColor;
    targetContainer.innerHTML = "REFRESH TO RESTART!";
    alert("Score - " + points + "   " + "Accuracy - " + accuracy.innerHTML);
  }
};
const startCount = () => {
  if (countDownInterval === null)
    countDownInterval = setInterval(countDown, 1000);
};

const timeWarn = () => {
  if (seconds < 10 && seconds % 2 === 1) {
    time.style.color = "red";
  } else {
    time.style.color = "white";
  }
};

const spawnNewTarget = () => {
  clearTimeout(redTime);
  chanceRed = Math.random();
  if (chanceRed < 0.22) {
    target.style.backgroundImage = redCssColor;
    redTime = setTimeout(() => {
      target.style.backgroundImage = greenCssColor;
    }, 1000);
  } else {
    target.style.backgroundImage = greenCssColor;
  }
};

startAlert();
