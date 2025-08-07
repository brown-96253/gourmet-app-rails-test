# gourmet-app

Next.js と Rails API で構築した、シンプルなグルメ情報共有アプリ「Your Menu」
React と TypeScript を活用しながら、フルスタック開発およびフロントエンドとバックエンドの連携を学習中です。

## スクリーンショット

<img src="screenshots/TOP.webp" alt="トップページ" width="600" />

## 主な機能

- 飲食店一覧の表示（Rails API から動的に取得）
- エリア・ジャンル・店舗名による検索・フィルター機能
- Tailwind CSSによるレスポンシブデザイン調整
- お気に入り登録ボタン（localStorage に保存）
- レビュー投稿フォーム
- テストコード

## 使用技術

### フロントエンド
- Next.js（App Router）
- React
- TypeScript
- Tailwind CSS

### バックエンド
- Ruby on Rails（API モード）
- PostgreSQL

### デプロイ・その他
- Railway（フロントエンド・バックエンド両方）
- Git / GitHub

## アーキテクチャ構成

- **フロントエンド**: `https://gourmet-app-rails-test-production.up.railway.app`
- **バックエンドAPI**: `https://web-production-869b6.up.railway.app/api/posts`
- **CORS設定**: フロントエンドからのAPI アクセスを許可
- **データベース**: PostgreSQL（Railway提供）

## 今後の予定

- テストコードの改善

- お気に入り機能のブラッシュアップ（localStorageの活用）
- アクセシビリティの改善

## 起動方法

### フロントエンド（ローカル開発）
```bash
cd frontend
npm install
npm run dev
```

### バックエンド（ローカル開発）
```bash
cd rails-backend-app
bundle install
rails db:create db:migrate db:seed
rails server
```