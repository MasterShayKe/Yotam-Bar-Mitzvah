/* ============================================================
   🧠  מנוע החידון
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

  let current = 0;
  let correctCount = 0;
  const total = QUESTIONS.length;

  function updateTrack() {
    const pct = (current / total) * 100;
    trackFill.style.width = pct + "%";
    carIcon.style.left = `calc(${pct}% - 18px)`;
    scoreEl.textContent = `תחנה ${Math.min(current + 1, total)} מתוך ${total} · ✅ ${correctCount}`;
  }

  function renderQuestion() {
    const q = QUESTIONS[current];
    feedbackEl.textContent = "";
    feedbackEl.className = "feedback";
    hintText.textContent = "";
    hintText.classList.remove("show");
    hintBtn.disabled = false;
    stageEl.classList.remove("fade");
    void stageEl.offsetWidth; // לאתחל אנימציה
    stageEl.classList.add("fade");

    promptEl.textContent = q.prompt;

    // לוגו
    if (q.type === "logo" && LOGOS[q.logo]) {
      logoEl.innerHTML = LOGOS[q.logo];
      logoEl.style.display = "flex";
    } else {
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
  }

  function handleAnswer(index, btn) {
    const q = QUESTIONS[current];
    const buttons = [...optionsEl.querySelectorAll(".option")];

    if (index === q.answer) {
      btn.classList.add("correct");
      buttons.forEach((b) => (b.disabled = true));
      correctCount++;
      feedbackEl.textContent = randomCheer();
      feedbackEl.classList.add("good");
      burst();
      setTimeout(next, 1100);
    } else {
      btn.classList.add("wrong");
      btn.disabled = true;
      feedbackEl.textContent = "אופס! נסה שוב — אתה לא נפסל 💪";
      feedbackEl.classList.add("bad");
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
    // שומרים תוצאה כדי שדף הכרטיס ידע אם עברת
    const passed = correctCount >= CONFIG.questionsToWin;
    try {
      localStorage.setItem("quizPassed", passed ? "1" : "0");
      localStorage.setItem("quizScore", String(correctCount));
    } catch (e) {}

    if (passed) {
      window.location.href = "ticket.html";
    } else {
      // לא הגיע לרף — מציעים לנסות שוב
      stageEl.innerHTML = `
        <h2 class="near">כמעט! 🏎️</h2>
        <p>צברת ${correctCount} תשובות נכונות מתוך ${total}.</p>
        <p>צריך לפחות ${CONFIG.questionsToWin} כדי לקבל את הכרטיס.</p>
        <button class="btn big" onclick="location.reload()">🔁 לרוץ שוב מההתחלה</button>
      `;
    }
  }

  // אפקטים קטנים
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
