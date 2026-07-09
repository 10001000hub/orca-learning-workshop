# Verification: GH-001 GitHubとは何か

## 実機確認の状況

**未実施**。本教材（GH-001）は概念導入（GitHubというサービスが何かを理解する）を目的としており、workshop.jsonも `guided_observation`（ブラウザを開く程度の軽い確認のみ）としているため、GitHub画面上の具体的な操作・ボタン押下を伴う実機確認は本バージョンでは行っていない。

これは手を抜いたのではなく、方針上の判断である。[VALIDATION_POLICY.md](../../../docs/VALIDATION_POLICY.md)の「未確認UI操作は教材に入れない」ルールに従い、実機確認が済んでいない段階では、教材側もUI操作を要求しない設計（概念説明のみ）にとどめている。

## 確認できていること

- `source-pack.md`に記載した内容は、GitHub公式ドキュメントページ（2026-07-09時点で取得可能な公開ページ）に基づく。これは一次資料の確認であり、実機（実際のブラウザ操作・実際の画面）での確認ではない。

## 確認できていないこと（今後の課題）

- github.com のトップページ・サインアップ画面の実際の文言・レイアウト・ボタン名
- Windows環境のブラウザ（Chrome/Edge/Firefox）でgithub.comを開いた際の実際の見え方
- 上記が未確認であるため、`metadata.yaml`の`verified_on`は`null`、`confidence`は`0`のままとする

## 次回実機確認時に行うこと

1. Windows環境の対応ブラウザでgithub.comを開き、実際に表示される文言・要素を記録する。
2. 記録した内容でこの`verification.md`を更新し、`source-pack.md`の資料2を確定させる。
3. `metadata.yaml`の`verified_on`と`confidence`を、確認済みの内容に応じて更新する。
4. 実機確認によってUI操作を伴う実習が可能と判断された場合のみ、`workshop.json`の実習内容を拡充する（現時点では拡充しない）。
