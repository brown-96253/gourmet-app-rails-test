"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

type Shop = {
  id: string;
  name: string;
  area: string;
  genre: string;
  image: string;
  description: string;
};

export default function ShopCard({ shop }: { shop: Shop }) {
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
      <div className="rounded bg-white/60 flex flex-col h-full pt-15 px-9 pb-11 shadow-lg hover:shadow-2xl transition-shadow relative">
        <img
          src={shop.image}
          alt={shop.name}
          className="w-full h-40 object-cover mb-5"
        />
        <h2 className="text-xl font-bold">{shop.name}</h2>
        <p className="text-sm text-gray-600">{shop.area}・{shop.genre}</p>
        <p className="text-yellow-600 font-semibold">★ {shop.rating}</p>
        <p>{shop.description}</p>

        {/* お気に入りハート */}
        <button
          onClick={toggleFavorite}
          className="absolute bottom-2 right-2 w-8 h-8"
          aria-label="お気に入り"
        >
          <img
            src={isFavorite ? "/images/heart-clicked.png" : "/images/heart-default.png"}
            alt={isFavorite ? "お気に入り済み" : "お気に入りに追加"}
            className="w-8 h-8 object-contain transition-transform duration-200 hover:scale-110 cursor-pointer"
          />
        </button>
      </div>
    </Link>
  );
}
