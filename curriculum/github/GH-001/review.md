# Review: GH-001

現時点でのレビュー記録。

## ステータス

`draft`（[metadata.yaml](metadata.yaml)参照）。eval-loopによる工程別レビュー（Research / Facts / Lesson / Quiz / Workshop / Beginner QA / Final Pack）は本バージョンではまだ実行していない。運用方法は [docs/EVAL_LOOP_GUIDE.md](../../../docs/EVAL_LOOP_GUIDE.md) を参照。

## セルフチェック（Veto条件との突き合わせ）

| Veto条件 | 状態 | 備考 |
| --- | --- | --- |
| 公式資料・実機根拠がない | 該当なし | `research/github/GH-001/source-pack.md`の公式ドキュメントに基づく |
| 実際のUI名称と違う | 該当なし | 本教材はUI名称・ボタン名を一切使用していない |
| 存在しないボタンを押させている | 該当なし | workshopはボタン操作を含まない（`guided_observation`） |
| Windows前提と矛盾している | 該当なし | `metadata.yaml`の`os: [Windows]`と矛盾する記述なし |
| クイズの正解が一意でない | 該当なし | `quiz.json`の各設問は選択肢が明確に区別され、正解は1つ |
| Workshopの成功判定が曖昧 | 修正済み | 自己レビュー・Codexレビュー(2026-07-09)双方で`step-2`の`success_check`(「説明できる」)が主観的すぎると指摘され、「3点を1文ずつ言える/書ける」という観測可能なチェックリスト形式に修正した。「言えた」の最終判定はユーザー自身の自己申告に依るため、Beginner QA Loopでの再検証は引き続き推奨 |
| 初心者が次に何をすればいいか分からない | 該当なし | `lesson.md`末尾に次教材への導線を明記 |

## 今後の課題（次イテレーション）

- 実機確認（`research/github/GH-001/verification.md`）の実施と、`metadata.yaml`の`confidence`/`verified_on`の更新
- eval-loopの各工程（Research 85 / Facts 90 / Lesson 85 / Quiz 90 / Workshop 90 / Beginner QA 85 / Final Pack 90）による実際の評価
- Workshopの`success_check`をBeginner QA Loopで検証し、曖昧さが指摘された場合は判定方法を具体化する
