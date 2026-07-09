# ARCHITECTURE

このプロジェクトは、教材データを4つの層に分けて管理する。層を分ける理由は、**「事実」「教材表現」「表示」を混ぜると、どこに誤りが混入したか追跡できなくなる**ためである。

```text
research/
    ↓
knowledge/
    ↓
curriculum/
    ↓
game/
```

## research/ — 一次資料層

一次資料・公式README・公式Docs・リリースノート・実機確認メモを保存する場所。

- 保存するもの: 公式サイトの記述の引用、実際に操作した画面のメモ、確認した日時とバージョン。
- 保存しないもの: 教材としての言い回し、初心者向けの説明、感想。
- 例: `research/github/GH-001/source-pack.md`, `verification.md`, `references.md`

## knowledge/ — 事実層

researchから抽出した「事実」だけを保存する場所。

- 保存するもの: 検証可能な事実のみ。出典（researchのどのファイルか）を明記する。
- 禁止事項: 推測、感想、教材的な言い回し・比喩・初心者向けの噛み砕き。
- 例: `knowledge/github/GH-001/facts.md`

knowledgeの各事実は、必ずresearch内の具体的な資料に遡れる状態にする。遡れない事実は書かない。

## curriculum/ — 教材層

factsを元に作成した教材本体。

- 構成要素: `metadata.yaml`（教材のメタ情報）, `lesson.md`（説明文）, `quiz.json`（クイズ）, `workshop.json`（実習手順）, `references.md`（出典一覧）, `review.md`（レビュー記録）, `images/`（画像）。
- 教材はfactsに忠実であること。factsにない内容を教材独自の判断で追加しない。
- 例: `curriculum/github/GH-001/`

## game/ — ゲーム層

curriculumを読み込んで表示するゲーム本体。

- ゲーム本体のコードに教材本文（lesson文・クイズ文言など）を直接埋め込まない。教材は必ず `curriculum/` からロードする。
- 構成: `engine/`（ゲームロジック）, `ui/`（画面表示）, `content-loader/`（curriculumの読み込み処理）。
- 現バージョンでは各サブディレクトリにREADMEのみを配置し、実装は次イテレーション以降に行う。

## 層をまたいだ責務分離のメリット

- 一次資料が古くなった／間違っていた場合、researchだけを直せば知識層以降を再検証できる。
- 事実(knowledge)と教材表現(curriculum)を分けることで、「事実は合っているが説明が分かりにくい」ケースと「説明は分かりやすいが事実が違う」ケースを区別してレビューできる。
- ゲーム本体(game)が教材本文を持たないため、教材だけを高頻度で更新してもゲームのデプロイ・実装に影響しない。

## 関連ドキュメント

- 教材の作り方: [CURRICULUM_GUIDE.md](CURRICULUM_GUIDE.md)
- 品質改善の仕組み: [EVAL_LOOP_GUIDE.md](EVAL_LOOP_GUIDE.md)
- 検証ポリシー: [VALIDATION_POLICY.md](VALIDATION_POLICY.md)
