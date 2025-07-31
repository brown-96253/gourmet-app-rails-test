'use client';

import { useParams, useRouter } from 'next/navigation';
import shops from '@/src/data/shops.json';

export default function ShopDetail() {
  const router = useRouter();
  const params = useParams();
  const shop = shops.find((s) => s.id === Number(params.id));

  if (!shop) return <div>お店が見つかりません</div>;

  return (
    <div className="no-background mx-auto max-w-[1340px] pt-10 px-10 pb-50">

      <button
        onClick={() => router.push('/')}
        className="mt-4 mb-10 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
      >
        <strong>← </strong>一覧に戻る
      </button>
      <h1 className="text-2xl font-bold mb-2">{shop.name}</h1>
      <p className="text-sm text-gray-600 mb-1">
        {shop.area}・{shop.genre}
      </p>
      <p className="font-semibold mb-2" style={{ color: '#B8860B' }}>★ {shop.rating}</p>
      <img src={shop.image} alt={shop.name} className="w-80 h-80 mx-auto object-cover rounded mb-15" />
      <p className="mb-30">{shop.description}</p>


      {/* フォーム */}
      <div className="rounded  mx-auto max-w-[1340px]">
        <h2 className="text-lg font-bold mb-4">レビュー投稿</h2>
        <form
          action="https://formspree.io/f/mblkkyzv"
          method="POST"
        >
          {/* honeypot */}
          <input type="text" name="_gotcha" style={{ display: 'none' }} />

          <label className="block mb-2">
            お名前
            <input
              type="text"
              name="name"
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </label>

          <label className="block mb-2">
            メールアドレス
            <input
              type="email"
              name="email"
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </label>

          <label className="block mb-4">
            レビュー
            <textarea
              name="message"
              required
              rows={5}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </label>

          <button
            type="submit"
            className="bg-black text-white border border-black py-2 px-4 rounded hover:scale-105 
              transition duration-200 cursor-pointer"
          >
            送信
          </button>

        </form>
      </div>

    </div>
  );
}
