# tests

`game/`（engine / content-loader）の自動テストを配置するディレクトリ。

## 現在の状態

Node.js 18以降の標準テストランナーだけを使うため、依存パッケージのインストールは不要。

```bash
cd orca-learning-workshop
node --test tests/*.test.js
```

現在はmetadata解析（CRLFを含む）、Markdownの安全な変換、教材データ整合性、ゲーム進行、採点、不正な選択肢の拒否、curriculum外を指すtheme/IDの拒否、公開前教材の表示区分、GitHub Pagesのサブパスでも壊れない相対参照を検証する。

`fixtures/invalid-curriculum/`は`scripts/validate-curriculum.ps1`が不合格を返すことを確かめるための意図的に壊れたデータで、CIが毎回使う。

教材コンテンツ自体の検証（JSON妥当性・必須項目・Veto条件）は`scripts/validate-curriculum.ps1`とeval-loop（`eval/`）が担当し、本ディレクトリの対象外とする。
