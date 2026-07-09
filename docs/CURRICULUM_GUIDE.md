# CURRICULUM GUIDE

`curriculum/<theme>/<ID>/` の作り方を説明する。テンプレートは `templates/` にある。

## 教材IDの命名

`<テーマ略号>-<連番3桁>` とする。例: GitHubテーマの1つ目は `GH-001`。

## 作成手順

1. **research** — 一次資料を集める。公式README・公式Docs・実際に操作した画面の記録を `research/<theme>/<ID>/` に置く。
   - `source-pack.md`: 一次資料の引用・要約と出典URL
   - `verification.md`: 実機で確認した内容と確認日（実機確認していない場合はその旨を明記し、断定表現を避ける）
   - `references.md`: 参照した資料の一覧
2. **knowledge** — researchから事実だけを抽出し `knowledge/<theme>/<ID>/facts.md` に書く。各事実に出典（researchのファイル名）を付ける。推測・感想は書かない。
3. **curriculum** — factsを元に教材を作る。
   - `metadata.yaml`: テンプレート `templates/metadata.yaml` を元に作成。`status` は最初 `draft` とし、レビューを経て `reviewed` → `published` のように進める想定。
   - `lesson.md`: 初心者向けの説明文。factsに書かれていない内容を追加しない。
   - `quiz.json`: 正解が一意になるクイズ。`source_refs` で出典を明記する。
   - `workshop.json`: 実習手順。実機確認済みの操作のみ含める。UI操作を伴う場合は、必ず`research/`に実機確認の根拠を持つこと。
   - `references.md`: 教材が依拠した出典の一覧（research/knowledgeへのリンク）。
   - `review.md`: レビュー結果を記録する（初期は空でよい）。
   - `images/`: 教材で使う画像（初期は`.gitkeep`のみでよい）。

## 教材ファイル間の一貫性

- `lesson.md` の内容は `facts.md` に書かれた事実の範囲を超えない。
- `quiz.json` の正解・選択肢は `lesson.md` および `facts.md` と矛盾しない。
- `workshop.json` の手順は `metadata.yaml` の `os` と矛盾しない（Windows専用教材にMac手順を混ぜない）。

## status の意味

| status | 意味 |
| --- | --- |
| `draft` | 作成中。eval-loopでの検証がまだ完了していない。 |
| `reviewed` | Beginner QA Loopまで通過した状態。 |
| `published` | Final Pack Loopまで通過し、ゲームから読み込んでよい状態。 |

## 検証

教材を追加・変更したら `scripts/validate-curriculum.ps1` を実行し、必須ファイル・必須項目・JSONの妥当性を確認する。あわせて [EVAL_LOOP_GUIDE.md](EVAL_LOOP_GUIDE.md) の工程に沿って品質を検証することを推奨する。
