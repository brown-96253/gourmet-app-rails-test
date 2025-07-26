'use client';

import { useState } from 'react';
import Link from 'next/link';
import shops from '../src/data/shops.json';
import ShopCard from '@/components/ShopCard';

export default function Home() {
  const [selectedArea, setSelectedArea] = useState('すべて');

  const areas = ['すべて', ...new Set(shops.map((shop) => shop.area))];
  const genres = ['すべて', ...new Set(shops.map((shop) => shop.genre))];

  const filteredShops =
    selectedArea === 'すべて'
      ? shops
      : shops.filter((shop) => shop.area === selectedArea);

  return (
    <div className="p-4">
      <div className="mb-4">
        <label htmlFor="area" className="mr-2 font-bold">
          エリア:
        </label>
        <select
          id="area"
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          className="border rounded px-2 py-1"
        >
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shops.map((shop) => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
    </main>
    </div >
  );
}
