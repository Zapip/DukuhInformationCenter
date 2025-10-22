"use client";

import { useEffect, useState } from "react";
import { getAllUMKM } from "@/lib/firestore";
import UmkmCard from "@/components/umkm-card";
import { umkm } from "@/types/umkm";


export default function HomePage() {
  const [umkmList, setUmkmList] = useState<umkm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllUMKM();
      setUmkmList(data as umkm[]);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg animate-pulse">Memuat data UMKM...</p>
      </div>
    );

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">
        Dukuh Information Center
      </h1>

      {umkmList.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada data UMKM.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {umkmList.map((item) => (
            <UmkmCard key={item.id} {...item} />
          ))}
        </div>
      )}
    </main>
  );
}
