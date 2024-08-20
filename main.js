const pedestrianRed = document.getElementById("pedestrianRed");
const pedestrianGreen = document.getElementById("pedestrianGreen");
const vehicleRed = document.getElementById("vehicleRed");
const vehicleYellow = document.getElementById("vehicleYellow");
const vehicleGreen = document.getElementById("vehicleGreen");
const crossButton = document.getElementById("crossButton");
const message = document.getElementById("message");
const ledDisplay = document.querySelector(".led-display");

let isChanging = false;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function changeLights() {
  if (isChanging) return;
  isChanging = true;

  ledDisplay.textContent = "おまちください";
  crossButton.disabled = true;

  // 車両信号を黄色に変更
  vehicleGreen.classList.remove("active");
  vehicleYellow.classList.add("active");
  await sleep(3000);

  // 車両信号を赤に変更
  vehicleYellow.classList.remove("active");
  vehicleRed.classList.add("active");
  await sleep(2000);

  // 歩行者信号を青に変更
  pedestrianRed.classList.remove("active");
  pedestrianGreen.classList.add("active");
  ledDisplay.textContent = "横断できます";
  await sleep(10000);

  // 歩行者信号を点滅させる
  for (let i = 0; i < 5; i++) {
    pedestrianGreen.classList.remove("active");
    await sleep(500);
    pedestrianGreen.classList.add("active");
    await sleep(500);
  }

  // 歩行者信号を赤に戻す
  pedestrianGreen.classList.remove("active");
  pedestrianRed.classList.add("active");
  ledDisplay.textContent = "横断できません";
  await sleep(2000);

  // 車両信号を青に戻す
  vehicleRed.classList.remove("active");
  vehicleGreen.classList.add("active");

  ledDisplay.textContent = "押してください";
  crossButton.disabled = false;
  isChanging = false;
}

crossButton.addEventListener("click", changeLights);
