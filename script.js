/* =========================================================
   TYPING SPEED ULTIMATE PRO
   ========================================================= */


/* =========================================================
   ELEMENTS
   ========================================================= */

const timeButtons =
  document.querySelectorAll(".time-btn");

const difficultyButtons =
  document.querySelectorAll(".difficulty-btn");

const textDisplay =
  document.getElementById("textDisplay");

const typingInput =
  document.getElementById("typingInput");

const startBtn =
  document.getElementById("startBtn");

const restartBtn =
  document.getElementById("restartBtn");

const newTestBtn =
  document.getElementById("newTestBtn");

const timerEl =
  document.getElementById("timer");

const progressBar =
  document.getElementById("progressBar");

const wpmEl =
  document.getElementById("wpm");

const accuracyEl =
  document.getElementById("accuracy");

const correctCharsEl =
  document.getElementById("correctChars");

const mistakesEl =
  document.getElementById("mistakes");

const statusText =
  document.getElementById("statusText");

const countdownOverlay =
  document.getElementById("countdownOverlay");

const countdownNumber =
  document.getElementById("countdownNumber");

const testScreen =
  document.getElementById("testScreen");

const resultsScreen =
  document.getElementById("resultsScreen");

const finalWpm =
  document.getElementById("finalWpm");

const finalAccuracy =
  document.getElementById("finalAccuracy");

const finalCorrect =
  document.getElementById("finalCorrect");

const finalMistakes =
  document.getElementById("finalMistakes");

const finalCharacters =
  document.getElementById("finalCharacters");

const resultMessage =
  document.getElementById("resultMessage");

const newRecord =
  document.getElementById("newRecord");

const tryAgainBtn =
  document.getElementById("tryAgainBtn");

const newPassageBtn =
  document.getElementById("newPassageBtn");

const historyList =
  document.getElementById("historyList");

const historyCount =
  document.getElementById("historyCount");

const clearHistoryBtn =
  document.getElementById("clearHistoryBtn");

const themeBtn =
  document.getElementById("themeBtn");

const toast =
  document.getElementById("toast");


/* =========================================================
   SETTINGS
   ========================================================= */

let selectedTime = 30;
let selectedDifficulty = "easy";


/* =========================================================
   TEST STATE
   ========================================================= */

let currentText = "";

let timer = selectedTime;

let interval = null;

let testStarted = false;

let testFinished = false;

let startTimestamp = null;

let totalTyped = 0;

let correctChars = 0;

let mistakes = 0;


/* =========================================================
   PASSAGES
   ========================================================= */

const passages = {

  easy: [

    "The sun rises in the east and brings light to a new day.",

    "Small steps every day can lead to big improvements over time.",

    "Practice makes progress when you stay patient and consistent.",

    "A good book can take you to places you have never seen.",

    "Learning something new can be exciting and rewarding.",

    "Keep your mind focused and your hands relaxed while typing.",

    "Technology can help people learn, create, and solve problems.",

    "Every great skill begins with simple practice and patience.",

    "A calm mind can make difficult tasks much easier.",

    "Good habits become stronger when we repeat them every day."

  ],

  medium: [

    "Modern technology allows people to communicate, create, and learn faster than ever before.",

    "The best way to improve a skill is to practice regularly while paying attention to small mistakes.",

    "A successful project usually begins with a clear idea, careful planning, and consistent effort.",

    "Computers have become powerful tools for education, creativity, communication, and entertainment.",

    "When you learn from mistakes instead of being discouraged by them, every challenge becomes an opportunity.",

    "Good typing technique comes from accuracy, comfortable posture, and steady movement across the keyboard.",

    "Curiosity encourages us to ask questions, explore new ideas, and understand the world around us.",

    "Organizing your time can make difficult projects easier and leave more room for creative thinking."

  ],

  hard: [

    "Artificial intelligence, renewable energy, robotics, and advanced computing are transforming the way people solve complex problems.",

    "Successful developers understand that building reliable software requires patience, careful testing, logical thinking, and attention to detail.",

    "Scientific discoveries often begin with simple questions, but answering those questions can require years of research, experimentation, and collaboration.",

    "The modern digital world provides extraordinary opportunities for communication and creativity, while also requiring responsible and thoughtful decision-making.",

    "When a complicated problem seems impossible at first, breaking it into smaller pieces can reveal a practical solution that was difficult to see before.",

    "Learning to type quickly is not simply about moving your fingers faster; it is about developing accuracy, rhythm, concentration, and confidence."

  ]

};


