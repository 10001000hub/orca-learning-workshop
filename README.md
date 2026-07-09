# AI Learning Workshop

Windows初心者・IT初心者・GitHub初心者・そしてこれからAI開発環境を学ぶ人のための、**実践型AI学習ゲーム教材基盤**です。

このプロジェクトは「完成したゲーム」ではありません。**教材データベースをゲームが読み込む教育プラットフォーム**を、長期運用できる状態で立ち上げるための基盤です。

## 目的

- PC・IT・GitHubの初心者が、実機に近い形で「触りながら学ぶ」教材を提供する。
- 教材そのものを、感覚や記憶ではなく一次資料（README・公式Docs・実機確認）に基づいて作成する。
- 教材とゲーム本体を分離し、教材だけを継続的に検証・改善できるようにする。
- eval-loopによる品質改善の仕組みを、教材制作の検査ラインとして組み込む。

## なぜWindows専用から始めるか

対象ユーザーは Windows PC を使う初心者を想定している。OSごとにUI・操作手順・ボタン名は異なり、これを最初からマルチOS対応にすると「未検証のまま断定した手順」が混入するリスクが上がる。まずは Windows 環境に限定して、実機確認済みの正確な教材を作ることを優先する。Mac対応は現時点では行わない。

## 教材とゲームを分離する設計

教材本文（事実・レッスン・クイズ・実習手順）は `curriculum/` 配下のデータとして持ち、`game/` はそのデータを**読み込んで表示するだけ**にする。ゲーム側のコードに教材文言を直接埋め込まない。これにより、教材の追加・修正がゲーム本体の実装に影響を与えず、教材の検証（eval-loop）とゲーム開発を独立して進められる。

## 4層構造：research → knowledge → curriculum → game

```text
research/
    ↓
knowledge/
    ↓
curriculum/
    ↓
game/
```

| 層 | 役割 |
| --- | --- |
| `research/` | 一次資料・README・公式Docs・リリースノート・実機確認メモを保存する場所。 |
| `knowledge/` | research から抽出した「事実」だけを保存する場所。推測・感想・教材表現は禁止。 |
| `curriculum/` | facts を元に作成した教材。lesson / quiz / workshop / metadata / references を持つ。 |
| `game/` | curriculum を読み込んで表示するゲーム本体。教材本文を直接埋め込まない。 |

詳細は [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) を参照。

## eval-loopを使う理由

教材は一発生成して終わりにできない。初心者向け教材は「事実として正しいか」「初心者が迷わないか」「Windows実機と食い違わないか」を継続的に検査する必要がある。このプロジェクトでは eval-loop を「教材を一発生成する仕組み」ではなく、**教材品質を閾値まで改善する検査ライン**として使う。工程ごと（Research / Facts / Lesson / Quiz / Workshop / Beginner QA / Final Pack）に分けて評価し、Veto条件に該当する教材は問答無用で不合格にする。詳細は [docs/EVAL_LOOP_GUIDE.md](docs/EVAL_LOOP_GUIDE.md) を参照。

## GitHub教材から開始する

最初の教材テーマは **GitHub** とする。GitHubはこのプロジェクトが将来扱う「AI開発環境」の入り口であり、かつIT初心者がつまずきやすい概念（リポジトリ、コミット、コラボレーション）を含むため、最初の題材として適している。最初の教材IDは **GH-001（GitHubとは何か）** である。

## 古いUI情報・未検証のボタン名を教材に入れないルール

教材に書いてよいのは、次のいずれかで裏付けられた内容だけである。

- 公式ドキュメント・公式README
- 実際に確認した画面・操作（実機確認メモとして `research/` に残す）

裏付けのないボタン名・メニュー名・操作手順を教材に書くことは禁止する。UIは頻繁に変わるため、「見たことがある気がする」という記憶だけで教材を書いてはならない。詳細なルールは [docs/VALIDATION_POLICY.md](docs/VALIDATION_POLICY.md) を参照。

## ディレクトリ構成

```text
AI-Learning-Workshop/
├── docs/              # 設計・運用ドキュメント
├── research/          # 一次資料
├── knowledge/         # 事実(facts)
├── curriculum/        # 教材本体
├── game/              # ゲーム本体（教材を読み込むだけ）
├── eval/              # eval-loop用のtasks/criteria/presets
├── templates/         # 教材ファイルのひな形
├── review/            # 初心者レビュー記録
├── scripts/           # 検証スクリプト
├── tests/             # テスト
└── assets/            # 画像等アセット
```

## 現在の状態

- 初期テーマ: GitHub
- 最初の教材: `GH-001`（GitHubとは何か）
- ステータス: 構成・テンプレート・運用設計・GH-001サンプルまで実装済み（`status: draft`）。ゲームUI本体は未実装（READMEのみ）。
