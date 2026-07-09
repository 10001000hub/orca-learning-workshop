# game/engine

lesson → quiz → workshop → done の進行ロジックを担当するモジュール（`engine.js`）。

## 責務

- `content-loader`が読み込んだ教材データを受け取り、`stage`（`lesson`/`quiz`/`workshop`/`done`）と進行位置（`quizIndex`/`workshopStepIndex`）を管理する。
- quizの正誤判定（`answerQuiz`。1設問につき1回のみ採点し、以後は上書きしない）と得点集計（`quizScore`）を行う。
- workshopの各stepの確認進行（`confirmWorkshopStep`）を管理する。
- 教材本文そのものは持たない（`content-loader`経由でcurriculumから受け取ったデータのみを扱う）。

## 現在の状態（試作v0）

lesson→quiz→workshop→doneの一連の状態遷移を実装済み。Node.js上でGH-001の実データを使い、Q1不正解→Q2正解→workshop2step確認→done、という流れをシミュレートして`stage`遷移とスコア集計が正しいことを確認済み（DOM/ブラウザには依存しないロジック単体の検証）。
