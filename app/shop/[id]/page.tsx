'use client';

import { useParams, useRouter } from 'next/navigation';
import shops from '@/src/data/shops.json';

export default function ShopDetail() {
  const router = useRouter();
  const params = useParams();
  const shop = shops.find((s) => s.id === Number(params.id));

  if (!shop) return <div>お店が見つかりません</div>;

  return (
    <div className="no-background mx-auto max-w-[1340px] p-10">

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
      <p className="mb-20">{shop.description}</p>


      {/* フォーム埋め込み */}
      <iframe
        src="https://form.run/embed/@brownyi-u-we-8l83mwAb1p6fv8o2R0vo?embed=direct"
        width="100%"
        height="500"
        frameBorder="0"
        title="フォーム"
      />

    </div>
  );
}
