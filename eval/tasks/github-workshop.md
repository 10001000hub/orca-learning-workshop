# Task: GitHub Workshop Loop（GH-001）

## 目的

`curriculum/github/GH-001/workshop.json`を、実行可能性と成功判定の明確性を軸に閾値90まで改善する。

## 入力

- `curriculum/github/GH-001/workshop.json`
- `research/github/GH-001/verification.md`（実機確認の状況）
- 評価基準: `eval/criteria/workshop.criteria.md`

## 生成・改善の対象

- `success_check`の判定基準をより明確にする
- `hint`が実際に初心者の助けになるかを見直す

## 禁止事項

- `research/github/GH-001/verification.md`で実機確認されていないUI操作を追加すること
- Windows前提と矛盾する手順を追加すること
- 曖昧な成功判定を残すこと

## 出力

改善版の`curriculum/github/GH-001/workshop.json`（JSONとして妥当であること）。
