// content-loaderとengineをつないで画面を描画する。教材文言はここに書かない。
const THEME = "github";
const LESSON_ID = "GH-001";

const appEl = document.getElementById("app");
let session = null;

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderProgress(activeIndex) {
  const stages = ["Lesson", "Quiz", "Workshop", "Done"];
  return `<div class="progress">${stages
    .map(
      (name, i) => `
        <div class="progress-step${i <= activeIndex ? " active" : ""}">
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
  appEl.innerHTML = `
    <div class="card">
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
      </div>
    </div>
  `;
  document.getElementById("restart").addEventListener("click", () => {
    session = GameEngine.createSession(session.content);
    render();
  });
}

function render() {
  if (session.stage === "lesson") renderLessonStage();
  else if (session.stage === "quiz") renderQuizStage();
  else if (session.stage === "workshop") renderWorkshopStage();
  else renderDoneStage();
}

function renderError(err) {
  appEl.innerHTML = `
    <div class="card">
      <div class="stage-label">読み込みエラー</div>
      <p class="error">${escapeHtml(err.message)}</p>
      <p>ローカルサーバー経由（Windows: <code>py -m http.server</code> / WSL・Linux: <code>python3 -m http.server</code>）で <code>game/ui/index.html</code> を開いているか確認してください。<code>file://</code> で直接開くと教材ファイルの読み込みがブラウザにブロックされます。</p>
    </div>
  `;
}

async function main() {
  try {
    const content = await ContentLoader.loadLesson(THEME, LESSON_ID);
    const allowDraft = new URLSearchParams(window.location.search).get("allowDraft") === "1";
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
