const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");

const ContentLoader = require("../game/content-loader/content-loader.js");
const LessonStatus = require("../game/ui/lesson-status.js");

const ROOT = path.join(__dirname, "..");

function withRepoFetch(t) {
  const originalFetch = global.fetch;
  const requested = [];
  global.fetch = async (resource) => {
    requested.push(String(resource));
    const relativePath = String(resource).replace(/^\.\.\/\.\.\//, "");
    try {
      const body = await fs.readFile(path.join(ROOT, relativePath), "utf8");
      return { ok: true, status: 200, text: async () => body };
    } catch {
      return { ok: false, status: 404, text: async () => "" };
    }
  };
  t.after(() => { global.fetch = originalFetch; });
  return requested;
}

function validContent() {
  return {
    metadata: {
      id: "T-001",
      title: "テスト教材",
      status: "draft",
      learning_objective: "動作を確認できる",
      success_criteria: ["完了できる"],
    },
    lessonHtml: "",
    quiz: {
      lesson_id: "T-001",
      questions: [{ id: "Q1", question: "正解は？", choices: [{ id: "A", text: "正解" }], answer: "A" }],
    },
    workshop: { lesson_id: "T-001", steps: [{ id: "S1", instruction: "確認する", success_check: "確認済み" }] },
  };
}

test("教材の外を指すthemeやIDはfetchする前に拒否する", async (t) => {
  const requested = withRepoFetch(t);
  const badRefs = [
    ["..", "README.md"],
    ["../..", "README.md?"],
    ["orca", "../ORCA-001"],
    ["orca", "ORCA-001/../../x"],
    ["orca", "https://example.com/x"],
    ["orca", ""],
    ["", "ORCA-001"],
  ];
  for (const [theme, id] of badRefs) {
    await assert.rejects(ContentLoader.loadLesson(theme, id), (err) => err.kind === "invalid-ref");
    await assert.rejects(ContentLoader.loadMetadata(theme, id), (err) => err.kind === "invalid-ref");
  }
  assert.deepEqual(requested, []);
});

test("存在しない教材は読み込みエラーとして区別できる", async (t) => {
  withRepoFetch(t);
  await assert.rejects(ContentLoader.loadLesson("orca", "ORCA-999"), (err) => err.kind === "fetch");
});

test("教材データの不正はvalidationエラーとして区別できる", () => {
  const content = validContent();
  content.quiz.questions[0].answer = "Z";
  assert.throws(() => ContentLoader.validateContent(content, "T-001"), (err) =>
    err.kind === "validation" && /正答が choices にありません/.test(err.message));

  const noTitle = validContent();
  noTitle.metadata.title = null;
  assert.throws(() => ContentLoader.validateContent(noTitle, "T-001"), /title が空です/);

  const noSteps = validContent();
  noSteps.workshop.steps = [];
  assert.throws(() => ContentLoader.validateContent(noSteps, "T-001"), /手順がありません/);
});

test("コース一覧用にmetadataだけを読み込める", async (t) => {
  const requested = withRepoFetch(t);
  const metadata = await ContentLoader.loadMetadata("orca", "ORCA-001");
  assert.equal(metadata.id, "ORCA-001");
  assert.ok(metadata.status);
  assert.deepEqual(requested, ["../../curriculum/orca/ORCA-001/metadata.yaml"]);
});

test("published以外の教材は公開済みとして表示しない", () => {
  assert.equal(LessonStatus.describe("published").isPublished, true);
  for (const status of ["draft", "review", "", null, undefined, "Published", "published "]) {
    const described = LessonStatus.describe(status);
    assert.equal(described.isPublished, false, `status=${JSON.stringify(status)}`);
    assert.ok(described.label.length > 0);
    assert.ok(described.notice.length > 0);
  }
});

test("教材のstatusは既知の値だけを使う", async () => {
  const themes = await fs.readdir(path.join(ROOT, "curriculum"));
  let count = 0;
  for (const theme of themes) {
    for (const id of await fs.readdir(path.join(ROOT, "curriculum", theme))) {
      const text = await fs.readFile(path.join(ROOT, "curriculum", theme, id, "metadata.yaml"), "utf8");
      const metadata = ContentLoader.parseMetadataMinimal(text);
      assert.ok(LessonStatus.KNOWN_STATUSES.includes(metadata.status), `${id}: ${metadata.status}`);
      assert.ok(ContentLoader.isSafeLessonRef(theme, id), `${theme}/${id}`);
      count += 1;
    }
  }
  assert.ok(count >= 6);
});
