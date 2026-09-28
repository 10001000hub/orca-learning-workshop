# game/ui

教材を画面に表示するUI層。フレームワーク・ビルドツールなしのvanilla HTML/CSS/JS（`index.html` / `main.js` / `style.css`）。

## 責務

- `engine`から渡された進行状態と、`content-loader`から渡された教材データをもとに画面を描画する。
- レッスン文・クイズ・実習手順の文言は一切ハードコードせず、すべてcurriculum由来のデータをそのまま表示する。

## 現在の範囲

コース一覧を入口として、ORCA-001からORCA-005までの各教材でlesson表示 → quiz（選択→即時正誤フィードバック→解説→次へ）→ workshop（手順・成功基準・ヒント表示→確認ボタン）→ done（学習目標・成功基準・クイズ得点の表示、やり直しボタン）の一連を表示する。

## ローカルでの起動方法

`fetch`でcurriculumファイルを読むため、`file://`で直接開くとブラウザにブロックされる。リポジトリ直下（`orca-learning-workshop/`）でHTTPサーバーを立てて開くこと。

```bash
# WSL / Linux
cd orca-learning-workshop
python3 -m http.server 8420
# 公開済み教材を開く: http://localhost:8420/game/ui/index.html
# コース一覧: http://localhost:8420/game/ui/index.html
# ORCA-001のdraftをレビューする: http://localhost:8420/game/ui/index.html?theme=orca&lesson=ORCA-001&allowDraft=1
# GH-001を指定する: http://localhost:8420/game/ui/index.html?theme=github&lesson=GH-001&allowDraft=1
```

```powershell
# Windows (PowerShell。Pythonランチャー py が必要)
cd orca-learning-workshop
py -m http.server 8420
# コース一覧: http://localhost:8420/game/ui/index.html
# ORCA-001のdraftをレビューする: http://localhost:8420/game/ui/index.html?theme=orca&lesson=ORCA-001&allowDraft=1
```

## 現在の状態

`content-loader`/`engine`のロジックはNode.js上でGH-001とORCA-001〜005の実データを使い動作確認する。コース一覧、次教材への移動、ブラウザのlocalStorageを使った完了状態保存に対応する。`status: published`以外の教材は、URLを直接開いた場合は既定で表示を拒否する。コース一覧から開くリンク（`allowDraft=1`付き）では、一覧と各レッスンに「下書き」「レビュー中」の表示と未検証である旨の注意を出したうえで表示する。表示区分は`lesson-status.js`が決め、未設定・未知のstatusも公開前として扱う。
