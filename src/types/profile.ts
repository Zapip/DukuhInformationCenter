interface Profile {
    id: string;
    nama: string;
    umur: number;
    alamat: string;
    pekerjaan: string;
    bio?: string;
    foto_profil_url?: string;
}

export type { Profile };