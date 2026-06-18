
<div align="center">

<img src="koni.png" alt="KONI Logo" width="100" height="100" />

# 🏅 KONI Kabupaten Banyumas
### Sistem Informasi Manajemen Olahraga Daerah

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4.2-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-v7.1-CA4245?style=flat-square&logo=reactrouter)](https://reactrouter.com/)
[![GSAP](https://img.shields.io/badge/GSAP-v3.15-88CE02?style=flat-square&logo=greensock)](https://greensock.com/gsap/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**Tugas UAS · Pemrograman Web Lanjut · Universitas Muhammadiyah Purwokerto**

[🌐 Demo](#) · [📋 Fitur](#-fitur-utama) · [🚀 Instalasi](#-instalasi) · [📁 Struktur](#-struktur-folder) · [✨ Animasi GSAP](#-animasi-interaktif-gsap)

</div>

---

## 📖 Tentang Proyek

Sistem Informasi KONI Kabupaten Banyumas adalah aplikasi web yang dikembangkan untuk mendigitalisasi pengelolaan data olahraga di **Komite Olahraga Nasional Indonesia (KONI) Kabupaten Banyumas**, Jawa Tengah.

Sebelumnya, seluruh proses pencatatan data atlet, pelatih, kegiatan, hingga presensi latihan masih dilakukan secara **manual menggunakan kertas**. Aplikasi ini hadir sebagai solusi terintegrasi yang menghubungkan admin, pelatih, atlet, dan wasit dalam satu platform.

> 🎯 Proyek ini dikembangkan berdasarkan hasil wawancara langsung dengan **Triani Budi Lestari, S.E.** selaku Wakil Sekretaris Umum KONI Kab. Banyumas.

---

## ✨ Fitur Utama

### 🌐 Landing Page Publik
| Fitur | Keterangan |
|---|---|
| **Ticker Pengumuman** | Teks berjalan otomatis, klik untuk baca detail pengumuman |
| **Berita & Artikel** | Halaman list + detail dengan rich text content |
| **Agenda Kegiatan** | Filter kegiatan mendatang vs selesai, detail per event |
| **Galeri Foto** | Grid galeri dengan filter kategori + lightbox fullscreen |
| **Bagan Pengurus** | Struktur organisasi visual bertingkat (L1–L4) |
| **Data Cabor** | 22+ cabang olahraga aktif KONI Banyumas |
| **Animasi Imersif** | Efek scroll, drag, timeline, dan count-up bilangan menggunakan GSAP |

### 🔒 Panel Admin (Dashboard CRUD)
| Fitur | Keterangan |
|---|---|
| **CRUD Data Atlet** | Kelola biodata, cabor, status aktif/tidak aktif, pembuatan akun login |
| **CRUD Data Pelatih** | Kategori pelatih (Koordinator, Fisik, Teknik, Taktik) & status |
| **CRUD Data Wasit/Juri** | Kelola biodata, lisensi, grade wasit, & pembuatan akun login |
| **CRUD Data Cabor** | Kelola nama cabor, induk organisasi, singkatan, & toggle status |
| **Rekap Prestasi** | Filter prestasi by grade: Daerah / Nasional / Internasional, level medali |
| **Kelola Konten** | Publikasi berita, pengumuman, agenda kegiatan, galeri foto, bagan pengurus |
| **Rich Text Editor** | Terintegrasi Quill.js (heading, bold, image, link, text formatting) |

### 👤 Dashboard Per Role (User Access)
| Role | Fitur Utama |
|---|---|
| **Pelatih** | Profil · Program Latihan (Bulanan/Harian) · Input Presensi Atlet · Upload Sertifikat |
| **Atlet** | Profil · Riwayat Presensi · Prestasi & Medali · Upload Piagam Penghargaan |
| **Wasit** | Profil · Input & Riwayat Pertandingan Terpilih · Upload Lisensi Wasit (Gambar/PDF) |

---

## 🛠️ Tech Stack

```
Frontend
├── React 19            → UI Library (terkini dengan Virtual DOM optimal)
├── Vite 8              → Next-generation build tool & high-speed dev server
├── React Router v7     → Client-side & nested routing, layout outlet
├── Context API         → Global state management
├── Tailwind CSS v4     → Engine styling utilitas super cepat dengan @tailwindcss/vite
├── GSAP (GreenSock)    → Animasi performa tinggi untuk interaktivitas visual
├── Axios               → HTTP client untuk komunikasi REST API (jwt request interceptor)
└── Quill.js (CDN)      → Rich text editor untuk kelola konten admin

Backend (REST API)
├── Node.js + Express   → REST API server
├── MySQL (mysql2)      → Sistem database relasional dengan Connection Pool
├── JWT (jsonwebtoken)  → Sistem keamanan token otentikasi
├── Multer              → Middleware penanganan upload file
└── Bcrypt              → Enkripsi password & secure hashing
```

---

## ✨ Animasi Interaktif (GSAP)

Proyek ini memanfaatkan **GSAP (GreenSock Animation Platform)** dan `@gsap/react` untuk menciptakan visual landing page yang dinamis dan berkelas premium:

1. **Count-Up Statistik (Landing Page Stats)**:
   Angka total atlet, cabor, pelatih, dan wasit beranimasi bertambah secara dinamis dari `0` menuju nilai riil database menggunakan `gsap.to()` dengan custom counter ref.
2. **ScrollTrigger Reveal**:
   Setiap section pada halaman publik (Tentang KONI, Visi & Misi, Berita, Event, Galeri) akan muncul dengan transisi fade-in dan slide-up secara mulus saat digulir (scroll) ke viewport pengguna.
3. **Hero Timelines**:
   Menggunakan `gsap.timeline()` untuk menumpuk animasi elemen hero (logo, badge universitas, judul besar, deskripsi, dan tombol CTA) secara runtut saat halaman pertama kali dimuat (*on load*).
4. **Draggable & Hover Micro-interactions**:
   Animasi transisi halus pada kartu-kartu konten, quote ketua, slider, dan tombol aksi ketika diarahkan kursor (hover) maupun diinteraksikan.

---

## 🚀 Instalasi

### Prasyarat
- **Node.js** versi 18 atau lebih baru (direkomendasikan LTS)
- **MySQL** Server (XAMPP / Laragon / MySQL Workbench)
- **npm** (bawaan Node.js)

---

### 💻 Frontend (Root Directory)

Frontend React-Vite berada langsung pada **direktori root** proyek.

```bash
# 1. Clone repository
git clone https://github.com/username/koni-banyumas.git
cd koni-banyumas

# 2. Install dependensi frontend (di direktori root)
npm install

# 3. Jalankan development server
npm run dev
```

Buka browser pada **http://localhost:5173**

---

### ⚙️ Backend (Folder `koni-backend`)

Backend API Express.js berada di dalam folder `koni-backend/`.

```bash
# 1. Masuk ke folder backend
cd koni-backend

# 2. Install dependensi backend
npm install

# 3. Salin file environment
cp .env.example .env
# Catatan Windows: copy .env.example .env
# Buka file .env dan sesuaikan DB_PASSWORD dengan milik MySQL kamu.

# 4. Import Database
# - Buka phpMyAdmin / MySQL client pilihanmu.
# - Buat database baru bernama `koni_banyumas`.
# - Import file sql dari path: `database/koni_banyumas.sql`

# 5. Jalankan Inisialisasi Tabel & Seeder Otomatis
# Ini akan membuat tabel tambahan dan mengisi data awal (Cabor, Atlet, Pelatih, Wasit, Akun Login)
node create_pengurus_table.js
node seed.js
node seed_pengurus.js

# 6. Jalankan backend server
npm run dev
```

Server backend berjalan di **http://localhost:5000**

---

## 📁 Struktur Folder

Berikut adalah struktur folder terkini dari seluruh proyek:

```
koni-app-vite/ (Root - Frontend)
├── public/                       ← Static assets (dapat diakses langsung)
│   ├── favicon.svg               ← Icon tab browser
│   ├── icons.svg                 ← Kumpulan icon SVG
│   ├── logo_koni.png             ← Logo resmi KONI
│   ├── misi_icon.png             ← Ilustrasi misi
│   └── visi_icon.png             ← Ilustrasi visi
│
├── src/                          ← Source code frontend React
│   ├── api/
│   │   └── axios.js              ← Instance Axios + interceptor JWT token
│   │
│   ├── assets/
│   │   └── hero.png              ← Banner landing page
│   │
│   ├── components/
│   │   └── common/
│   │       ├── AdminLayout.jsx   ← Layout admin panel
│   │       ├── PublicLayout.jsx  ← Layout publik (Navbar, Footer, Ticker)
│   │       ├── Layout.jsx        ← Layout dashboard (Pelatih/Atlet/Wasit)
│   │       ├── Navbar.jsx        ← Topbar navigation dashboard
│   │       ├── Sidebar.jsx       ← Sidebar navigation dashboard
│   │       ├── Badge.jsx         ← Badge status/kategori/medali
│   │       ├── Modal.jsx         ← Modal popup reusable
│   │       ├── SearchBar.jsx     ← Input pencarian search data
│   │       ├── PrivateRoute.jsx  ← Auth route guard (per-role)
│   │       └── QuillEditor.jsx   ← Rich text editor Quill
│   │
│   ├── context/                  ← Global State Providers
│   │   ├── AuthContext.jsx       ← Manajemen login, logout, & JWT token
│   │   ├── AtletContext.jsx      ← State & aksi data atlet
│   │   ├── PelatihContext.jsx    ← State & aksi data pelatih
│   │   ├── CaborContext.jsx      ← State & aksi data cabor
│   │   ├── PrestasiContext.jsx   ← State & aksi prestasi atlet
│   │   ├── BeritaContext.jsx     ← State & LocalStorage berita
│   │   ├── PengumumanContext.jsx ← State & LocalStorage pengumuman
│   │   ├── KegiatanContext.jsx   ← State & LocalStorage kegiatan
│   │   ├── PengurusContext.jsx   ← State & LocalStorage pengurus
│   │   └── GaleriContext.jsx     ← State & LocalStorage galeri
│   │
│   ├── data/                     ← Fallback/seed JSON data
│   │   ├── atlet.json
│   │   ├── pelatih.json
│   │   └── pengurus.json (dll)
│   │
│   ├── hooks/
│   │   └── useLocalStorage.js    ← Kustom hook persistensi data local
│   │
│   ├── pages/                    ← Komponen halaman web
│   │   ├── LandingPage.jsx       ← Landing Page Publik (GSAP Animations)
│   │   ├── LoginPage.jsx         ← Form Login terpadu
│   │   ├── Dashboard.jsx         ← Dashboard Statistik Admin
│   │   ├── AtletPage.jsx         ← CRUD Data Atlet (Admin)
│   │   ├── PelatihPage.jsx       ← CRUD Data Pelatih (Admin)
│   │   ├── WasitPage.jsx         ← CRUD Data Wasit (Admin)
│   │   ├── CaborPage.jsx         ← CRUD Cabang Olahraga (Admin)
│   │   ├── PrestasiPage.jsx      ← CRUD Prestasi Atlet (Admin)
│   │   │
│   │   ├── admin/                ← Konten management page
│   │   │   ├── BeritaAdminPage.jsx
│   │   │   ├── GaleriAdminPage.jsx
│   │   │   ├── KegiatanAdminPage.jsx
│   │   │   ├── PengurusAdminPage.jsx
│   │   │   └── PengumumanAdminPage.jsx
│   │   │
│   │   ├── dashboard/            ← Dashboard spesifik tiap role
│   │   │   ├── AtletDashboard.jsx
│   │   │   ├── PelatihDashboard.jsx
│   │   │   └── WasitDashboard.jsx
│   │   │
│   │   └── public/               ← Halaman publik sekunder
│   │       ├── BeritaPage.jsx
│   │       ├── BeritaDetailPage.jsx
│   │       ├── GaleriPage.jsx
│   │       ├── KegiatanPage.jsx
│   │       ├── PengumumanPage.jsx
│   │       └── PengurusPage.jsx
│   │
│   ├── utils/
│   │   └── helpers.js            ← Utilitas filter & format tanggal
│   │
│   ├── App.css                   ← Custom styles & animations
│   ├── App.jsx                   ← Konfigurasi router utama
│   ├── index.css                 ← Tailwind CSS Entry Point
│   └── main.jsx                  ← React entry mounting
│
├── tailwind.config.js            ← Konfigurasi theme & extended utilities
├── vite.config.js                ← Konfigurasi build Vite & plugin Tailwind
└── package.json                  ← Dependensi frontend

koni-backend/ (Root - Backend)
├── config/
│   └── db.js                     ← Connection Pool MySQL (mysql2/promise)
├── database/
│   └── koni_banyumas.sql         ← Database dump & schema
├── middleware/
│   ├── auth.js                   ← JWT verification & Role gate
│   └── upload.js                 ← Konfigurasi storage file (Multer)
├── routes/
│   ├── admin.js                  ← Rute kelola entities olahraga (Admin)
│   ├── atlet.js                  ← Rute dashboard atlet
│   ├── auth.js                   ← Rute login & token provider
│   ├── pelatih.js                ← Rute dashboard pelatih
│   ├── public.js                 ← Rute open/public API stats
│   └── wasit.js                  ← Rute dashboard wasit
├── uploads/                      ← Folder asset hasil upload user
├── create_pengurus_table.js      ← Inisiasi tabel pengurus
├── seed.js                       ← Data seeder utama (Semua role & cabor)
├── seed_pengurus.js              ← Seeder bagan pengurus (dari JSON)
├── server.js                     ← Rute & server runner Express
└── package.json                  ← Dependensi backend
```

---

## 🗺️ Peta Halaman

Berikut adalah pemetaan rute halaman pada aplikasi:

```
/                       → Landing Page (Publik)
/berita                 → Daftar berita terupdate
/berita/:id             → Isi lengkap berita
/pengumuman             → Daftar pengumuman resmi
/kegiatan               → Daftar agenda kegiatan olahraga
/pengurus               → Bagan struktur pengurus KONI (visual)
/galeri                 → Galeri foto dokumentasi kegiatan

/login                  → Form Login Multi-Role

/admin/dashboard        → Dashboard utama statistik admin
/admin/atlet            → Kelola data atlet (CRUD)
/admin/pelatih          → Kelola data pelatih (CRUD)
/admin/wasit            → Kelola data wasit (CRUD)
/admin/cabor            → Kelola data cabang olahraga (CRUD)
/admin/prestasi         → Kelola prestasi atlet (CRUD)
/admin/berita           → Kelola berita & artikel (Quill)
/admin/pengumuman       → Kelola pengumuman ticker
/admin/kegiatan         → Kelola jadwal kegiatan
/admin/pengurus         → Kelola struktur pengurus
/admin/galeri           → Kelola upload galeri foto

/dashboard/pelatih      → Area kerja pelatih (input latihan, presensi)
/dashboard/atlet        → Area kerja atlet (lihat presensi, medali)
/dashboard/wasit        → Area kerja wasit (laporan tanding, lisensi)
```

---

## 🔐 Akun Default

Semua akun menggunakan password default: **`koni2024`**

| Role | Username | Kegunaan |
|------|----------|----------|
| **Admin** | `admin` | Kelola seluruh data olahraga & konten landing page |
| **Pelatih** | `budi.santoso`<br>`sri.wahyuni`<br>`hendra.gunawan`<br>`agus.priyono` | Mengelola program latihan bulanan dan presensi harian atlet |
| **Atlet** | `ahmad.rizki`<br>`dewi.rahayu`<br>`fajar.nugroho`<br>`siti.nurhaliza`<br>`nadia.febriana` | Melihat kehadiran presensi latihan, prestasi, & upload piagam |
| **Wasit** | `hartono`<br>`sari.dewi`<br>`bambang.setiadi` | Melaporkan riwayat pertandingan terpilih & upload lisensi |

---

## 👥 Tim Pengembang

| Nama | NIM | Bagian |
|------|-----|--------|
| **Deska Febi Rosiana** | 2403040030 | Setup, Struktur Folder, Styling, & UI/UX |
| **Iqbal Dwi Ganjar Saefullah** | 2403040029 | Context API, State Management, Data, & Integration |
| **Erlangga Jaya Diputra** | 2403040019 | Routing, Admin Panel, & Fitur CRUD |
| **Andika Candra Wijaya** | 2403040022 | Landing Page, Halaman Publik, Auth, & Animasi GSAP |


**Mata Kuliah:** Pemrograman Web Lanjut  
**Universitas:** Universitas Muhammadiyah Purwokerto  
**Tahun:** 2026

---

## 🤝 Mitra Instansi

<div align="center">

**KONI Kabupaten Banyumas**  
*Komite Olahraga Nasional Indonesia*

*Narasumber: Triani Budi Lestari, S.E. — Wakil Sekretaris Umum*

Purwokerto · Jawa Tengah · Indonesia

</div>

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan akademik. Hak cipta © 2026 Tim Pengembang.

<div align="center">

Dibuat dengan ❤️ oleh Kelompok Kami · Pemrograman Web Lanjut · UMP 2026

</div>
