// interface lokasi {
//     latitude: number;
//     longitude: number;
//     alamat?: string;
// }

interface umkm {
    id: string;
    nama_usaha: string;
    kategori_usaha: string;
    deskripsi?: string;
    lokasi: string
    link_maps?: string;
    image: string;
    kontak: string;
    timestamp?: string | Date;
}

export type { umkm };