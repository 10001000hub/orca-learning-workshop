const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");

const ContentLoader = require("../game/content-loader/content-loader.js");
const GameEngine = require("../game/engine/engine.js");

function contentFixture() {
  return {
    metadata: {
      id: "T-001",
      title: "テスト教材",
      status: "draft",
      learning_objective: "動作を確認できる",
      success_criteria: ["完了できる"],
    },
    lessonHtml: "<h2>テスト</h2>",
    quiz: {
      lesson_id: "T-001",
      questions: [
        {
          id: "Q1",
          question: "正解は？",
          choices: [{ id: "A", text: "正解" }, { id: "B", text: "不正解" }],
          answer: "A",
        },
      ],
    },
    workshop: {
      lesson_id: "T-001",
      steps: [{ id: "S1", instruction: "確認する", success_check: "確認済み", hint: "" }],
    },
  };
}

test("metadataはCRLFと引用符を扱える", () => {
  const parsed = ContentLoader.parseMetadataMinimal(
    'id: "T-001"\r\ntitle: テスト\r\nstatus: draft\r\nsuccess_criteria:\r\n  - 完了できる\r\n'
  );
  assert.equal(parsed.id, "T-001");
  assert.deepEqual(parsed.success_criteria, ["完了できる"]);
});

test("MarkdownはHTMLをエスケープし許可した書式だけ変換する", () => {
  const html = ContentLoader.renderLessonMarkdown("# 見出し\n<script>alert(1)</script>\n- **項目**");
  assert.match(html, /<h2>見出し<\/h2>/);
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /<li><strong>項目<\/strong><\/li>/);
});

test("教材IDの不整合を読み込み前に検出する", () => {
  const content = contentFixture();
  content.quiz.lesson_id = "OTHER";
  assert.throws(() => ContentLoader.validateContent(content, "T-001"), /quiz\.json の lesson_id/);
});

test("lessonからdoneまで進行し採点を保持する", () => {
  const session = GameEngine.createSession(contentFixture());
  GameEngine.startQuiz(session);
  const first = GameEngine.answerQuiz(session, "A");
  assert.equal(first.correct, true);
  assert.equal(GameEngine.answerQuiz(session, "B"), first);
  GameEngine.nextQuiz(session);
  assert.equal(session.stage, "workshop");
  GameEngine.confirmWorkshopStep(session);
  assert.equal(session.stage, "done");
  assert.deepEqual(GameEngine.quizScore(session), { correct: 1, total: 1 });
});

test("存在しない選択肢を拒否する", () => {
  const session = GameEngine.createSession(contentFixture());
  GameEngine.startQuiz(session);
  assert.throws(() => GameEngine.answerQuiz(session, "X"), /存在しません/);
});

test("実際のGH-001教材を読み込み、構造を検証できる", async (t) => {
  const originalFetch = global.fetch;
  global.fetch = async (resource) => {
    const relativePath = String(resource).replace(/^\.\.\/\.\.\//, "");
    try {
      const body = await fs.readFile(path.join(__dirname, "..", relativePath), "utf8");
      return { ok: true, status: 200, text: async () => body };
    } catch {
      return { ok: false, status: 404, text: async () => "" };
    }
  };
  t.after(() => { global.fetch = originalFetch; });

  const content = await ContentLoader.loadLesson("github", "GH-001");
  assert.equal(content.metadata.id, "GH-001");
  assert.equal(content.quiz.questions.length, 2);
  assert.equal(content.workshop.steps.length, 2);
});

test("メイン教材ORCA-001を読み込み、構造を検証できる", async (t) => {
  const originalFetch = global.fetch;
  global.fetch = async (resource) => {
    const relativePath = String(resource).replace(/^\.\.\/\.\.\//, "");
    try {
      const body = await fs.readFile(path.join(__dirname, "..", relativePath), "utf8");
      return { ok: true, status: 200, text: async () => body };
    } catch {
      return { ok: false, status: 404, text: async () => "" };
    }
  };
  t.after(() => { global.fetch = originalFetch; });

  const content = await ContentLoader.loadLesson("orca", "ORCA-001");
  assert.equal(content.metadata.id, "ORCA-001");
  assert.equal(content.metadata.os[0], "Windows");
  assert.equal(content.quiz.questions.length, 2);
  assert.equal(content.workshop.steps.length, 3);
});
