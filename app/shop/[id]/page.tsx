'use client';

import { useParams, useRouter } from 'next/navigation';
import shops from '@/src/data/shops.json';

export default function ShopDetail() {
  const router = useRouter();
  const params = useParams();
  const shop = shops.find((s) => s.id === Number(params.id));

  if (!shop) return <div>お店が見つかりません</div>;

  return (
    <div className="p-4">
      <img src={shop.image} alt={shop.name} className="w-full h-64 object-cover rounded mb-4" />
      <h1 className="text-2xl font-bold mb-2">{shop.name}</h1>
      <p className="text-sm text-gray-600 mb-1">
        {shop.area}・{shop.genre}
      </p>
      <p className="text-yellow-600 font-semibold mb-2">★ {shop.rating}</p>
      <p className="mb-4">{shop.description}</p>


      {/* フォーム埋め込み */}
      <iframe
        src="https://form.run/embed/@brownyi-u-we-8l83mwAb1p6fv8o2R0vo?embed=direct"
        width="100%"
        height="600"
        frameBorder="0"
        title="フォーム"
      />

      <button
        onClick={() => router.back()}
        className="mt-4 mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      >
        ← 一覧に戻る
      </button>

    </div>
  );
}
