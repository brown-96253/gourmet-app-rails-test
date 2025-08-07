'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ShopCard from '@/components/ShopCard';

type Shop = {
  id: number;
  name: string;
  genre: string;
  rating: number;
  address: string;
  image: string;
  description: string;
  area: string;
};

export default function Home() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedArea, setSelectedArea] = useState('すべて');
  const [selectedGenre, setSelectedGenre] = useState('すべて');
  const [showTopButton, setShowTopButton] = useState(false);
  
  console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
  
  useEffect(() => {
    async function fetchShops() {
      setLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        console.log('Fetching from:', `${apiUrl}/api/posts`);
        
        const res = await fetch(`${apiUrl}/api/posts`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        
        console.log('Response status:', res.status);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log('Fetched data:', data);
        setShops(data);
      } catch (e) {
        console.error('Fetch error:', e);
        setShops([]);
      } finally {
        setLoading(false);
      }
    }
    fetchShops();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 100);
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);  

  const areas = ['すべて', ...new Set(shops.map((shop) => shop.area))];
  const genres = ['すべて', ...new Set(shops.map((shop) => shop.genre))];

  const filteredShops = shops.filter((shop) => {
    const matchArea = selectedArea === 'すべて' || shop.area === selectedArea;
    const matchGenre = selectedGenre === 'すべて' || shop.genre === selectedGenre;
    const matchKeyword = shop.name.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchArea && matchGenre && matchKeyword;
  });

  if (loading) {
    return <p>読み込み中...</p>;
  }

  return (
    <div className="with-background">
      <div id="top" className="mx-auto max-w-[1340px] with-background pt-15 lg:pt-25 pb-50 px-10 lg:px-30">
        {/* ▼ ロゴ画像 */}
        <div className="flex justify-center mb-15 lg:mb-25">
          <picture>
            {/* 640px未満 */}
            <source srcSet="/images/title-sp.webp" media="(max-width: 639px)" />
            {/* デフォルト（640px以上） */}
            <img
              src="/images/title.webp"
              alt="Your Menu"
              className="w-[640px] h-auto object-contain mx-auto"
            />
          </picture>

        </div>
        {/* フィルターUI */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-7 mb-25">
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
              キーワード検索:
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
        <main
          className="
            grid grid-cols-1 
            lg:grid-cols-2 
            xl:grid-cols-3 
            gap-x-6 gap-y-15
            lg:gap-x-10 lg:gap-y-30
            xl:gap-x-16 xl:gap-y-16
            max-w-[1340px] mx-auto justify-items-center
          "
        >
          {filteredShops.length > 0 ? (
            filteredShops.map((shop, index) => (
              <ShopCard key={shop.id} shop={shop} index={index} />
            ))
          ) : (
            <p>条件に一致する店舗がありません。</p>
          )}
        </main>

        {/* ページトップに戻るボタン */}
        <Link
          href="#top"
          scroll={true}
          className={`fixed bottom-12 right-5 z-50 w-12 h-12 sm:w-14 sm:h-14 cursor-pointer hover:scale-110 transition-opacity duration-500 ${showTopButton ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <img
            src="/images/top.png"
            alt="トップに戻る"
            className="w-20 h-20 object-contain"
          />
        </Link>

      </div>
    </div>
  );
}
