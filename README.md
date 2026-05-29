# Astra Impact Awards - 4 Pilar Prototype

Prototype aplikasi registrasi dan penilaian Astra Impact Awards (4 Pilar). Aplikasi ini dibangun dengan React (Vite), Tailwind CSS v4, Zustand, dan React Router v6.

## Cara Menjalankan

1. Pastikan Anda sudah menginstal Node.js
2. Install dependencies:
   ```bash
   npm install
   ```
3. Jalankan development server:
   ```bash
   npm run dev
   ```

## Fitur

- **Alur Registrasi 4 Step:**
  1. Pilar dan Kategori
  2. Data Peserta
  3. Data Program
  4. Review & Submit
- **Admin Dashboard:** Melihat daftar submission, status, dan data pendaftar.
- **Judge (Juri) Dashboard:** Menilai program yang didaftarkan.
- **State Management:** Data form disimpan di `localStorage` menggunakan Zustand persist middleware sehingga tidak hilang ketika refresh.

## Akun Hardcode (Untuk Testing)

Karena ini adalah prototype tanpa backend, autentikasi menggunakan data akun yang di-hardcode. Saat login, Anda cukup memilih role. Berikut adalah list akun simulasi yang digunakan:

| Role | Nama | Email |
| :--- | :--- | :--- |
| **Peserta (Public)** | John Doe | `public@astra.co.id` |
| **Admin** | Admin Astra | `admin@astra.co.id` |
| **Juri (Judge)** | Juri Pilar | `judge@astra.co.id` |

*Catatan: Anda tidak perlu memasukkan password, cukup pilih role di halaman Login untuk mensimulasikan sesi pengguna.*
