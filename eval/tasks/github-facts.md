# Task: GitHub Facts Loop（GH-001）

## 目的

`knowledge/github/GH-001/facts.md`の事実性・出典対応を、閾値90まで改善する。

## 入力

- `knowledge/github/GH-001/facts.md`
- 前工程の出力: `research/github/GH-001/*`
- 評価基準: `eval/criteria/facts.criteria.md`

## 生成・改善の対象

- 各事実への出典（研究資料内の具体的箇所）の明記
- 推測・感想・教材的言い回しの排除
- GH-001の学習目標に対して過不足のない事実の粒度

## 禁止事項

- researchに存在しない事実を追加すること
- 複数の事実を統合して、出典から遡れない新しい主張を作ること

## 出力

改善版の`knowledge/github/GH-001/facts.md`。次工程（Lesson Loop）はこの出力を入力とする。
