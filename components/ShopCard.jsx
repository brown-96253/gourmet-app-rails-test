// components/ShopCard.jsx
import Link from "next/link";

export default function ShopCard({ shop }) {
  return (
    <Link href={`/shop/${shop.id}`}>
      <div className="border p-4 rounded shadow hover:shadow-lg transition">
        <img src={shop.image} alt={shop.name} className="w-full h-40 object-cover rounded mb-2" />
        <h2 className="text-xl font-bold">{shop.name}</h2>
        <p className="text-sm text-gray-600">{shop.area}・{shop.genre}</p>
        <p className="text-yellow-600 font-semibold">★ {shop.rating}</p>
        <p>{shop.description}</p>
      </div>
    </Link>
  );
}