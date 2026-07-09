# Changelog

このプロジェクトの変更履歴を記録する。フォーマットは [Keep a Changelog](https://keepachangelog.com/) を参考にした簡易版。

## [Unreleased]

### Added

- プロジェクト初期構成（research / knowledge / curriculum / game / eval / templates / review / scripts / tests / assets）を作成。
- ドキュメント一式（README, ARCHITECTURE, CURRICULUM_GUIDE, EVAL_LOOP_GUIDE, LESSON_AUTHORING_GUIDE, VALIDATION_POLICY, ROADMAP）を作成。
- 教材テンプレート一式（lesson, facts, metadata, quiz, workshop, review, source-pack）を作成。
- eval-loop用のtasks / criteria / presetsを作成。
- 最初の教材サンプル `GH-001: GitHubとは何か` を research → knowledge → curriculum → review の各層に作成（`status: draft`）。
- 教材整合性検証スクリプト `scripts/validate-curriculum.ps1` を作成。
- `.github/` にIssue/PRテンプレートを作成。

### Notes

- 本バージョンではゲーム本体（`game/`）はREADMEのみで、実装は未着手。
- GH-001の`confidence`・`verified_on`は未検証状態（`0` / `null`）のまま。実機確認が完了次第、次のイテレーションで更新する。
