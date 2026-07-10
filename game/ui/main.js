// content-loaderとengineをつないで画面を描画する。教材文言はここに書かない。
const params = new URLSearchParams(window.location.search);
const COURSES = [
  { id: "ORCA-001", title: "OrcaとCodexで学習を始める", time: "10分" },
  { id: "ORCA-002", title: "Codexと最初のWebページを作る", time: "15分" },
  { id: "ORCA-003", title: "Gitで作品の変更履歴を残す", time: "15分" },
  { id: "ORCA-004", title: "GitHubへ作品を送る", time: "20分" },
  { id: "ORCA-005", title: "Web作品をURLで公開する", time: "20分" },
];
const THEME = params.get("theme") || "orca";
const LESSON_ID = params.get("lesson");
const STORAGE_KEY = "orca-learning-workshop-progress-v1";

const appEl = document.getElementById("app");
let session = null;

function completedLessons() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function markCompleted(id) {
  const completed = completedLessons();
  if (!completed.includes(id)) {
    completed.push(id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  }
}

function lessonUrl(id) {
  return `?theme=orca&lesson=${encodeURIComponent(id)}&allowDraft=1`;
}

function renderCourseCatalog() {
  const completed = completedLessons();
  appEl.setAttribute("aria-busy", "false");
  appEl.innerHTML = `
    <div class="hero"><div class="stage-label">Windows専用・体験型コース</div>
      <h1>Orca Learning Workshop</h1>
      <p>左で学び、右のOrcaで試しながら、最初のWeb作品を公開します。</p>
    </div>
    <ol class="course-list">${COURSES.map((course, index) => {
      const done = completed.includes(course.id);
      return `<li class="course-card${done ? " completed" : ""}"><a href="${lessonUrl(course.id)}">
        <span class="course-number">${index + 1}</span>
        <span class="course-info"><strong>${escapeHtml(course.title)}</strong><small>${escapeHtml(course.id)}・約${escapeHtml(course.time)}</small></span>
        <span class="course-status">${done ? "完了 ✓" : "開始 →"}</span>
      </a></li>`;
    }).join("")}</ol>`;
}

function renderCourseHeader() {
  return `<nav class="course-nav" aria-label="コースナビゲーション"><a href="?">← コース一覧</a><span>${escapeHtml(LESSON_ID || "")}</span></nav>`;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderProgress(activeIndex) {
  const stages = ["Lesson", "Quiz", "Workshop", "Done"];
  return `<div class="progress" aria-label="学習の進み具合">${stages
    .map(
      (name, i) => `
        <div class="progress-step${i <= activeIndex ? " active" : ""}"${i === activeIndex ? ' aria-current="step"' : ""}>
          <div class="progress-bar"></div>
          <div class="progress-label">${name}</div>
        </div>`
    )
    .join("")}</div>`;
}

function renderLessonStage() {
  const { metadata, lessonHtml } = session.content;
  appEl.innerHTML = `
    <div class="card">
      ${renderCourseHeader()}
      ${renderProgress(0)}
      <div class="stage-label">Lesson・${escapeHtml(metadata.id || "")}</div>
      ${lessonHtml}
      <div class="actions">
        <button id="to-quiz">クイズに進む</button>
      </div>
    </div>
  `;
  document.getElementById("to-quiz").addEventListener("click", () => {
    GameEngine.startQuiz(session);
    render();
  });
}

function renderQuizStage() {
  const question = GameEngine.currentQuizQuestion(session);
  const total = session.content.quiz.questions.length;
  const existing = session.quizResults.find((r) => r.questionId === question.id);

  const choicesHtml = question.choices
    .map((choice) => {
      let cls = "";
      if (existing) {
        if (choice.id === question.answer) cls = "correct";
        else if (choice.id === existing.chosen) cls = "incorrect";
      }
      return `
        <li class="choice-item">
          <button data-choice="${escapeHtml(choice.id)}" class="${cls}" ${existing ? "disabled" : ""}>
            ${escapeHtml(choice.id)}. ${escapeHtml(choice.text)}
          </button>
        </li>
      `;
    })
    .join("");

  appEl.innerHTML = `
    <div class="card">
      ${renderCourseHeader()}
      ${renderProgress(1)}
      <div class="stage-label">Quiz ${session.quizIndex + 1} / ${total}</div>
      <h2>${escapeHtml(question.question)}</h2>
      <ul class="choice-list">${choicesHtml}</ul>
      ${
        existing
          ? `<div class="explanation">${existing.correct ? "正解です。" : "不正解です。"} ${escapeHtml(question.explanation)}</div>
             <div class="actions"><button id="next-quiz">次へ</button></div>`
          : ""
      }
    </div>
  `;

  if (!existing) {
    appEl.querySelectorAll("button[data-choice]").forEach((btn) => {
      btn.addEventListener("click", () => {
        GameEngine.answerQuiz(session, btn.dataset.choice);
        renderQuizStage();
      });
    });
  } else {
    document.getElementById("next-quiz").addEventListener("click", () => {
      GameEngine.nextQuiz(session);
      render();
    });
  }
}

// workshopの手順には「レッスンを読み返す」指示が含まれるため、進行を保ったまま
// レッスン本文を再表示できる導線を用意する(UI層のみの状態でengineには持たせない)。
let lessonReviewOpen = false;

function renderWorkshopStage() {
  const step = GameEngine.currentWorkshopStep(session);
  const total = session.content.workshop.steps.length;
  appEl.innerHTML = `
    <div class="card">
      ${renderCourseHeader()}
      ${renderProgress(2)}
      <div class="stage-label">Workshop ${session.workshopStepIndex + 1} / ${total}</div>
      <h2>${escapeHtml(step.instruction)}</h2>
      <p>${escapeHtml(step.success_check)}</p>
      <div class="hint">ヒント: ${escapeHtml(step.hint)}</div>
      <div class="actions">
        <button id="toggle-lesson" class="secondary">${lessonReviewOpen ? "レッスンを閉じる" : "レッスンを読み返す"}</button>
        <button id="confirm-step">確認しました</button>
      </div>
    </div>
    ${
      lessonReviewOpen
        ? `<div class="card lesson-review">
             <div class="stage-label">レッスンの読み返し</div>
             ${session.content.lessonHtml}
           </div>`
        : ""
    }
  `;
  document.getElementById("toggle-lesson").addEventListener("click", () => {
    lessonReviewOpen = !lessonReviewOpen;
    renderWorkshopStage();
  });
  document.getElementById("confirm-step").addEventListener("click", () => {
    lessonReviewOpen = false;
    GameEngine.confirmWorkshopStep(session);
    render();
  });
}

function renderDoneStage() {
  const { metadata } = session.content;
  const { correct, total } = GameEngine.quizScore(session);
  markCompleted(metadata.id);
  const courseIndex = COURSES.findIndex((course) => course.id === metadata.id);
  const nextCourse = courseIndex >= 0 ? COURSES[courseIndex + 1] : null;
  appEl.innerHTML = `
    <div class="card">
      ${renderCourseHeader()}
      ${renderProgress(3)}
      <div class="stage-label">Done</div>
      <h2>${escapeHtml(metadata.title || "")} を完了しました</h2>
      <div class="score-line">クイズ正答: ${correct} / ${total}</div>
      <p><strong>学習目標:</strong> ${escapeHtml(metadata.learning_objective || "")}</p>
      <ul class="criteria-list">
        ${metadata.success_criteria.map((c) => `<li>${escapeHtml(c)}</li>`).join("")}
      </ul>
      <div class="actions">
        <button id="restart" class="secondary">最初からやり直す</button>
        ${nextCourse ? `<a class="button-link" href="${lessonUrl(nextCourse.id)}">次のレッスンへ</a>` : `<a class="button-link" href="?">コース一覧へ</a>`}
      </div>
    </div>
  `;
  document.getElementById("restart").addEventListener("click", () => {
    session = GameEngine.createSession(session.content);
    render();
  });
}

function render() {
  appEl.setAttribute("aria-busy", "false");
  if (session.stage === "lesson") renderLessonStage();
  else if (session.stage === "quiz") renderQuizStage();
  else if (session.stage === "workshop") renderWorkshopStage();
  else renderDoneStage();
}

function renderError(err) {
  appEl.setAttribute("aria-busy", "false");
  appEl.innerHTML = `
    <div class="card">
      <div class="stage-label">読み込みエラー</div>
      <p class="error" role="alert">${escapeHtml(err.message)}</p>
      <p>ローカルサーバー経由（Windows: <code>py -m http.server</code> / WSL・Linux: <code>python3 -m http.server</code>）で <code>game/ui/index.html</code> を開いているか確認してください。<code>file://</code> で直接開くと教材ファイルの読み込みがブラウザにブロックされます。</p>
    </div>
  `;
}

async function main() {
  try {
    if (!LESSON_ID) {
      renderCourseCatalog();
      return;
    }
    const content = await ContentLoader.loadLesson(THEME, LESSON_ID);
    const allowDraft = params.get("allowDraft") === "1";
    if (content.metadata.status !== "published" && !allowDraft) {
      throw new Error(
        `この教材は公開前です（status: ${content.metadata.status || "未設定"}）。` +
          "レビュー用に表示する場合はURLへ ?allowDraft=1 を付けてください。"
      );
    }
    session = GameEngine.createSession(content);
    render();
  } catch (err) {
    renderError(err);
  }
}

main();
