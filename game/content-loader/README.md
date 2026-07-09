# game/content-loader

`curriculum/<theme>/<ID>/` の教材ファイル（`metadata.yaml` / `lesson.md` / `quiz.json` / `workshop.json`）を読み込み、ゲーム内部で扱えるデータ構造に変換する予定のモジュール。

## 責務（予定）

- curriculum配下のファイルを読み込み、パース（YAML/JSON/Markdown）する。
- `status`が`published`の教材のみをゲームで利用可能にする、といった読み込み条件の適用（方針は今後確定）。
- 教材データの形式（`metadata.yaml`のスキーマなど）が変わった場合、変換ロジックをここに集約し、`engine`/`ui`側は変更の影響を受けないようにする。

## 現在の状態

未実装。[docs/ROADMAP.md](../../docs/ROADMAP.md) のフェーズ2で実装を開始する予定。
