# Dukuh Information Center

Aplikasi web ini berfungsi sebagai **pusat informasi terpusat untuk Padukuhan Dukuh** dan segala informasi yang berhubungan dengannya. Fokus utama saat ini adalah menampilkan data UMKM (Usaha Mikro, Kecil, dan Menengah) setempat.

-----

## 🚀 Fitur Utama

  * **Halaman Beranda Interaktif:** Menyambut pengguna dengan animasi teks yang menarik menggunakan GSAP (`SplitText` dan `AnimatedContent`).
  * **Eksplorasi UMKM:** Halaman `/explore` untuk menampilkan daftar UMKM yang datanya diambil dari **Firebase Firestore**.
  * **Detail UMKM:** Menampilkan informasi rinci UMKM dalam modal dialog yang interaktif.
  * **CRUD Firestore:** Menyediakan fungsi untuk mengambil, menambah, memperbarui, dan menghapus data UMKM.
  * **Halaman Admin:** Terdapat rute `/admin` untuk manajemen data di masa depan (saat ini hanya berupa *placeholder* "Admin Page").

-----

## 🛠️ Teknologi yang Digunakan

Aplikasi ini dibangun menggunakan tumpukan teknologi modern:

| Kategori | Teknologi | Detail |
| :--- | :--- | :--- |
| **Framework** | **Next.js 15+** | Dengan App Router. |
| **Bahasa** | **TypeScript** | Untuk penulisan kode yang lebih aman dan terstruktur. |
| **Styling** | **Tailwind CSS 4.x** | Kerangka kerja CSS utilitas. |
| **Komponen UI** | **shadcn/ui** | Berbasis **Radix UI** dan `class-variance-authority`. |
| **Database** | **Firebase (Firestore, Storage)** | Digunakan untuk menyimpan data UMKM dan gambar. |
| **Animasi** | **GSAP & Framer Motion** | Untuk animasi konten yang halus dan interaktif. |
| **Ikon** | **Lucide React** | Pustaka ikon yang ringkas. |

-----

## ⚙️ Memulai Proyek

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek secara lokal.

### Prasyarat

Pastikan Anda telah menginstal:

  * **Node.js** (Disarankan versi 18 ke atas)
  * Manajer paket pilihan Anda (npm, yarn, pnpm, atau bun)
  * Akun **Firebase** dan sebuah proyek yang telah disiapkan.

### 1\. Instalasi

Clone repositori dan instal dependensi:

```bash
# Ganti dengan perintah yang sesuai untuk repositori Anda
git clone <URL_REPO>
cd dukuh-information-center
# Menggunakan npm:
npm install
# atau menggunakan yarn:
yarn
# atau menggunakan pnpm:
pnpm install
# atau menggunakan bun:
bun install
```

### 2\. Konfigurasi Lingkungan (Firebase)

Buat file bernama `.env.local` di root proyek dan tambahkan kunci konfigurasi Firebase Anda. Kunci ini digunakan di `src/lib/firebase.ts`.

```
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="YOUR_MEASUREMENT_ID"
```

### 3\. Struktur Data Firestore

Pastikan Anda memiliki koleksi `umkm` di Firestore dengan dokumen yang sesuai dengan tipe data di `src/types/umkm.ts`.

Contoh struktur data UMKM:

```typescript
interface lokasi {
    latitude: number;
    longitude: number;
    alamat?: string;
}

interface umkm {
    id: string;
    nama_usaha: string;
    kategori_usaha: string;
    deskripsi?: string;
    lokasi: lokasi;
    link_maps?: string;
    image: string; // URL gambar, mungkin dari Firebase Storage
    kontak: string;
    timestamp?: string | Date;
}
```

*Catatan: Konfigurasi Next.js (`next.config.ts`) memungkinkan pemuatan gambar dari `firebasestorage.googleapis.com` dan `drive.google.com`*.

### 4\. Menjalankan Server Pengembangan

Jalankan server pengembangan dengan perintah berikut:

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
# atau
bun dev
```

Buka [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) dengan browser Anda untuk melihat hasilnya.

-----

## 📁 Struktur Proyek

Berikut adalah ringkasan dari struktur direktori utama:

```
dukuh-information-center/
├── public/                 # Aset statis seperti logo dan favicon
│   └── logo.webp
├── src/
│   ├── app/                # Rute aplikasi Next.js (App Router)
│   │   ├── admin/page.tsx  # Halaman Admin
│   │   ├── explore/page.tsx# Halaman Eksplorasi (UMKM)
│   │   ├── globals.css     # Global CSS (termasuk konfigurasi Tailwind)
│   │   ├── layout.tsx      # Root Layout dan Metadata
│   │   └── page.tsx        # Halaman utama (beranda)
│   ├── components/         # Komponen Reusable
│   │   ├── explore/
│   │   │   └── explore-card.tsx # Kartu UMKM dengan detail Dialog
│   │   ├── ui/             # Komponen UI shadcn/ui kustom (Button, Card, dll.)
│   │   ├── AnimatedContent.tsx  # Komponen wrapper untuk animasi GSAP
│   │   ├── SplitText.tsx   # Komponen untuk animasi teks GSAP
│   │   ├── main-content.tsx# Konten utama halaman beranda
│   │   └── umkm-card.tsx   # Komponen tampilan kartu UMKM sederhana
│   ├── lib/                # Library dan Utilitas
│   │   ├── firebase.ts     # Inisialisasi Firebase
│   │   ├── firestore.ts    # Fungsi CRUD Firebase Firestore (UMKM, Profile)
│   │   └── utils.ts        # Fungsi utilitas (cn untuk classnames)
│   └── types/              # Definisi Tipe TypeScript
│       └── umkm.ts         # Interface untuk data UMKM dan lokasi
├── next.config.ts          # Konfigurasi Next.js (termasuk domain gambar)
├── package.json            # Daftar dependensi dan script
└── tsconfig.json           # Konfigurasi TypeScript
```

-----

## 🌐 Deployment

Cara termudah untuk mendeploy aplikasi Next.js Anda adalah dengan menggunakan [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Lihat [dokumentasi deployment Next.js](https://nextjs.org/docs/app/building-your-application/deploying) untuk detail lebih lanjut.
