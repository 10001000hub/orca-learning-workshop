# Changelog

このプロジェクトの変更履歴を記録する。フォーマットは [Keep a Changelog](https://keepachangelog.com/) を参考にした簡易版。

## [Unreleased]

### Added

- プロジェクト初期構成（research / knowledge / curriculum / game / eval / templates / review / scripts / tests / assets）を作成。
- ドキュメント一式（README, ARCHITECTURE, CURRICULUM_GUIDE, EVAL_LOOP_GUIDE, LESSON_AUTHORING_GUIDE, VALIDATION_POLICY, ROADMAP）を作成。
- 教材テンプレート一式（lesson, facts, metadata, quiz, workshop, review, source-pack）を作成。
- eval-loop用のtasks / criteria / presetsを作成。
- 最初の教材サンプル `GH-001: GitHubとは何か` を research → knowledge → curriculum → review の各層に作成（`status: draft`）。
- 教材整合性検証スクリプト `scripts/validate-curriculum.ps1` を作成。
- `.github/` にIssue/PRテンプレートを作成。
- `game/`本体の試作v0を実装（GH-001固定・vanilla HTML/CSS/JS）。`content-loader.js`（curriculumファイルのfetch・簡易YAML/Markdown変換）、`engine.js`（lesson→quiz→workshop→doneの状態遷移・採点）、`ui/`（index.html/main.js/style.css、ライト/ダーク対応）。

### Fixed

- 自己レビューとCodex(gpt-5.5)による独立レビューの指摘を反映（2026-07-09）。
  - `workshop.json` step-2の`success_check`が主観的すぎた点を、観測可能なチェックリスト形式に修正。
  - `eval/presets/github-gh001.eval-loop.md`冒頭の実行例が「1つの巨大なeval-loopタスク」に読める文言だった点を、工程別実行を主導線にする形に修正。
  - `README.md`・`docs/ARCHITECTURE.md`の「ゲームUI本体は未実装」という記述が試作v0の実装後も残っていた点を現状に合わせて修正。
  - `scripts/validate-curriculum.ps1`に`lesson.md`の必須ファイルチェック、`os`のWindows限定チェック、`quiz.json`のanswer実在チェック、`workshop.json`のsuccess_check非空チェックを追加。追加時に見つかった正規表現バグ（`s`フラグの影響で`os:`ブロックの後続リストまで誤マッチしていた）も修正。
  - `scripts/README.md`の「実機で確認した」という誇張表現を、「未検証・一般に知られている挙動」に訂正。
  - `lesson.md`が`facts.md`の範囲を超えていた2箇所（Repositoryの語源「保管庫」の説明、クラウド=インストール不要の具体化）を削除。

### Notes

- GH-001の`confidence`・`verified_on`は未検証状態（`0` / `null`）のまま。実機確認が完了次第、次のイテレーションで更新する。
- 試作v0の`game/`は`content-loader`/`engine`をNode.js上で実データを使い動作検証済み。ブラウザでの実機確認中に相対パスの誤り（`../curriculum`→`../../curriculum`に修正）が見つかり修正したが、修正後にブラウザで最後まで通しで動くことの確認はまだ得ていない。GH-001固定で、テーマ・教材ID選択や`status`による読み込み制御は未実装。
