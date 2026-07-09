# Game

`curriculum/` を読み込んで表示するゲーム本体。

## 設計原則

- ゲーム本体のコードに教材本文（lesson文・クイズ文言・実習手順）を直接埋め込まない。
- 教材は必ず `curriculum/<theme>/<ID>/` からロードする。
- ゲームが変わっても教材は変わらず、教材が変わってもゲームの再実装は不要、という独立性を保つ。

## 構成

- `engine/`: lesson → quiz → workshop の進行ロジック（未実装。READMEのみ）。
- `ui/`: 画面表示（未実装。READMEのみ）。
- `content-loader/`: curriculumのYAML/JSON/Markdownを読み込み、ゲーム内部のデータ構造に変換する処理（未実装。READMEのみ）。

## 現在の状態

本バージョンでは実装を行っていない。まずは `research → knowledge → curriculum` の教材基盤とeval-loop運用設計を固めることを優先している。実装は [docs/ROADMAP.md](../docs/ROADMAP.md) のフェーズ2で着手する。
