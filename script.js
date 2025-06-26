let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById("display");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const laps = document.getElementById("laps");

function startTimer() {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    tInterval = setInterval(updateDisplay, 1000);
    running = true;
  }
}

function pauseTimer() {
  if (running) {
    clearInterval(tInterval);
    difference = new Date().getTime() - startTime;
    running = false;
  }
}

function resetTimer() {
  clearInterval(tInterval);
  difference = 0;
  running = false;
  lapCounter = 1;
  display.innerText = "00:00:00";
  laps.innerHTML = "";
}

function updateDisplay() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  display.innerText = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(unit) {
  return unit < 10 ? "0" + unit : unit;
}

function addLap() {
  if (running) {
    const lapTime = display.innerText;
    const li = document.createElement("li");
    li.innerText = `Lap ${lapCounter++}: ${lapTime}`;
    laps.appendChild(li);
  }
}

// Event Listeners
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
lapButton.addEventListener("click", addLap);
