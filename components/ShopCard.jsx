"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ShopCard({ shop }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      const favIds = JSON.parse(stored);
      setIsFavorite(favIds.includes(shop.id));
    }
  }, [shop.id]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    const stored = localStorage.getItem("favorites");
    const favIds = stored ? JSON.parse(stored) : [];

    let updatedFavs;
    if (favIds.includes(shop.id)) {
      updatedFavs = favIds.filter((id) => id !== shop.id);
    } else {
      updatedFavs = [...favIds, shop.id];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavs));
    setIsFavorite(!isFavorite);
  };

  return (
    <Link href={`/shop/${shop.id}`}>
      <div className="border p-4 rounded shadow hover:shadow-lg transition relative">
        <img src={shop.image} alt={shop.name} className="w-full h-40 object-cover rounded mb-2" />
        <h2 className="text-xl font-bold">{shop.name}</h2>
        <p className="text-sm text-gray-600">{shop.area}・{shop.genre}</p>
        <p className="text-yellow-600 font-semibold">★ {shop.rating}</p>
        <p>{shop.description}</p>

        {/* ❤️ お気に入りボタン */}
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 text-2xl"
          aria-label="お気に入り"
        >
          {isFavorite ? "❤️" : "♡"}
        </button>
      </div>
    </Link>
  );
}
