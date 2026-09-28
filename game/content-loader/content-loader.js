// curriculum/<theme>/<id>/ の教材ファイルをfetchで読み込み、ゲーム内部で扱える形に変換する。
// 教材本文はここでのみ取得し、engine/uiはこのモジュールが返すデータ経由でのみ教材に触れる。
const ContentLoader = (() => {
  // kind: "invalid-ref"（URLの教材指定が不正）/ "fetch"（ファイルを取得できない）/
  // "validation"（教材データが不正）。UIはkindに応じて案内を出し分ける。
  function loaderError(kind, message) {
    const err = new Error(message);
    err.kind = kind;
    return err;
  }

  // themeとIDはURLから来るため、curriculum/の外を指す値（../ や / を含む値）はfetch前に拒否する。
  const THEME_PATTERN = /^[a-z][a-z0-9-]{0,31}$/;
  const ID_PATTERN = /^[A-Z][A-Z0-9]{0,15}-\d{3}$/;

  function isSafeLessonRef(theme, id) {
    return typeof theme === "string" && typeof id === "string" &&
      THEME_PATTERN.test(theme) && ID_PATTERN.test(id);
  }

  function lessonBase(theme, id) {
    if (!isSafeLessonRef(theme, id)) {
      throw loaderError("invalid-ref", `教材の指定が正しくありません（theme: ${theme || "未指定"}, lesson: ${id || "未指定"}）`);
    }
    // index.htmlは game/ui/ にあるため、リポジトリ直下のcurriculum/へは2階層上がる。
    return `../../curriculum/${theme}/${id}`;
  }

  async function fetchText(path) {
    let res;
    try {
      res = await fetch(path);
    } catch (cause) {
      throw loaderError("fetch", `教材ファイルの読み込みに失敗しました: ${path} (${cause && cause.message ? cause.message : "通信エラー"})`);
    }
    if (!res.ok) {
      throw loaderError("fetch", `教材ファイルの読み込みに失敗しました: ${path} (HTTP ${res.status})`);
    }
    // Windowsでautocrlf=trueのままcloneするとCRLFになり、metadata.yamlの
    // 行頭アンカー正規表現(os/success_criteria)がマッチしなくなるため必ずLFに正規化する。
    return (await res.text()).replace(/\r\n/g, "\n");
  }

  async function fetchJson(path) {
    const text = await fetchText(path);
    try {
      return JSON.parse(text);
    } catch (cause) {
      throw loaderError("validation", `JSONとして読み込めません: ${path} (${cause.message})`);
    }
  }

  // metadata.yamlはトップレベルのkey: valueとkey:配下の "  - item" リストのみを持つ
  // 単純な構造なので、汎用YAMLパーサは使わず必要なフィールドだけ抽出する。
  function parseMetadataMinimal(yamlText) {
    yamlText = yamlText.replace(/\r\n?/g, "\n");
    const scalar = (key) => {
      const m = yamlText.match(new RegExp(`^${key}:[ \\t]*(.*)$`, "m"));
      if (!m) return null;
      const value = m[1].trim();
      return value === "" || value === "null" ? null : value.replace(/^["']|["']$/g, "");
    };
    const list = (key) => {
      const m = yamlText.match(new RegExp(`^${key}:\\n((?:^[ \\t]+-.*\\n?)+)`, "m"));
      if (!m) return [];
      return m[1]
        .split("\n")
        .filter((line) => line.trim().startsWith("-"))
        .map((line) => line.replace(/^[ \t]*-[ \t]*/, "").trim());
    };
    return {
      id: scalar("id"),
      title: scalar("title"),
      theme: scalar("theme"),
      status: scalar("status"),
      estimated_time: scalar("estimated_time"),
      learning_objective: scalar("learning_objective"),
      success_criteria: list("success_criteria"),
      os: list("os"),
    };
  }

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function inlineFormat(text) {
    return escapeHtml(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  }

  // lesson.mdは "# " "## " 見出し、"- " リスト、**太字** のみを使う運用なので、
  // 汎用Markdownライブラリは使わずこの範囲だけを素朴に変換する。
  function renderLessonMarkdown(markdown) {
    const lines = markdown.split("\n");
    let html = "";
    let inList = false;
    const closeListIfOpen = () => {
      if (inList) {
        html += "</ul>";
        inList = false;
      }
    };
    for (const rawLine of lines) {
      const line = rawLine.trimEnd();
      if (line.startsWith("## ")) {
        closeListIfOpen();
        html += `<h3>${inlineFormat(line.slice(3))}</h3>`;
      } else if (line.startsWith("# ")) {
        closeListIfOpen();
        html += `<h2>${inlineFormat(line.slice(2))}</h2>`;
      } else if (line.startsWith("- ")) {
        if (!inList) {
          html += "<ul>";
          inList = true;
        }
        html += `<li>${inlineFormat(line.slice(2))}</li>`;
      } else if (line.trim() === "") {
        closeListIfOpen();
      } else {
        closeListIfOpen();
        html += `<p>${inlineFormat(line)}</p>`;
      }
    }
    closeListIfOpen();
    return html;
  }

  function validateContent(content, expectedId) {
    const errors = [];
    const { metadata, quiz, workshop } = content;
    if (!metadata.id) errors.push("metadata.yaml の id が空です");
    if (!metadata.title) errors.push("metadata.yaml の title が空です");
    if (expectedId && metadata.id !== expectedId) {
      errors.push(`教材IDが一致しません（要求: ${expectedId}, metadata: ${metadata.id || "未設定"}）`);
    }
    if (!metadata.status) errors.push("metadata.yaml の status が空です");
    if (!metadata.learning_objective) errors.push("metadata.yaml の learning_objective が空です");
    if (!Array.isArray(metadata.success_criteria) || metadata.success_criteria.length === 0) {
      errors.push("metadata.yaml の success_criteria が空です");
    }
    if (!quiz || quiz.lesson_id !== metadata.id) errors.push("quiz.json の lesson_id が教材IDと一致しません");
    if (!quiz || !Array.isArray(quiz.questions) || quiz.questions.length === 0) {
      errors.push("quiz.json に問題がありません");
    } else {
      quiz.questions.forEach((question, index) => {
        const choices = Array.isArray(question.choices) ? question.choices : [];
        if (!question.id) errors.push(`quiz.json の問題 ${index + 1} に id がありません`);
        if (!question.question) errors.push(`quiz.json の ${question.id || `問題 ${index + 1}`} に question がありません`);
        if (!choices.some((choice) => choice.id === question.answer)) {
          errors.push(`quiz.json の ${question.id || `問題 ${index + 1}`} の正答が choices にありません`);
        }
      });
    }
    if (!workshop || workshop.lesson_id !== metadata.id) {
      errors.push("workshop.json の lesson_id が教材IDと一致しません");
    }
    if (!workshop || !Array.isArray(workshop.steps) || workshop.steps.length === 0) {
      errors.push("workshop.json に手順がありません");
    }
    if (errors.length > 0) throw loaderError("validation", `教材データが不正です:\n- ${errors.join("\n- ")}`);
    return content;
  }

  // コース一覧で公開状態を表示するため、metadata.yamlだけを読む。
  async function loadMetadata(theme, id) {
    const base = lessonBase(theme, id);
    return parseMetadataMinimal(await fetchText(`${base}/metadata.yaml`));
  }

  async function loadLesson(theme, id) {
    const base = lessonBase(theme, id);
    const [metadataText, lessonText, quiz, workshop] = await Promise.all([
      fetchText(`${base}/metadata.yaml`),
      fetchText(`${base}/lesson.md`),
      fetchJson(`${base}/quiz.json`),
      fetchJson(`${base}/workshop.json`),
    ]);
    return validateContent({
      metadata: parseMetadataMinimal(metadataText),
      lessonHtml: renderLessonMarkdown(lessonText),
      quiz,
      workshop,
    }, id);
  }

  return {
    isSafeLessonRef,
    loadLesson,
    loadMetadata,
    parseMetadataMinimal,
    renderLessonMarkdown,
    validateContent,
  };
})();

if (typeof module !== "undefined" && module.exports) module.exports = ContentLoader;
