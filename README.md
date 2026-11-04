# ExpressJS Product REST API with Prisma ORM

REST API sederhana untuk manajemen produk yang dibangun menggunakan **Express.js**, **Prisma ORM**, dan database **SQLite**.

---

## 📁 Struktur Proyek

```text
chall_expressjs/
├── controllers/
│   └── productController.js   # Logika CRUD dan validasi dengan Prisma
├── prisma/
│   ├── migrations/            # Histori migrasi database
│   ├── schema.prisma          # Definisi model Product dan database SQLite
│   └── seed.js                # Data awal (seeder) database
├── routes/
│   └── productRoutes.js       # Definisi rute API produk (GET, POST, PUT, DELETE)
├── screenshot/                # Bukti hasil pengujian API & Database
├── app.js                     # Entry point server Express
├── package.json               # Konfigurasi dependensi dan scripts
├── .env.example               # Contoh variabel lingkungan
└── README.md                  # Dokumentasi proyek
```

---

## 🚀 Petunjuk Menjalankan

1. **Instal dependensi:**
   ```bash
   npm install
   ```

2. **Jalankan migrasi database & seeding awal:**
   ```bash
   npm run db:migrate
   ```

3. **Jalankan server:**
   - Mode standar:
     ```bash
     npm start
     ```
   - Mode development (auto-reload):
     ```bash
     npm run dev
     ```
   Server aktif pada: `http://localhost:3000`

4. **Membuka Prisma Studio (Database GUI Visual):**
   ```bash
   npm run studio
   ```
   Buka browser pada alamat: `http://localhost:5555`

---

## 📌 Daftar Endpoint API

| Method | Endpoint | Body Request | Status Code | Deskripsi |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/products` | - | `200 OK` | Mengambil seluruh data produk |
| **GET** | `/products/:id` | - | `200 OK` / `404 Not Found` | Mengambil detail produk berdasarkan ID |
| **POST** | `/products` | `{ "name": "string", "price": number }` | `201 Created` / `400 Bad Request` | Menambahkan produk baru |
| **PUT** | `/products` | `{ "id": number, "name": "string", "price": number }` | `200 OK` / `400 Bad Request` / `404 Not Found` | Memperbarui produk yang sudah ada |
| **DELETE** | `/products/:id` | - | `200 OK` / `400 Bad Request` / `404 Not Found` | Menghapus produk berdasarkan ID |

---

## 🧪 Contoh Pengujian (cURL)

### 1. GET Semua Produk
```bash
curl -i http://localhost:3000/products
```

### 2. GET Produk Berdasarkan ID
```bash
curl -i http://localhost:3000/products/1
```

### 3. POST Tambah Produk Baru
```bash
curl -i -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Penghapus", "price": 2000}'
```

### 4. PUT Update Produk (Body dengan ID)
```bash
curl -i -X PUT http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"id": 1, "name": "Buku Tulis Premium", "price": 20000}'
```

### 5. DELETE Hapus Produk
```bash
curl -i -X DELETE http://localhost:3000/products/2
```

### 6. Skenario Validasi Error (400 Bad Request)
```bash
curl -i -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name": "", "price": -500}'
```

---

## 📸 Laporan Evidence (Hasil Pengujian)

### 1. Skenario POST (Tambah Data)
- **Database Sebelum POST (Prisma Studio):**
  ![Database Sebelum POST](screenshot/01_db_before_post.png)
- **Request POST di Postman (201 Created):**
  ![Postman POST](screenshot/02_postman_post.png)
- **Database Sesudah POST (Prisma Studio - Data Bertambah):**
  ![Database Sesudah POST](screenshot/03_db_after_post.png)

---

### 2. Skenario PUT (Update Data)
- **Request PUT di Postman (200 OK):**
  ![Postman PUT](screenshot/04_postman_put.png)
- **Database Sesudah PUT (Prisma Studio - Data Terupdate):**
  ![Database Sesudah PUT](screenshot/05_db_after_put.png)

---

### 3. Skenario GET (Tampilkan Seluruh Data)
- **Request GET All di Postman (200 OK):**
  ![Postman GET All](screenshot/06_postman_get_all.png)

---

### 4. Skenario DELETE (Hapus Data)
- **Request DELETE di Postman (200 OK):**
  ![Postman DELETE](screenshot/07_postman_delete.png)
- **Database Sesudah DELETE (Prisma Studio - Data Terhapus):**
  ![Database Sesudah DELETE](screenshot/08_db_after_delete.png)

---

### 5. Skenario Validasi Error & Not Found
- **Kesalahan Validasi Input (400 Bad Request):**
  ![Postman 400 Validation Error](screenshot/09_postman_400_validation_error.png)
- **Endpoint / Data Tidak Ditemukan (404 Not Found):**
  ![Postman 404 Not Found](screenshot/10_postman_404_not_found.png)
