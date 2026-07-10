# ORCA-004 source pack

確認日: 2026-07-10

- GitHub CLIの`gh repo create`は、既存ローカルリポジトリからGitHubリポジトリを作り、remote追加とpushを対話的に行える。事前にコマンドラインでGitHub認証が必要。出典: https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github
- 認証トークンは平文でコマンドラインへ渡さず、コードへ直書きせず、リポジトリへpushしない。出典: https://docs.github.com/en/rest/authentication/keeping-your-api-credentials-secure
