# PRD — Astra Impact Awards Prototype Platform (Revised)

## Overview

Prototype platform berbasis web untuk:

* pendaftaran program binaan,
* screening internal,
* dan penilaian juri.

Prototype difokuskan untuk:

* validasi UX,
* stakeholder demo,
* simulasi flow sistem,
* dan validasi struktur informasi.

Prototype tidak ditujukan untuk production.

---

# Goals

## Public User

* Mempermudah proses pendaftaran program.
* Mengurangi friction saat pengisian form.
* Mendukung autosave draft.
* Membuat pengalaman pengisian terasa ringan dan jelas.

## Admin

* Mempermudah screening submission.
* Mempermudah filtering peserta.
* Mempermudah shortlist kandidat.

## Judge

* Mempermudah proses penilaian per pilar.
* Memberikan sistem scoring sederhana.
* Mempermudah review submission.

---

# Scope

## Included

* Landing page
* Mock Google login
* Multi-step registration form
* Nested wilayah selector
* Draft autosave
* Submission review
* Admin dashboard
* Judge dashboard
* Scoring system
* Frontend-only prototype

---

## Excluded

* Real backend
* Real database
* Real Google OAuth
* File upload system
* Email notification
* Production infrastructure

---

# Tech Stack

## Frontend

* React (Vite)
* TailwindCSS

## State Management

* Zustand atau Context API

## Routing

* React Router

## Storage

* localStorage

---

# User Roles

## Public User

Peserta program.

## Admin

Pengelola submission dan screening.

## Judge

Juri berdasarkan pilar tertentu.

---

# Pillars

Platform memiliki 4 pilar:

* Kesehatan
* Pendidikan
* Lingkungan
* Kewirausahaan

---

# Categories

Setiap pilar memiliki:

* Inovasi Kelompok
* Tokoh Penggerak Individu

---

# Public Flow

## Step 1 — Landing

Menampilkan:

* Hero section
* Deskripsi program
* 4 pilar utama
* CTA daftar

---

## Step 2 — Mock Google Login

User melakukan:

* Continue with Google

Authentication bersifat simulated/frontend-only.

---

## Step 3 — Pilih Pilar & Kategori

User memilih:

* Pilar
* Jenis kategori

---

## Step 4 — Data DSA & Peserta

Field:

* Nama kelompok
* Nama ketua
* Email
* No HP
* Nama DSA

---

## Step 5 — Wilayah

Menggunakan nested selector:

* Provinsi
* Kabupaten/Kota
* Kecamatan
* Desa

---

## Format Desa

Field desa menampilkan contoh format:

```txt
Desa Sukamaju - Kecamatan Cisarua - Kabupaten Bandung Barat
```

Tujuan:

* membantu konsistensi penulisan wilayah
* mempermudah validasi visual

---

## Step 6 — Data Pembina Astra

Field:

* Jenis binaan / Grup Astra

Menggunakan:

* dropdown selectable
* user tetap dapat mengetik custom input baru

Contoh:

* Asmol 1
* Asmol 2
* Yayasan Astra
* Input manual lainnya

---

## Step 7 — Profil Program

Field:

* Durasi program
* Status legalitas
* Jumlah pegawai
* Jumlah penerima manfaat

---

## Durasi Program

Menggunakan dropdown:

* < 1 tahun
* 1–3 tahun
* 3–5 tahun
* > 5 tahun

---

## Jumlah Penerima Manfaat

Menggunakan dropdown/range:

* 1–10 orang
* 11–50 orang
* 51–100 orang
* > 100 orang

---

## Step 8 — Narasi Program

Field:

* Background
* Objective
* Dampak Program
* Achievement
* Pihak yang Dilibatkan
* Target 2 Tahun

---

## Dampak Program

Menggunakan:

* textarea bebas

Tujuan:

* peserta dapat menjelaskan dampak secara lebih natural
* tidak dibatasi format before/after kaku

---

## Removed Fields

Field berikut dihapus:

* Tahap inovasi
* Ide
* Status submission pada form peserta
* Upload dokumentasi

---

## Step 9 — Review & Submit

Menampilkan:

* Ringkasan submission
* Final confirmation

Submission yang sudah submit:

* tidak dapat diedit kembali

---

# Draft System

## Autosave

Draft disimpan otomatis menggunakan:

* localStorage

---

# Submission Status

Status internal:

* draft
* submitted
* screening
* top10
* finalist
* rejected

Status tidak ditampilkan sebagai field input peserta.

---

# Admin Panel

## Features

* View submissions
* Filter submissions
* Change status
* Shortlist Top 10
* Export JSON

---

## Filters

* Pilar
* Kategori
* Status legalitas
* Durasi program
* Jumlah penerima manfaat
* Status submission

---

# Judge Panel

## Judge Access

Juri hanya dapat melihat submission sesuai pilar.

---

## Judge Features

* View submission detail
* Input score
* Add notes

---

# Scoring System

## Scale

* 1
* 2
* 3
* 4

---

## Criteria

* Durasi Program
* Background Program
* Dampak Program

---

# Storage Strategy

Menggunakan:

* localStorage

Untuk:

* auth session
* draft form
* submissions
* scores

---

# Success Criteria

Prototype dianggap berhasil apabila:

* Flow mudah dipahami
* Draft autosave berjalan
* Admin dapat screening submission
* Juri dapat scoring submission
* UX nyaman dipresentasikan ke stakeholder
