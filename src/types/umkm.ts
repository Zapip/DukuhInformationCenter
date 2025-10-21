interface lokasi {
    latitude: number;
    longitude: number;
    alamat?: string;
}

interface umkm {
    id: string;
    nama_usaha: string;
    kategori: string;
    deskripsi?: string;
    lokasi: lokasi;
    link_maps?: string;
    image?: string;
    kontak?: string;
    timestamp?: string | Date;
}

export type { umkm, lokasi };