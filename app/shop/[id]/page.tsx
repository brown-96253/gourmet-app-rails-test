// app/shop/[id]/page.jsx
import shops from '@/src/data/shops.json';

export default function ShopDetail({ params }) {
  const shop = shops.find((s) => s.id === parseInt(params.id));

  if (!shop) return <div>お店が見つかりません</div>;

  return (
    <div className="p-4">
      <img src={shop.image} alt={shop.name} className="w-full h-64 object-cover rounded mb-4" />
      <h1 className="text-2xl font-bold mb-2">{shop.name}</h1>
      <p className="text-sm text-gray-600 mb-1">{shop.area}・{shop.genre}</p>
      <p className="text-yellow-600 font-semibold mb-2">★ {shop.rating}</p>
      <p>{shop.description}</p>
    </div>
  );
}
