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
# WSL / Linux
cd AI-Learning-Workshop
python3 -m http.server 8420
# ブラウザで http://localhost:8420/game/ui/index.html を開く
```

```powershell
# Windows (PowerShell。Pythonランチャー py が必要)
cd AI-Learning-Workshop
py -m http.server 8420
# ブラウザで http://localhost:8420/game/ui/index.html を開く
```

## 現在の状態（試作v0）

`content-loader`/`engine`のロジックはNode.js上で実データを使い動作確認済み。ユーザーによるブラウザでの目視確認も完了（2026-07-09、lesson→quiz(2問)→workshop(2ステップ)→doneまで一連の操作を確認）。テーマ・教材ID選択、`status`による読み込み制御、進行状態の永続化（リロードで消える）は未実装。
