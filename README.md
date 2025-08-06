# gourmet-app

Next.js と Tailwind CSS で構築した、シンプルなグルメ情報共有アプリ「Your Menu」
React と TypeScript の理解を深めながら、機能やUI・UXを段階的に改善中です。

## スクリーンショット

<img src="screenshots/TOP.webp" alt="トップページ" width="600" />

## 主な機能

- 飲食店一覧表示（Rails API から動的に取得した JSON データを元に表示）
- 店舗詳細ページ（App Routerによる動的ルーティング）
- Tailwind CSSによるレスポンシブデザイン調整
- エリア・ジャンル・店舗名による検索・フィルター機能
- お気に入り登録ボタン（localStorage に保存）
- レビュー投稿フォーム
- テストコード

## 使用技術

- Next.js（App Router / CSR）
- React
- TypeScript
- Tailwind CSS
- Git / GitHub
- Rails API（PostgreSQL）

## 今後の予定

- お気に入り登録したアイテムのみを表示する機能の実装
- アクセシビリティの改善
- デザイン調整

## 起動方法

```bash
npm install
npm run dev
npm test
```