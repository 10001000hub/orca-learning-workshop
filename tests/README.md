# tests

`game/`（engine / ui / content-loader）の自動テストを配置する予定のディレクトリ。

## 現在の状態

`game/`は試作v0（GH-001固定）まで実装済みだが、本ディレクトリのテストコードは未作成。[docs/ROADMAP.md](../docs/ROADMAP.md)フェーズ3で、`content-loader`の読み込みテスト（CRLF混入時のmetadata解析など）から追加していく想定。

教材コンテンツ自体の検証（JSON妥当性・必須項目・Veto条件）は`scripts/validate-curriculum.ps1`とeval-loop（`eval/`）が担当し、本ディレクトリの対象外とする。
