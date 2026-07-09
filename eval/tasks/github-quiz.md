# Task: GitHub Quiz Loop（GH-001）

## 目的

`curriculum/github/GH-001/quiz.json`を、正答の一意性を最優先に閾値90まで改善する。

## 入力

- `curriculum/github/GH-001/quiz.json`
- `curriculum/github/GH-001/lesson.md`
- `knowledge/github/GH-001/facts.md`
- 評価基準: `eval/criteria/quiz.criteria.md`

## 生成・改善の対象

- 各設問の正解が一意になっているかの確認・修正
- 選択肢の妥当性（不自然すぎず、紛らわしすぎない）
- `source_refs`の正確性

## 禁止事項

- 正解が複数解釈可能な設問を残すこと
- factsと矛盾する解説を書くこと
- 未検証のUI名称を選択肢・解説に使うこと

## 出力

改善版の`curriculum/github/GH-001/quiz.json`（JSONとして妥当であること）。
