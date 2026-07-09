# game/ui

教材を画面に表示するUI層。フレームワーク・ビルドツールなしのvanilla HTML/CSS/JS（`index.html` / `main.js` / `style.css`）。

## 責務

- `engine`から渡された進行状態と、`content-loader`から渡された教材データをもとに画面を描画する。
- レッスン文・クイズ・実習手順の文言は一切ハードコードせず、すべてcurriculum由来のデータをそのまま表示する。

## 試作v0の範囲

GH-001固定（テーマ・教材ID選択UIはまだない）。lesson表示 → quiz（選択→即時正誤フィードバック→解説→次へ）→ workshop（手順・成功基準・ヒント表示→確認ボタン）→ done（学習目標・成功基準・クイズ得点の表示、やり直しボタン）の一連を表示する。

## ローカルでの起動方法

`fetch`でcurriculumファイルを読むため、`file://`で直接開くとブラウザにブロックされる。`AI-Learning-Workshop/`直下でHTTPサーバーを立てて開くこと。

```bash
cd AI-Learning-Workshop
python3 -m http.server 8420
# ブラウザで http://localhost:8420/game/ui/index.html を開く
```

## 現在の状態（試作v0）

`content-loader`/`engine`のロジックはNode.js上で実データを使い動作確認済み。本UI（DOM描画・ボタン操作等の見た目と挙動）はブラウザでの目視確認をまだ行っていない。上記コマンドでサーバーを起動し、実際にブラウザで一通り操作して確認すること。
