'use client';

import { useState } from 'react';
import Link from 'next/link';
import shops from '../src/data/shops.json';
import ShopCard from '@/components/ShopCard';

export default function Home() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedArea, setSelectedArea] = useState('すべて');
  const [selectedGenre, setSelectedGenre] = useState('すべて');

  // ユニークなエリア・ジャンルを抽出
  const areas = ['すべて', ...new Set(shops.map((shop) => shop.area))];
  const genres = ['すべて', ...new Set(shops.map((shop) => shop.genre))];

  // 絞り込みロジック
  const filteredShops = shops.filter((shop) => {
    const matchArea = selectedArea === 'すべて' || shop.area === selectedArea;
    const matchGenre = selectedGenre === 'すべて' || shop.genre === selectedGenre;
    const matchKeyword = shop.name.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchArea && matchGenre && matchKeyword;
  });

  return (
    <div className="p-30">
      {/* フィルターUI */}
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-10">
        <div>
          <label htmlFor="area" className="block font-bold mb-1">
            エリア:
          </label>
          <select
            id="area"
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="border bg-white/60 border-gray-100 rounded px-2 py-2 w-full"
          >
            {areas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="genre" className="block font-bold mb-1">
            ジャンル:
          </label>
          <select
            id="genre"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="border bg-white/60 border-gray-100 rounded px-2 py-2 w-full"
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex-1">
          <label htmlFor="search" className="block font-bold mb-1">
            店舗名で検索:
          </label>
          <input
            type="text"
            id="search"
            placeholder="例：カフェ"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="border bg-white/60 border-gray-100 rounded px-2 py-2 w-full"
          />
        </div>
      </div>

      {/* 店舗カード */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredShops.length > 0 ? (
          filteredShops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))
        ) : (
          <p>条件に一致する店舗がありません。</p>
        )}
      </main>
    </div>
  );
}
