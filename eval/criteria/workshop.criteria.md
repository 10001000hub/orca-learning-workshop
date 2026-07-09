# Workshop Criteria

対象: `curriculum/<theme>/<ID>/workshop.json`

Threshold: 90（[EVAL_LOOP_GUIDE.md](../../docs/EVAL_LOOP_GUIDE.md)参照）

## 評価観点

### 実行可能性

記載された手順を、対象環境（Windows + ブラウザ等）で実際に実行できるか。前提条件が`environment`に正しく記載されているか。

### Windows環境との一致

手順・用語がWindows環境の実際の操作と一致しているか。Mac固有の操作・表現が混入していないか。

### 手順の明瞭性

各`step`の`instruction`が、初心者にも一意に解釈できる指示になっているか。

### 失敗時リカバリ

`hint`が、つまずいた場合に次の行動を示せているか。

### 成功判定の明確性

各`step`の`success_check`が、初心者自身または観測者が明確に判定できる基準になっているか。主観的すぎる・曖昧な判定基準になっていないか。

## Veto条件（該当したら即不合格）

- Workshopの成功判定が曖昧
- 存在しないボタンを押させている
- 実際のUI名称と違う
- Windows前提と矛盾している
- 公式資料・実機根拠がない
