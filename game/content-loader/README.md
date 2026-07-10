# game/content-loader

`curriculum/<theme>/<ID>/` の教材ファイル（`metadata.yaml` / `lesson.md` / `quiz.json` / `workshop.json`）を読み込み、ゲーム内部で扱えるデータ構造に変換するモジュール。

## 責務

- curriculum配下のファイルを`fetch`で読み込み、パースする（`content-loader.js`）。
- `metadata.yaml`はキー:値と単純なリストのみを持つ運用のため、汎用YAMLパーサではなく必要フィールドのみを正規表現で抽出する簡易パーサにしている。
- `lesson.md`は見出し（`#`/`##`）・リスト（`- `）・太字（`**`）のみを使う運用のため、汎用Markdownライブラリではなくこの範囲だけを変換する簡易レンダラーにしている。
- 教材データの形式が変わった場合、変換ロジックをここに集約し、`engine`/`ui`側は変更の影響を受けないようにする。

## 現在の状態（試作v0）

`ContentLoader.loadLesson(theme, id)` を実装済み。GH-001を対象に、Node.jsの`vm`モジュール上でサーバー経由の実データを読み込む検証を行い、metadataのパース・lessonのHTML変換・quiz/workshopのJSON読み込みが正しく動作することを確認済み。

読み込み後に必須項目、教材ID、クイズ正答、実習手順の構造整合性を検証する。公開可否の判断は表示ポリシーであるためUI層が担当し、`published`以外は既定で拒否する。