/* =========================================================
   RANDOM PASSAGE
   ========================================================= */

function getRandomPassage() {

  const list =
    passages[selectedDifficulty];

  return list[
    Math.floor(
      Math.random() * list.length
    )
  ];

}


/* =========================================================
   LOAD PASSAGE
   ========================================================= */

function loadPassage() {

  currentText =
    getRandomPassage();

  textDisplay.innerHTML =
    "";

  currentText
    .split("")
    .forEach((character, index) => {

      const span =
        document.createElement("span");

      span.className =
        "char";

      span.textContent =
        character;

      if (index === 0) {
        span.classList.add("current");
      }

      textDisplay.appendChild(span);

    });

}


/* =========================================================
   RESET TEST
   ========================================================= */

function resetTest() {

  clearInterval(interval);

  interval = null;

  timer = selectedTime;

  testStarted = false;

  testFinished = false;

  startTimestamp = null;

  totalTyped = 0;

  correctChars = 0;

  mistakes = 0;

  typingInput.value = "";

  typingInput.disabled = true;

  timerEl.textContent =
    selectedTime;

  progressBar.style.width =
    "100%";

  wpmEl.textContent =
    "0";

  accuracyEl.textContent =
    "100%";

  correctCharsEl.textContent =
    "0";

  mistakesEl.textContent =
    "0";

  statusText.textContent =
    "Ready";

  startBtn.disabled = false;

  startBtn.textContent =
    "Start Test";

  loadPassage();

}


/* =========================================================
   COUNTDOWN
   ========================================================= */

function startCountdown() {

  return new Promise(resolve => {

    countdownOverlay.classList.remove(
      "hidden"
    );

    let count = 3;

    countdownNumber.textContent =
      count;

    const countdownInterval =
      setInterval(() => {

        count--;

        if (count <= 0) {

          clearInterval(
            countdownInterval
          );

          countdownOverlay.classList.add(
            "hidden"
          );

          resolve();

          return;

        }

        countdownNumber.textContent =
          count;

        countdownNumber.style.animation =
          "none";

        void countdownNumber.offsetWidth;

        countdownNumber.style.animation =
          "countdownPop 0.8s";

      }, 800);

  });

}


/* =========================================================
   START TEST
   ========================================================= */

async function startTest() {

  if (testStarted) return;

  resetTest();

  startBtn.disabled = true;

  statusText.textContent =
    "Get Ready";

  await startCountdown();

  testStarted = true;

  startTimestamp =
    Date.now();

  typingInput.disabled =
    false;

  typingInput.focus();

  statusText.textContent =
    "Typing...";

  startBtn.textContent =
    "Test Running";

  interval =
    setInterval(
      updateTimer,
      1000
    );

}


/* =========================================================
   TIMER
   ========================================================= */

function updateTimer() {

  timer--;

  timerEl.textContent =
    timer;

  const percent =
    (timer / selectedTime) * 100;

  progressBar.style.width =
    `${Math.max(percent, 0)}%`;

  if (timer <= 0) {

    finishTest();

  }

}


/* =========================================================
   TYPING INPUT
   ========================================================= */

typingInput.addEventListener(
  "input",
  updateTyping
);


function updateTyping() {

  if (!testStarted || testFinished) {
    return;
  }

  const typed =
    typingInput.value;

  totalTyped =
    typed.length;

  correctChars = 0;

  mistakes = 0;


  const chars =
    textDisplay.querySelectorAll(
      ".char"
    );


  chars.forEach(
    (char, index) => {

      char.classList.remove(
        "correct",
        "incorrect",
        "current"
      );

      if (
        index < typed.length
      ) {

        if (
          typed[index] ===
          currentText[index]
        ) {

          char.classList.add(
            "correct"
          );

          correctChars++;

        } else {

          char.classList.add(
            "incorrect"
          );

          mistakes++;

        }

      }

    }
  );


  if (
    typed.length <
    currentText.length
  ) {

    chars[
      typed.length
    ].classList.add(
      "current"
    );

  }


  updateLiveStats();


  /*
    Automatically finish when the
    entire passage is typed.
  */

  if (
    typed.length >=
    currentText.length
  ) {

    finishTest();

  }

}


