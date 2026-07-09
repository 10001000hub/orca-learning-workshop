# Source Pack: GH-001 GitHubとは何か

対象教材: `GH-001`
テーマ: GitHub
確認日: 2026-07-09

## 一次資料

### 資料1: GitHub公式ドキュメント「About GitHub and Git」

- 出典URL: https://docs.github.com/en/get-started/start-your-journey/about-github-and-git
- 取得日: 2026-07-09
- 取得方法: 公式ドキュメントページをWebFetchで取得（ログイン不要の一般公開ページ）
- 現行性確認日: 2026-07-10（同URLをWebFetchで再取得し、下記の記述内容が現行ページと一致することを確認。取得日 2026-07-09 の記録はそのまま保持する）
- 環境適合: 資料1はブラウザで参照できる一般公開ドキュメントでOS非依存。Windows対応ブラウザ（Chrome/Edge/Firefox）でも同一内容を参照でき、Mac固有の記述は含まない。

要約（原文に近い形。各項目に資料1の原文の該当句を添える）:

- GitHubは、クラウドベースのプラットフォームであり、コードを保存・共有し、他者と協働してコードを書くことができる。
  - 原文（資料1）: "GitHub is a cloud-based platform where you can store, share, and work together with others to write code."
- リポジトリにコードを保存することで、以下が可能になる。
  - 作業内容の公開・共有
  - 時系列でのコード変更の追跡と管理
  - 他者によるレビューと改善提案の受け入れ
  - 変更が他者の作業に影響しないようにしての協働作業
  - 原文（資料1）: "Storing your code in a "repository" on GitHub allows you to:" に続く4項目 — "Showcase or share your work." / "Track and manage changes to your code over time." / "Let others review your code, and make suggestions to improve it." / "Collaborate on a shared project, without worrying that your changes will impact the work of your collaborators before you're ready to integrate them."
- Gitは、ファイルの変更を追跡するバージョン管理システムであり、複数人が同時に同じファイルを編集する際に特に有用。
  - 原文（資料1）: "Git is a version control system that intelligently tracks changes in files."

用語（資料1での使われ方と原文の要点句）:

資料1は以下の用語を概念導入の文脈で「使用」しており、独立した厳密な定義文としては提示していない。下記の日本語は資料1でのその使われ方を要約したもので、各項目に原文の該当句を添える。

- **リポジトリ**: コードを保存する場所（GitHub上でコードを保存する単位として言及される）。原文（資料1）: "Storing your code in a "repository" on GitHub allows you to:"
- **コミット**: GitHub上でファイルに加えた変更のこと。原文（資料1）: "When you make changes (or "commits") to your files in GitHub, Git will automatically start to track and manage your changes."
- **ブランチ**: メインのファイルコピーから分岐した独立した作業領域。原文（資料1）: "Create a branch off from the main copy of files that you (and your collaborators) are working on."
- **マージ**: 個人のブランチでの変更をメインコピーに統合すること。原文（資料1）: "Let Git intelligently merge your specific changes back into the main copy of files..."
- **プッシュ/プル**: ローカルの変更をリモートリポジトリに送信（プッシュ）し、協働者の変更を取得（プル）する操作。原文（資料1）: プッシュ = "Push back your own changes to the same remote repository on GitHub." / プル = "Pull all the latest changes made by your collaborators from the remote repository on GitHub."

### 資料2: GitHub公式サイト（github.com）のトップページ説明文

- 出典URL: https://github.com/
- 取得日: 2026-07-10
- 取得方法: WebFetchでHTMLをmarkdown変換したテキストとして取得（実際のブラウザでの実表示・レイアウトを見たものではない）
- 状態: **トップページのキャッチコピー本文のみ取得済み**。画面構成・レイアウト・ボタン等の実機確認は未実施（`verification.md`参照）。
- 取得できた本文（WebFetch変換テキスト、2026-07-10）:
  - 見出し: "The future of building happens together"
  - サブ見出し: "Tools and trends evolve, but collaboration endures. With GitHub, developers, agents, and code come together on one platform."
- 注記: 取得テキストにはGitHub Copilot関連のCTA（宣伝リンク）も含まれていたが、GH-001（GitHubとは何かの概念導入）の対象外のため本source-packには取り込まない。ボタン名・配置・実表示はWindowsブラウザでの実機未確認であり、確認済みとしては扱わない。

## 教材化にあたっての方針

GH-001は「GitHubとは何か」という**概念導入**の教材である。このため、本source-packでは以下に限定して資料化した。

- GitHubというサービスの目的・提供価値（何のためのサービスか）
- 教材内で使う可能性のある基本用語（リポジトリ）の説明

以下は本教材の対象外とし、今回のsource-packには含めない。

- 具体的な画面のボタン名・メニュー名・操作手順（`verification.md`参照。実機確認を経ていないため教材の対象外とする）
- コミット・ブランチ・マージ・プルリクエストなどの実践的操作方法（GH-002以降の教材候補）

## 教材化に不要な情報の除外

公式ドキュメントには、GitHub Copilot・GitHub Actions・Enterprise向け機能など、GH-001（GitHubとは何かという最初の一歩）には不要な情報も含まれる。これらはGH-001のfacts/lessonには含めず、将来の教材テーマの候補としてのみ記録する（本ファイルの対象外）。
