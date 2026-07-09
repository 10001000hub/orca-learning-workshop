# Preset: GH-001 eval-loop実行例

GH-001をeval-loopで改善するための実行例。初期段階では `/run-eval-loop-fork` を使う（理由は[docs/EVAL_LOOP_GUIDE.md](../../docs/EVAL_LOOP_GUIDE.md)参照）。

**実行時は必ず下記「工程別の実行例」を工程ごとに個別実行すること。** `docs/EVAL_LOOP_GUIDE.md`が禁止する「1つの巨大なeval-loopタスク」を避けるため、research/facts/lesson/quiz/workshop/beginner QA/final packを一括で生成・改善するeval-loopは実行しない。

## 工程別の実行例

工程ごとに個別のeval-loopとして実行する場合は、以下のように工程に応じたtask/criteriaファイルとthresholdを指定する。

### Research

```text
/run-eval-loop-fork
task: eval/tasks/github-research.md の内容に従い research/github/GH-001/ を改善する
criteria: eval/criteria/research.criteria.md
threshold: 85
max: 8
```

### Facts

```text
/run-eval-loop-fork
task: eval/tasks/github-facts.md の内容に従い knowledge/github/GH-001/facts.md を改善する
criteria: eval/criteria/facts.criteria.md
threshold: 90
max: 8
```

### Lesson

```text
/run-eval-loop-fork
task: eval/tasks/github-lesson.md の内容に従い curriculum/github/GH-001/lesson.md を改善する
criteria: eval/criteria/lesson.criteria.md
threshold: 85
max: 8
```

### Quiz

```text
/run-eval-loop-fork
task: eval/tasks/github-quiz.md の内容に従い curriculum/github/GH-001/quiz.json を改善する
criteria: eval/criteria/quiz.criteria.md
threshold: 90
max: 8
```

### Workshop

```text
/run-eval-loop-fork
task: eval/tasks/github-workshop.md の内容に従い curriculum/github/GH-001/workshop.json を改善する
criteria: eval/criteria/workshop.criteria.md
threshold: 90
max: 8
```

### Beginner QA

```text
/run-eval-loop-fork
task: eval/tasks/github-beginner-review.md の内容に従い review/github/GH-001/beginner-review.md を改善する
criteria: eval/criteria/beginner-review.criteria.md
threshold: 85
max: 8
```

### Final Pack

```text
/run-eval-loop-fork
task: eval/tasks/github-final-pack.md の内容に従い curriculum/github/GH-001/ 一式の整合性を最終確認する
criteria: eval/criteria/final-pack.criteria.md
threshold: 90
max: 12
```

## 参考: 全体像を俯瞰する例（単独では実行しない）

以下は7工程がすべて閾値を通過した後、Final Pack Loop 1回の中でどのような観点を見るかを俯瞰するための参考例であり、これ自体を1つのeval-loopとして起動するものではない。実際の生成・改善は必ず上記「工程別の実行例」を工程ごとに個別実行すること。

```text
参考（Final Pack Loop実行時のイメージ。単独実行しない）:
task: eval/tasks/github-final-pack.md の内容に従い、research/facts/lesson/quiz/workshop/reviewが
      揃った状態のGH-001一式の整合性を最終確認する（生成・改善は行わない。確認のみ）
criteria: 全体整合性, バージョン一致, 出典一致, ゲーム実装可能性, 更新容易性
threshold: 90
max: 12
```

## 運用メモ

- 本プリセットは実行例（ドキュメント）であり、本バージョンではまだ実行していない。実行は[docs/ROADMAP.md](../../docs/ROADMAP.md)フェーズ1で行う。
- 複数教材が安定してから`/run-eval-loop-parallel`への移行を検討する。
