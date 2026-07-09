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

## 現在の状態（試作v0）

GH-001固定の一本道フローとして最小実装した。`content-loader`/`engine`はNode.js上で実データを使い動作確認済み。`ui`はブラウザでの目視確認も完了（2026-07-09。起動方法は[ui/README.md](ui/README.md)を参照）。テーマ・教材IDの選択UI、`status`による読み込み制御、複数教材対応は未実装（[docs/ROADMAP.md](../docs/ROADMAP.md)フェーズ2以降）。
