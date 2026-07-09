# Task: GitHub Final Pack Loop（GH-001）

## 目的

GH-001一式の全体整合性を最終確認し、閾値90を満たせば`metadata.yaml`の`status`を`published`に進める。

## 入力

- `curriculum/github/GH-001/`一式（metadata.yaml / lesson.md / quiz.json / workshop.json / references.md / review.md）
- `review/github/GH-001/beginner-review.md`
- 評価基準: `eval/criteria/final-pack.criteria.md`

## 生成・改善の対象

- lesson・quiz・workshop・metadata間の整合性の最終確認
- `references.md`の出典一致確認
- `scripts/validate-curriculum.ps1`によるJSON・必須項目の機械的確認結果の反映

## 禁止事項

- Beginner QA Loopで指摘された未解決の問題を残したまま`published`にすること
- 必須Veto条件（`docs/VALIDATION_POLICY.md`）に1つでも該当する状態で`published`にすること

## 出力

最終確認済みの`curriculum/github/GH-001/`一式。閾値を満たさない場合は該当工程（Lesson/Quiz/Workshop等）のLoopに差し戻す。
