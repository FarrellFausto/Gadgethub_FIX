Nama : Farrell Farros Fausto
NIM : 21120123120002
Kelompok : 42

Tugas Reponsi Praktikum PPB Modul 4

## Cara Menjalankan Proyek

### 1. Backend (RESTful API)
```
cd gadgethubb/backend
npm install
node index.js
```
API akan berjalan pada `http://localhost:4000` dengan endpoint utama:
- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/categories`

### 2. Frontend (PWA React + Vite)
```
cd gadgethubb
npm install
npm run dev
```

Frontend akan otomatis mengambil data dari API backend. Jika API dijalankan pada alamat yang berbeda, atur environment variable `VITE_API_BASE_URL`, misalnya:
```
VITE_API_BASE_URL=https://server-anda.com/api
```

Aplikasi sudah mendukung PWA dengan service worker, offline asset caching, dan bottom navigation bar yang memenuhi ketentuan tugas.

## Cara Menjalankan Aplikasi

1. **Backend (RESTful API)**
   ```bash
   cd backend
   npm install
   npm run dev # atau npm start
   ```
   Backend berjalan di `http://localhost:4000` dan menyediakan endpoint:
   - `GET /api/products`
   - `GET /api/products/:id`
   - `GET /api/categories`

2. **Frontend (PWA)**
   ```bash
   npm install
   npm run dev
   ```
   Vite otomatis mem-proxy request `/api/*` ke backend sehingga data produk diambil dari API buatan sendiri.