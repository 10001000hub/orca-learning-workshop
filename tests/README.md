# tests

`game/`（engine / content-loader）の自動テストを配置するディレクトリ。

## 現在の状態

Node.js 18以降の標準テストランナーだけを使うため、依存パッケージのインストールは不要。

```bash
cd AI-Learning-Workshop
node --test tests/*.test.js
```

現在はmetadata解析（CRLFを含む）、Markdownの安全な変換、教材データ整合性、ゲーム進行、採点、不正な選択肢の拒否を検証する。

教材コンテンツ自体の検証（JSON妥当性・必須項目・Veto条件）は`scripts/validate-curriculum.ps1`とeval-loop（`eval/`）が担当し、本ディレクトリの対象外とする。
