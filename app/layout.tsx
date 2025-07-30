import './globals.css';
import { Noto_Serif_JP } from 'next/font/google';

const notoSerif = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata = {
  title: 'Your Menu',
  description: 'あなたのおすすめのお店',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={notoSerif.className}>
        {children}
      </body>
    </html>
  );
}