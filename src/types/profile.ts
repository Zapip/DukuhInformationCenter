interface Profile {
    id: string
    name: string
    deskripsi: string
    total_penduduk: number
    total_umkm: number
    total_fasilitas_umum: number
    nama_kontak: string
    kontak: string
    created_at: string
    updated_at: string
}

interface ProfileImage {
    id: string
    profile_id: string
    image_url: string
    order_index: number
    created_at: string
}

export type { Profile, ProfileImage };