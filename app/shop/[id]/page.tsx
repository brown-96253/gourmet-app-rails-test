"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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

export default function ShopDetail() {
  const router = useRouter();
  const params = useParams();
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 環境変数の設定確認とフォールバック
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        const url = `${apiUrl}/api/posts/${params.id}`;
        
        console.log("Fetching shop from:", url);
        
        const res = await fetch(url, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
        });
        
        console.log("Response status:", res.status);
        console.log("Response headers:", Object.fromEntries(res.headers.entries()));
        
        if (!res.ok) {
          // より詳細なエラー情報を取得
          const errorText = await res.text();
          console.error("API Error:", errorText);
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        
        const data = await res.json();
        console.log("Fetched shop data:", data);
        setShop(data);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error instanceof Error ? error.message : "不明なエラーが発生しました");
        setShop(null);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchShop();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="no-background mx-auto max-w-[1340px] pt-10 px-10 pb-50">
        <p>読み込み中...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="no-background mx-auto max-w-[1340px] pt-10 px-10 pb-50">
        <button
          onClick={() => router.push("/")}
          className="mt-4 mb-10 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
        >
          <strong>← </strong>一覧に戻る
        </button>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <h2 className="font-bold">エラーが発生しました</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            再試行
          </button>
        </div>
      </div>
    );
  }
  
  if (!shop) {
    return (
      <div className="no-background mx-auto max-w-[1340px] pt-10 px-10 pb-50">
        <button
          onClick={() => router.push("/")}
          className="mt-4 mb-10 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
        >
          <strong>← </strong>一覧に戻る
        </button>
        <p>お店が見つかりません</p>
      </div>
    );
  }

  return (
    <div className="no-background mx-auto max-w-[1340px] pt-10 px-10 pb-50">
      <button
        onClick={() => router.push("/")}
        className="mt-4 mb-10 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
      >
        <strong>← </strong>一覧に戻る
      </button>
      <h1 className="text-2xl font-bold mb-2">{shop.name}</h1>
      <p className="text-sm text-gray-600 mb-1">
        {shop.area}・{shop.genre}
      </p>
      <p className="font-semibold mb-2" style={{ color: "#B8860B" }}>★ {shop.rating}</p>
      <img src={shop.image} alt={shop.name} className="w-80 h-80 mx-auto object-cover rounded mb-15" />
      <p className="mb-30">{shop.description}</p>

      {/* フォーム */}
      <div className="rounded mx-auto max-w-[1340px]">
        <h2 className="text-lg font-bold mb-4">レビュー投稿</h2>
        <form
          action="https://formspree.io/f/mblkkyzv"
          method="POST"
        >
          {/* honeypot */}
          <input type="text" name="_gotcha" style={{ display: "none" }} />

          <label className="block mb-2">
            お名前
            <input
              type="text"
              name="name"
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </label>

          <label className="block mb-2">
            メールアドレス
            <input
              type="email"
              name="email"
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </label>

          <label className="block mb-4">
            レビュー
            <textarea
              name="message"
              required
              rows={5}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </label>

          <button
            type="submit"
            className="bg-black text-white border border-black py-2 px-4 rounded hover:scale-105 
              transition duration-200 cursor-pointer"
          >
            送信
          </button>

        </form>
      </div>

    </div>
  );
}