/* =========================================================
   LIVE STATS
   ========================================================= */

function updateLiveStats() {

  const elapsed =
    Math.max(
      (Date.now() - startTimestamp) / 1000,
      1
    );

  const minutes =
    elapsed / 60;

  const wpm =
    (correctChars / 5) / minutes;

  const accuracy =
    totalTyped > 0
      ? (correctChars / totalTyped) * 100
      : 100;

  wpmEl.textContent =
    Math.round(wpm);

  accuracyEl.textContent =
    `${Math.round(accuracy)}%`;

  correctCharsEl.textContent =
    correctChars;

  mistakesEl.textContent =
    mistakes;

}


/* =========================================================
   FINISH TEST
   ========================================================= */

function finishTest() {

  if (testFinished) return;

  testFinished = true;

  clearInterval(interval);

  interval = null;

  typingInput.disabled =
    true;

  statusText.textContent =
    "Complete";

  const elapsed =
    Math.max(
      (Date.now() - startTimestamp) / 1000,
      1
    );

  const minutes =
    elapsed / 60;

  const wpm =
    Math.round(
      (correctChars / 5) /
      minutes
    );

  const accuracy =
    totalTyped > 0
      ? Math.round(
          (correctChars /
            totalTyped) *
          100
        )
      : 100;


  showResults(
    wpm,
    accuracy
  );

}


/* =========================================================
   RESULTS
   ========================================================= */

function showResults(
  wpm,
  accuracy
) {

  finalWpm.textContent =
    wpm;

  finalAccuracy.textContent =
    `${accuracy}%`;

  finalCorrect.textContent =
    correctChars;

  finalMistakes.textContent =
    mistakes;

  finalCharacters.textContent =
    totalTyped;


  resultMessage.textContent =
    getResultMessage(wpm);


  const best =
    getPersonalBest();

  if (wpm > best) {

    newRecord.classList.remove(
      "hidden"
    );

    savePersonalBest(wpm);

  } else {

    newRecord.classList.add(
      "hidden"
    );

  }


  saveHistory(
    wpm,
    accuracy,
    correctChars,
    mistakes,
    selectedTime,
    selectedDifficulty
  );


  testScreen.classList.add(
    "hidden"
  );

  resultsScreen.classList.remove(
    "hidden"
  );

  renderHistory();

}


/* =========================================================
   RESULT MESSAGE
   ========================================================= */

function getResultMessage(wpm) {

  if (wpm >= 80) {
    return "Incredible speed! You're flying!";
  }

  if (wpm >= 60) {
    return "Excellent work! Very fast typing.";
  }

  if (wpm >= 45) {
    return "Great job! Your speed is improving.";
  }

  if (wpm >= 30) {
    return "Good work! Keep practicing.";
  }

  if (wpm >= 15) {
    return "Nice start! Accuracy and practice will help.";
  }

  return "Every expert starts somewhere. Keep practicing!";
}


/* =========================================================
   PERSONAL BEST
   ========================================================= */

function getPersonalBest() {

  return Number(
    localStorage.getItem(
      "typingPersonalBest"
    ) || 0
  );

}


function savePersonalBest(wpm) {

  localStorage.setItem(
    "typingPersonalBest",
    String(wpm)
  );

}


/* =========================================================
   HISTORY
   ========================================================= */

function getHistory() {

  return JSON.parse(
    localStorage.getItem(
      "typingHistory"
    ) || "[]"
  );

}


function saveHistory(
  wpm,
  accuracy,
  correct,
  mistakes,
  time,
  difficulty
) {

  const history =
    getHistory();

  history.unshift({

    wpm,
    accuracy,
    correct,
    mistakes,
    time,
    difficulty,

    date:
      new Date().toLocaleString()

  });


  if (history.length > 30) {

    history.splice(
      30
    );

  }


  localStorage.setItem(
    "typingHistory",
    JSON.stringify(history)
  );

}


/* =========================================================
   RENDER HISTORY
   ========================================================= */

