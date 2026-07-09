# scripts

## validate-curriculum.ps1

`curriculum/`配下の教材ディレクトリの整合性を検証するWindows PowerShellスクリプト。

### 実行方法（Windows）

```powershell
cd AI-Learning-Workshop
powershell -File scripts\validate-curriculum.ps1
```

### 検証内容

- `metadata.yaml` / `lesson.md` / `quiz.json` / `workshop.json` / `references.md` の存在確認
- `metadata.yaml`に`id` / `title` / `os` / `status` / `learning_objective`が存在するか
- `metadata.yaml`の`os`にWindows以外の値が含まれていないか（`no_mac_instruction`の機械的裏付け）
- `quiz.json` / `workshop.json` がJSONとして壊れていないか
- `quiz.json`の各設問の`answer`が、その設問の`choices`に実在するか（構造的整合性のみ。正答が意味的に一意かはeval-loop側の役割）
- `workshop.json`の各stepの`success_check`が空でないか（内容が曖昧でないかはeval-loop側の役割）

### 現在の制約（初期版）

- `metadata.yaml`のキー存在確認・`os`抽出は簡易的な正規表現によるもので、YAMLとしての厳密なスキーマ検証は行っていない。
- クイズの正答一意性、Workshopの成功判定の曖昧さなど、意味内容の検証は対象外（これらはeval-loop側で検証する。[docs/EVAL_LOOP_GUIDE.md](../docs/EVAL_LOOP_GUIDE.md)参照）。

### 既知の注意点（未検証・Windows実機での実行確認はまだ行っていない）

このプロジェクトの開発はPowerShellが存在しないWSL環境で行っており、本スクリプトをWindows実機で実行した確認はまだ行っていない。以下は一般に知られているPowerShellの挙動に基づく対策であり、「実機で確認した」ものではない。次にWindows環境で実行する際に、このセクションの記述を実際の挙動で更新すること。

- スクリプト本体はUTF-8 BOM付きで保存している。Windows PowerShell 5.1（`powershell.exe`）は、BOMなしUTF-8のスクリプトを既定のANSIコードページ（日本語環境では通常CP932）で読み込むことがあり、日本語文字列を含む行でパースエラーになる可能性があるため、BOM付きで保存することでこれを避ける狙い。
- コンソールの既定コードページがCP932のままだと、`[OK]`/`[NG]`メッセージの日本語部分が文字化けする可能性がある。文字化けする場合は、実行前に `chcp 65001` を実行するか、Windows Terminal など UTF-8 表示に対応したターミナルを使うこと。
