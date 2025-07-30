"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./ShopCard.module.css";
import { Noto_Serif_JP } from 'next/font/google';

const notoSerif = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
});
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

export default function ShopCard({
  shop,
  index,
}: {
  shop: Shop;
  index: number;
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [tapeSrc, setTapeSrc] = useState<string | null>(null);

  useEffect(() => {
    const tapes = ["/images/tape-1.png", "/images/tape-2.png", "/images/tape-3.png"];

    const shouldShowTape = index % 4 === 0;

    if (shouldShowTape) {
      const randomIndex = Math.floor(Math.random() * tapes.length);
      setTapeSrc(tapes[randomIndex]);
    }

    const stored = localStorage.getItem("favorites");
    if (stored) {
      const favIds = JSON.parse(stored);
      setIsFavorite(favIds.includes(shop.id));
    }
  }, [shop.id, index]);



  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const stored = localStorage.getItem("favorites");
    const favIds = stored ? JSON.parse(stored) : [];

    let updatedFavs;
    if (favIds.includes(shop.id)) {
      updatedFavs = favIds.filter((id: number) => id !== shop.id);
    } else {
      updatedFavs = [...favIds, shop.id];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavs));
    setIsFavorite(!isFavorite);
  };

  return (
    <Link href={`/shop/${shop.id}`}>
      <div className={`w-[325px] h-[475px] rounded bg-white/60 flex flex-col pt-15 px-9 pb-11 shadow-lg hover:shadow-2xl transition-shadow relative ${styles.card}`}>
        {/* マスキングテープ画像 */}
        {tapeSrc && (
          <img
            src={tapeSrc}
            alt="マスキングテープ"
            className={styles.tape}
          />
        )}

        <img
          src={shop.image}
          alt={shop.name}
          className="w-50 h-50 mx-auto object-cover mb-5"
        />
        <h2 className="text-xl font-bold leading-relaxed">{shop.name}</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          {shop.area}・{shop.genre}
        </p>
        <p
          className={`${notoSerif.className} font-semibold leading-relaxed`}
          style={{ color: '#B8860B', fontSize: '19px' }}
        >
          ★ {shop.rating}
        </p>
        <p className="leading-relaxed">{shop.description}</p>


        {/* お気に入りハート */}
        <button
          onClick={toggleFavorite}
          className="absolute top-4 right-3 w-8 h-8"
          aria-label="お気に入り"
        >
          <img
            src={isFavorite ? "/images/heart-clicked.png" : "/images/heart-default.png"}
            alt={isFavorite ? "お気に入り済み" : "お気に入りに追加"}
            className="w-7 h-7 object-contain transition-transform duration-200 hover:scale-110 cursor-pointer"
          />
        </button>
      </div>
    </Link>
  );
}
