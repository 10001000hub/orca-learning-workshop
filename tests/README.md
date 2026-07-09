# tests

`game/`（engine / ui / content-loader）の自動テストを配置する予定のディレクトリ。

## 現在の状態

`game/`側の実装がまだ行われていないため、本バージョンではテストコードは未作成。[docs/ROADMAP.md](../docs/ROADMAP.md)フェーズ2でゲーム本体の実装を開始する際に、`content-loader`の読み込みテストから追加していく想定。

教材コンテンツ自体の検証（JSON妥当性・必須項目・Veto条件）は`scripts/validate-curriculum.ps1`とeval-loop（`eval/`）が担当し、本ディレクトリの対象外とする。
