# scripts

## validate-curriculum.ps1

`curriculum/`配下の教材ディレクトリの整合性を検証するWindows PowerShellスクリプト。

### 実行方法（Windows）

```powershell
cd AI-Learning-Workshop
powershell -File scripts\validate-curriculum.ps1
```

### 検証内容

- `metadata.yaml` / `quiz.json` / `workshop.json` / `references.md` の存在確認
- `metadata.yaml`に`id` / `title` / `os` / `status` / `learning_objective`が存在するか
- `quiz.json` / `workshop.json` がJSONとして壊れていないか

### 現在の制約（初期版）

- `metadata.yaml`のキー存在確認は簡易的な正規表現によるもので、YAMLとしての厳密なスキーマ検証は行っていない。
- クイズの正答一意性、Workshopの成功判定の曖昧さなど、内容面の検証は対象外（これらはeval-loop側で検証する。[docs/EVAL_LOOP_GUIDE.md](../docs/EVAL_LOOP_GUIDE.md)参照）。

### 動作確認済みの注意点（実機確認）

- スクリプト本体はUTF-8 BOM付きで保存している。Windows PowerShell 5.1（`powershell.exe`）はBOMなしUTF-8のスクリプトを既定のANSIコードページ（日本語環境では通常CP932）で読み込み、日本語文字列を含む行でパースエラーになることを実機で確認したため。
- コンソールの既定コードページがCP932のままだと、`[OK]`/`[NG]`メッセージの日本語部分が文字化けして表示されることがある（スクリプトの判定結果・終了コード自体は正しい）。文字化けする場合は、実行前に `chcp 65001` を実行するか、Windows Terminal など UTF-8 表示に対応したターミナルを使うこと。
