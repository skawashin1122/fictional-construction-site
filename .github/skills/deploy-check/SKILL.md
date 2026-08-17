---
name: deploy-check
description: GitHub Pages公開前の相対パスエラーをチェックし、Gitコミット＆プッシュを実行するスキル
user-invocable: true
---

# デプロイ前チェック＆公開スキル

## 実行ステップ
1. **パスチェック:**
   - `index.html` や `css/style.css` 内のリンクが、ルート相対パス（`/css/...`）ではなく、**相対パス（`./css/...` または `css/...`）** になっているか検証する（GitHub Pagesのサブディレクトリ404エラーを防ぐため）。
2. **変更のステージングとコミット:**
   - `git status` を確認し、適切なコミットメッセージ（Conventional Commits 形式）を作成してコミット。
3. **リモートへのプッシュ:**
   - `git push origin main` を実行。
4. **公開URLの案内:**
   - `https://<ユーザー名>.github.io/<リポジトリ名>/` をユーザーに提示。
