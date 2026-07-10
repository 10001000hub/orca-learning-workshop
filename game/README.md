# Game

`curriculum/` を読み込んで表示するゲーム本体。

## 設計原則

- ゲーム本体のコードに教材本文（lesson文・クイズ文言・実習手順）を直接埋め込まない。
- 教材は必ず `curriculum/<theme>/<ID>/` からロードする。
- ゲームが変わっても教材は変わらず、教材が変わってもゲームの再実装は不要、という独立性を保つ。

## 構成

- `engine/`: lesson → quiz → workshop → done の進行ロジック。詳細は [engine/README.md](engine/README.md)。
- `ui/`: 画面表示（vanilla HTML/CSS/JS）。詳細は [ui/README.md](ui/README.md)。
- `content-loader/`: curriculumのYAML/JSON/Markdownを読み込み、ゲーム内部のデータ構造に変換する処理。詳細は [content-loader/README.md](content-loader/README.md)。

## 現在の状態

ORCA-001〜005のコース一覧と一本道フローを実装している。`content-loader`/`engine`はNode.js標準テストで継続検証する。完了状態はブラウザのlocalStorageへ保存する。`status: published`以外はUIが既定で拒否し、レビュー用リンクだけ明示的に許可する。
