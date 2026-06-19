/* ============================================================
   🧠  מנוע החידון  (כולל טיימר לכל שאלה + אתגרי לוגו)
   ============================================================ */

(function () {
  // אלמנטים
  const stageEl = document.getElementById("stage");
  const promptEl = document.getElementById("prompt");
  const logoEl = document.getElementById("logo");
  const optionsEl = document.getElementById("options");
  const hintBtn = document.getElementById("hintBtn");
  const hintText = document.getElementById("hintText");
  const feedbackEl = document.getElementById("feedback");
  const trackFill = document.getElementById("trackFill");
  const carIcon = document.getElementById("carIcon");
  const scoreEl = document.getElementById("score");
  const timerBar = document.getElementById("timerBar");
  const timerNum = document.getElementById("timerNum");

  let current = 0;
  let correctCount = 0;
  const total = QUESTIONS.length;

  const SECONDS = (CONFIG.secondsPerQuestion && CONFIG.secondsPerQuestion > 0)
    ? CONFIG.secondsPerQuestion : 20;

  let timeLeft = SECONDS;
  let timerId = null;
  let answered = false; // האם השאלה כבר נסגרה (נכון / נגמר הזמן)

  function updateTrack() {
    const pct = (current / total) * 100;
    trackFill.style.width = pct + "%";
    carIcon.style.left = `calc(${pct}% - 18px)`;
    scoreEl.textContent = `תחנה ${Math.min(current + 1, total)} מתוך ${total} · ✅ ${correctCount}`;
  }

  // ===== טיימר =====
  function startTimer() {
    clearInterval(timerId);
    timeLeft = SECONDS;
    renderTimer();
    timerId = setInterval(() => {
      timeLeft--;
      renderTimer();
      if (timeLeft <= 0) {
        clearInterval(timerId);
        timeUp();
      }
    }, 1000);
  }

  function stopTimer() { clearInterval(timerId); }

  function renderTimer() {
    const pct = Math.max(0, (timeLeft / SECONDS) * 100);
    timerBar.style.width = pct + "%";
    timerNum.textContent = "⏱️ " + Math.max(0, timeLeft);
    timerBar.classList.toggle("danger", timeLeft <= 5);
    timerNum.classList.toggle("danger", timeLeft <= 5);
  }

  function timeUp() {
    if (answered) return;
    answered = true;
    const q = QUESTIONS[current];
    const buttons = [...optionsEl.querySelectorAll(".option")];
    buttons.forEach((b, i) => {
      b.disabled = true;
      if (i === q.answer) b.classList.add("correct");
    });
    feedbackEl.textContent = "⏰ נגמר הזמן! התשובה מסומנת. ממשיכים...";
    feedbackEl.className = "feedback bad";
    setTimeout(next, 1500);
  }

  // ===== אתגרי לוגו =====
  function applyMode(mode) {
    logoEl.className = "logo"; // איפוס
    logoEl.style.removeProperty("--reveal");
    if (!mode || mode === "full") return;
    logoEl.classList.add("mode-" + mode);
    if (mode === "blur") {
      // משך ההתחדדות = משך הטיימר
      logoEl.style.setProperty("--reveal", SECONDS + "s");
    }
  }

  function renderQuestion() {
    const q = QUESTIONS[current];
    answered = false;
    feedbackEl.textContent = "";
    feedbackEl.className = "feedback";
    hintText.textContent = "";
    hintText.classList.remove("show");
    hintBtn.disabled = false;
    stageEl.classList.remove("fade");
    void stageEl.offsetWidth; // לאתחל אנימציה
    stageEl.classList.add("fade");

    promptEl.textContent = q.prompt;

    // לוגו + אתגר ויזואלי
    if (q.type === "logo" && LOGOS[q.logo]) {
      logoEl.style.display = "flex";
      applyMode(q.mode);
      logoEl.innerHTML = '<div class="logo-inner">' + LOGOS[q.logo] + "</div>";
    } else {
      logoEl.className = "logo";
      logoEl.innerHTML = "";
      logoEl.style.display = "none";
    }

    // תשובות
    optionsEl.innerHTML = "";
    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "option";
      btn.textContent = opt;
      btn.addEventListener("click", () => handleAnswer(i, btn));
      optionsEl.appendChild(btn);
    });

    updateTrack();
    startTimer();
  }

  function handleAnswer(index, btn) {
    if (answered) return;
    const q = QUESTIONS[current];
    const buttons = [...optionsEl.querySelectorAll(".option")];

    if (index === q.answer) {
      answered = true;
      stopTimer();
      btn.classList.add("correct");
      buttons.forEach((b) => (b.disabled = true));
      // חושפים את הלוגו המלא כפרס קטן
      logoEl.classList.add("revealed");
      correctCount++;
      feedbackEl.textContent = randomCheer();
      feedbackEl.className = "feedback good";
      burst();
      setTimeout(next, 1100);
    } else {
      btn.classList.add("wrong");
      btn.disabled = true;
      feedbackEl.textContent = "אופס! נסה שוב — מהר, הזמן רץ ⏱️";
      feedbackEl.className = "feedback bad";
    }
  }

  function next() {
    current++;
    if (current >= total) {
      finish();
    } else {
      renderQuestion();
    }
  }

  function finish() {
    stopTimer();
    const passed = correctCount >= CONFIG.questionsToWin;
    try {
      localStorage.setItem("quizPassed", passed ? "1" : "0");
      localStorage.setItem("quizScore", String(correctCount));
    } catch (e) {}

    if (passed) {
      window.location.href = "ticket.html";
    } else {
      stageEl.innerHTML = `
        <h2 class="near">כמעט! 🏎️</h2>
        <p>צברת ${correctCount} תשובות נכונות מתוך ${total}.</p>
        <p>צריך לפחות ${CONFIG.questionsToWin} כדי לקבל את הכרטיס.</p>
        <button class="btn big" onclick="location.reload()">🔁 לרוץ שוב מההתחלה</button>
      `;
      timerNum.textContent = "";
      timerBar.style.width = "0%";
    }
  }

  // ===== אפקטים =====
  function randomCheer() {
    const cheers = ["מצוין! 🔥", "נכון מאוד! 🏁", "אלוף! 💨", "מדויק! 🏆", "ממשיכים! 🚀"];
    return cheers[Math.floor(Math.random() * cheers.length)];
  }

  function burst() {
    const colors = ["#ffd700", "#ff4d4d", "#4dd2ff", "#6bff8f", "#fff"];
    for (let i = 0; i < 18; i++) {
      const p = document.createElement("span");
      p.className = "confetti";
      p.style.left = 50 + (Math.random() * 40 - 20) + "%";
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.animationDelay = Math.random() * 0.2 + "s";
      p.style.transform = `rotate(${Math.random() * 360}deg)`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1500);
    }
  }

  hintBtn.addEventListener("click", () => {
    const q = QUESTIONS[current];
    hintText.textContent = "💡 " + q.hint;
    hintText.classList.add("show");
    hintBtn.disabled = true;
  });

  // התחלה
  renderQuestion();
})();
