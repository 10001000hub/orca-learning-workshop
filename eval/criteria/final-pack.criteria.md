# Final Pack Criteria

対象: `curriculum/<theme>/<ID>/`一式（metadata.yaml / lesson.md / quiz.json / workshop.json / references.md / review.md）

Threshold: 90（[EVAL_LOOP_GUIDE.md](../../docs/EVAL_LOOP_GUIDE.md)参照）

## 評価観点

### 全体整合性

lesson・quiz・workshop・metadataの間で矛盾がないか。学習目標(`learning_objective`)と成功基準(`success_criteria`)が実際の教材内容と対応しているか。

### バージョン一致

`metadata.yaml`の`version.target`・`verified_on`と、`research/`の確認状況が一致しているか。未検証なのに検証済みのように書かれていないか。

### 出典一致

`references.md`に記載された出典と、`knowledge/facts.md`・`research/`の実際の内容が一致しているか。

### ゲーム実装可能性

`metadata.yaml`のスキーマ、`quiz.json`・`workshop.json`のJSON構造が、`game/content-loader`が読み込める形式として一貫しているか。

### 更新容易性

教材のどこか一箇所（例: 用語の言い回し）を変更する際に、他のファイルへの連鎖的な修正が過剰に発生しない構造になっているか。

## Veto条件（該当したら即不合格）

上記7つのVeto条件（[VALIDATION_POLICY.md](../../docs/VALIDATION_POLICY.md)参照）すべてを最終チェックとして再確認する。1つでも該当すれば`status: published`にしない。
