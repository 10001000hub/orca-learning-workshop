# Contributing

このプロジェクトへの貢献方法について説明する。

## 前提

- 対象OSは当面 **Windows のみ**。Mac向けの説明・手順は追加しない。
- 教材は **research → knowledge → curriculum → game** の4層構造を守る。層をまたいで内容を混ぜない（例: research の生資料を curriculum に直接コピーしない）。
- 教材本文をゲーム本体（`game/`）のコードに直接埋め込まない。

## 教材を追加・修正する場合

1. `research/<theme>/<ID>/` に一次資料（README・公式Docs・実機確認メモ）を追加する。
2. `knowledge/<theme>/<ID>/facts.md` に、resarchから抽出した事実だけを書く。推測・感想・教材的な言い回しは書かない。
3. `curriculum/<theme>/<ID>/` に `metadata.yaml` / `lesson.md` / `quiz.json` / `workshop.json` / `references.md` を作成する。テンプレートは `templates/` を使う。
4. 変更内容を `eval/` のcriteriaに沿ってセルフレビューする。可能であれば [docs/EVAL_LOOP_GUIDE.md](docs/EVAL_LOOP_GUIDE.md) に従い、該当工程のeval-loopで品質を検証する。
5. PRを作成する際は `.github/PULL_REQUEST_TEMPLATE.md` の項目をすべて埋める。

## 必須Veto条件（違反したら不合格）

以下のいずれかに該当する教材は受け付けない。

- 公式資料・実機根拠がない
- 実際のUI名称と違う
- 存在しないボタンを押させている
- Windows前提と矛盾している
- クイズの正解が一意でない
- Workshopの成功判定が曖昧
- 初心者が次に何をすればいいか分からない

詳細は [docs/VALIDATION_POLICY.md](docs/VALIDATION_POLICY.md) を参照。

## コミット・PRの粒度

1つのPRで扱うのは、原則として1つの教材ID（例: `GH-001`）または1つの層の変更に留める。researchの追加とlessonの大幅書き換えを同じPRに混ぜない。

## 検証

`scripts/validate-curriculum.ps1` を実行し、対象教材の必須ファイル・必須項目・JSONの妥当性を確認してからPRを出すこと。
