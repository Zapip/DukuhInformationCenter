import Image from "next/image";
import { umkm } from "@/types/umkm";

export default function UmkmCard({
    nama_usaha,
    deskripsi,
    image,
    link_maps,
    kategori_usaha,
}: umkm) {
    return (
        <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition p-4">
            <Image
                src={image || "/placeholder.jpg"}
                alt={nama_usaha}
                width={400}
                height={250}
                className="w-full h-48 object-cover rounded-lg"
            />
            <div className="mt-3">
                <h3 className="text-lg font-semibold text-gray-800">{nama_usaha}</h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">{deskripsi}</p>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">{kategori_usaha}</p>
                <a
                    href={link_maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                    Lihat di Maps
                </a>
            </div>
        </div>
    );
}