function renderHistory() {

  const history =
    getHistory();

  historyCount.textContent =
    `${history.length} test${history.length === 1 ? "" : "s"}`;


  if (!history.length) {

    historyList.innerHTML = `
      <div class="empty-history">
        No tests completed yet.
      </div>
    `;

    return;

  }


  historyList.innerHTML =
    history.map(
      item => `

        <div class="history-item">

          <div class="history-item-top">

            <span class="history-wpm">
              ${escapeHTML(item.wpm)} WPM
            </span>

            <span class="history-date">
              ${escapeHTML(item.date)}
            </span>

          </div>

          <div class="history-details">

            <span>
              ${escapeHTML(item.accuracy)}% accuracy
            </span>

            <span>
              ${escapeHTML(item.difficulty)}
            </span>

            <span>
              ${escapeHTML(item.time)}s
            </span>

          </div>

        </div>

      `
    ).join("");

}


/* =========================================================
   CLEAR HISTORY
   ========================================================= */

clearHistoryBtn.addEventListener(
  "click",
  () => {

    localStorage.removeItem(
      "typingHistory"
    );

    renderHistory();

    showToast(
      "History cleared"
    );

  }
);


/* =========================================================
   TIME BUTTONS
   ========================================================= */

timeButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        timeButtons.forEach(
          b =>
            b.classList.remove(
              "active"
            )
        );

        button.classList.add(
          "active"
        );

        selectedTime =
          Number(
            button.dataset.time
          );

        resetTest();

      }
    );

  }
);


/* =========================================================
   DIFFICULTY BUTTONS
   ========================================================= */

difficultyButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        difficultyButtons.forEach(
          b =>
            b.classList.remove(
              "active"
            )
        );

        button.classList.add(
          "active"
        );

        selectedDifficulty =
          button.dataset.difficulty;

        resetTest();

      }
    );

  }
);


/* =========================================================
   NEW TEST
   ========================================================= */

newTestBtn.addEventListener(
  "click",
  () => {

    resultsScreen.classList.add(
      "hidden"
    );

    testScreen.classList.remove(
      "hidden"
    );

    resetTest();

  }
);


/* =========================================================
   RESTART
   ========================================================= */

restartBtn.addEventListener(
  "click",
  () => {

    resetTest();

    showToast(
      "Test restarted"
    );

  }
);


/* =========================================================
   TRY AGAIN
   ========================================================= */

tryAgainBtn.addEventListener(
  "click",
  () => {

    resultsScreen.classList.add(
      "hidden"
    );

    testScreen.classList.remove(
      "hidden"
    );

    resetTest();

    startTest();

  }
);


/* =========================================================
   NEW PASSAGE
   ========================================================= */

newPassageBtn.addEventListener(
  "click",
  () => {

    resultsScreen.classList.add(
      "hidden"
    );

    testScreen.classList.remove(
      "hidden"
    );

    resetTest();

    showToast(
      "New passage loaded"
    );

  }
);


/* =========================================================
   START BUTTON
   ========================================================= */

startBtn.addEventListener(
  "click",
  startTest
);


/* =========================================================
   PREVENT PASTE
   ========================================================= */

typingInput.addEventListener(
  "paste",
  event => {

    event.preventDefault();

    showToast(
      "Pasting is disabled during the test"
    );

  }
);


/* =========================================================
   FOCUS TYPING BOX
   ========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      !testFinished &&
      !testStarted &&
      !typingInput.disabled
    ) {

      typingInput.focus();

    }

  }
);


/* =========================================================
   THEME
   ========================================================= */

themeBtn.addEventListener(
  "click",
  () => {

    document.body.classList.toggle(
      "light"
    );

    const light =
      document.body.classList.contains(
        "light"
      );

    localStorage.setItem(
      "typingTheme",
      light ? "light" : "dark"
    );

    themeBtn.textContent =
      light ? "🌙" : "☀";

  }
);


if (
  localStorage.getItem(
    "typingTheme"
  ) === "light"
) {

  document.body.classList.add(
    "light"
  );

  themeBtn.textContent =
    "🌙";

}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {

  toast.textContent =
    message;

  toast.classList.add(
    "show"
  );

  setTimeout(
    () => {

      toast.classList.remove(
        "show"
      );

    },
    1700
  );

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

  return String(value)
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}


/* =========================================================
   STARTUP
   ========================================================= */

loadPassage();

renderHistory();

timerEl.textContent =
  selectedTime;

progressBar.style.width =
  "100%";
