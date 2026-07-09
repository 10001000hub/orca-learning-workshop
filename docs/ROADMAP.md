# ROADMAP

## フェーズ0（今回）：基盤構築

- [x] プロジェクト構成（research / knowledge / curriculum / game / eval / templates / review / scripts / tests / assets）
- [x] README / docs一式
- [x] templates一式
- [x] eval criteria / tasks / preset（GitHub GH-001向け）
- [x] GH-001サンプル教材（research → knowledge → curriculum → review）
- [x] `scripts/validate-curriculum.ps1`
- [ ] GH-001の`eval-loop`実行による品質改善（本フェーズでは設計のみ。実行は次フェーズ）
- [ ] GH-001の実機確認（`verification.md`の実施と`confidence`/`verified_on`の更新）

## フェーズ1：GitHubテーマの拡充

- GitHubテーマの教材を`GH-002`以降へ拡張（例: リポジトリを見る、Issueを読む、など概念〜軽量実習レベル）
- `/run-eval-loop-fork` を使い、各教材を工程ごとに品質改善する運用を実際に回す
- `scripts/validate-curriculum.ps1` をCIまたは手動フローに組み込む

## フェーズ2：ゲーム本体の実装開始

- `game/content-loader` にcurriculumの読み込み処理を実装
- `game/engine` にlesson→quiz→workshopの進行ロジックを実装
- `game/ui` に最小限の表示画面を実装
- この段階でもゲーム側に教材本文を直接埋め込まない設計を維持する

## フェーズ3：複数教材の安定運用

- 複数教材が安定してeval-loopの基準を満たすようになった段階で `/run-eval-loop-parallel` へ移行
- テーマをGitHub以外（例: Windows基本操作、ターミナル入門）へ拡張するか検討
- `tests/` にゲーム・content-loaderの自動テストを追加

## 非目標（当面やらないこと）

- Mac対応
- ゲームの本格的なグラフィック・演出実装
- 複数言語対応（当面は日本語のみ）
