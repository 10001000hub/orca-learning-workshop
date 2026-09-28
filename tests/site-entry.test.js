// GitHub Pagesは https://<user>.github.io/orca-learning-workshop/ のようなサブパスで配信される。
// 先頭が "/" の参照はサブパスを外れて404になるため、入口と画面の参照が相対パスで実在することを確認する。
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");

const ROOT = path.join(__dirname, "..");

function localRefs(html) {
  const refs = [];
  for (const m of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) refs.push(m[1]);
  const refresh = html.match(/http-equiv="refresh"\s+content="[^"]*url=([^"]+)"/);
  if (refresh) refs.push(refresh[1]);
  return refs.filter((ref) => !/^[a-z]+:/i.test(ref) && !ref.startsWith("#"));
}

test("ルートindex.htmlはサブパス配下でも学習画面へ移動できる", async () => {
  const html = await fs.readFile(path.join(ROOT, "index.html"), "utf8");
  const refs = localRefs(html);
  assert.ok(refs.includes("game/ui/index.html"));
  for (const ref of refs) {
    assert.ok(!ref.startsWith("/"), `絶対パス参照: ${ref}`);
    await fs.access(path.join(ROOT, ref.split("?")[0]));
  }
});

test("学習画面が読み込むスクリプトとスタイルは相対パスで実在する", async () => {
  const dir = path.join(ROOT, "game", "ui");
  const html = await fs.readFile(path.join(dir, "index.html"), "utf8");
  const refs = localRefs(html);
  assert.ok(refs.length >= 4);
  for (const ref of refs) {
    assert.ok(!ref.startsWith("/"), `絶対パス参照: ${ref}`);
    await fs.access(path.join(dir, ref));
  }
  // lesson-status.jsはmain.jsより先に読み込む必要がある
  assert.ok(refs.indexOf("lesson-status.js") >= 0 && refs.indexOf("lesson-status.js") < refs.indexOf("main.js"));
});

test("コース一覧の教材IDはすべてcurriculumに存在する", async () => {
  const mainJs = await fs.readFile(path.join(ROOT, "game", "ui", "main.js"), "utf8");
  const ids = [...mainJs.matchAll(/id: "(ORCA-\d{3})"/g)].map((m) => m[1]);
  assert.ok(ids.length >= 5);
  for (const id of ids) {
    await fs.access(path.join(ROOT, "curriculum", "orca", id, "metadata.yaml"));
  }
});
