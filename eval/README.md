# eval

教材品質をeval-loopで検査・改善するための定義一式。

## 構成

- `tasks/`: 工程ごと（Research/Facts/Lesson/Quiz/Workshop/Beginner QA/Final Pack）のeval-loopタスク定義。
- `criteria/`: 工程ごとの評価基準。
- `presets/`: 実際に`/run-eval-loop-fork`などへ渡す実行例。

## 使い方の概要

1. 改善したい教材と工程を決める（例: `GH-001`のLesson工程）。
2. `tasks/github-lesson.md`と`criteria/lesson.criteria.md`を確認する。
3. `presets/github-gh001.eval-loop.md`を参考に、該当工程のtaskとcriteria、threshold（`docs/EVAL_LOOP_GUIDE.md`参照）を指定してeval-loopを実行する。
4. Veto条件に抵触した教材は、スコアに関わらず不合格として再生成する。

詳細な運用方針は [docs/EVAL_LOOP_GUIDE.md](../docs/EVAL_LOOP_GUIDE.md) を参照。
