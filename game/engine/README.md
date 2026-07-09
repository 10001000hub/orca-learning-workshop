# game/engine

lesson → quiz → workshop の進行ロジックを担当する予定のモジュール。

## 責務（予定）

- `content-loader`が読み込んだ教材データを受け取り、進行状態（どのlessonの、どのquizまで進んだか）を管理する。
- quizの正誤判定、workshopの`success_check`の進行管理を行う。
- 教材本文そのものは持たない（`content-loader`経由でcurriculumから受け取ったデータのみを扱う）。

## 現在の状態

未実装。[docs/ROADMAP.md](../../docs/ROADMAP.md) のフェーズ2で実装を開始する予定。
