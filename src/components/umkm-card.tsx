import Image from "next/image";
import { JelajahDukuh } from "@/types/JelajahDukuh";
import Link from "next/link";

export default function JelajahCard({
    nama_usaha,
    deskripsi,
    image_url,
    link_maps,
    kategori_usaha,
}: JelajahDukuh) {
    return (
        <article className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition p-4">
            <Image
                src={image_url || "/placeholder.jpg"}
                alt={nama_usaha}
                width={400}
                height={250}
                className="w-full h-48 object-cover rounded-lg"
            />
            <section className="mt-3">
                <h3 className="text-lg font-semibold text-gray-800">{nama_usaha}</h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">{deskripsi}</p>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">{kategori_usaha}</p>
                <Link
                    href={link_maps || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                    Lihat di Maps
                </Link>
            </section>
        </article>
    );
}
