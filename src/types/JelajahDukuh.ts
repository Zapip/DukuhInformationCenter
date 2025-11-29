export const KATEGORI = [
  'UMKM',
  'Produsen',
  'Wisata',
  'Kuliner',
  'Kerajinan',
  'Jasa',
  'Lainnya'
] as const

interface JelajahDukuh {
    id: string;
    nama_usaha: string;
    kategori_usaha: string;
    deskripsi: string;
    lokasi: string
    link_maps?: string;
    image_url: string;
    kontak: string;
    timestamp?: string | Date;
}

export type { JelajahDukuh };