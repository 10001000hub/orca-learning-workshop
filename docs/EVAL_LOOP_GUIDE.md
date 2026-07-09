# EVAL LOOP GUIDE

このプロジェクトにおける eval-loop の使い方を説明する。

## eval-loopとは何か

eval-loopは「生成 → 評価 → 再挑戦」を、スコアが閾値(threshold)に達するまで繰り返す品質改善ループである。教材を一発で作って終わりにするのではなく、**基準を満たすまで自動的に改善を回す検査ライン**として使う。

## 1つの大きなループで全部やらない

「GH-001の教材を一括で作って評価する」のような、1つの巨大なeval-loopタスクを組んではならない。research・facts・lesson・quiz・workshop・beginner QA・final packは、それぞれ性質の異なる検査項目を持つため、1つのループにまとめると以下の問題が起きる。

- どの工程でスコアが落ちたのか切り分けられない
- 事実誤りとUI操作の誤りと初心者向けの分かりやすさの問題が同じ評価軸で混ざる
- 再挑戦のたびに関係ない工程まで再生成されてしまう

## 工程分割

eval-loopは以下の7工程に分けて実行する。前工程の成果物が後工程のインプットになる。

```text
Research Loop
↓
Facts Loop
↓
Lesson Loop
↓
Quiz Loop
↓
Workshop Loop
↓
Beginner QA Loop
↓
Final Pack Loop
```

各工程のタスク定義は `eval/tasks/`、評価基準は `eval/criteria/` に置く。

## 推奨threshold

| 工程 | threshold |
| --- | --- |
| Research | 85 |
| Facts | 90 |
| Lesson | 85 |
| Quiz | 90 |
| Workshop | 90 |
| Beginner QA | 85 |
| Final Pack | 90 |

Facts・Quiz・Workshop・Final Packは事実性・一意性・実行可能性・整合性が問われるため他工程より高いthresholdを設定する。

## 必須Veto条件

以下のいずれかに該当する場合、スコアに関わらず不合格（再生成対象）とする。

```text
公式資料・実機根拠がない
実際のUI名称と違う
存在しないボタンを押させている
Windows前提と矛盾している
クイズの正解が一意でない
Workshopの成功判定が曖昧
初心者が次に何をすればいいか分からない
```

Veto条件は加点式の評価基準より優先する。スコアが高くてもVeto条件に触れた教材は不合格とする。

## 実行モード：fork推奨

初期段階では `/run-eval-loop-fork` を使うことを推奨する。理由は以下の通り。

- メイン会話のコンテキストを汚さない
- 1教材ずつ品質基準を固められる
- 初期設計ではparallelより安全（複数教材・複数工程を同時に走らせて評価軸がぶれるリスクを避ける）

実行例は `eval/presets/github-gh001.eval-loop.md` を参照。

## parallelは安定後に使う

複数教材のeval-loopが安定して同じ基準で回るようになってから、`/run-eval-loop-parallel` を使って複数教材・複数工程を並行実行する運用に移行する。安定していない段階でparallelを使うと、評価基準のブレや、再生成の競合が起きやすい。

## 関連ドキュメント

- 教材の作り方: [CURRICULUM_GUIDE.md](CURRICULUM_GUIDE.md)
- 検証ポリシー: [VALIDATION_POLICY.md](VALIDATION_POLICY.md)
