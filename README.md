# 🌦️ Aplikasi Cuaca Berbasis Web

Aplikasi Cuaca merupakan website berbasis **Node.js** yang digunakan untuk menampilkan informasi cuaca secara real-time berdasarkan kota yang dimasukkan oleh pengguna. Sistem mengambil data cuaca melalui Weather API kemudian menampilkan informasi seperti suhu, kondisi cuaca, kelembapan, serta kecepatan angin dalam tampilan website yang sederhana dan responsif.

---

## 📖 Deskripsi

Website ini dikembangkan menggunakan Node.js sebagai backend dan template engine untuk menampilkan antarmuka pengguna. Pengguna hanya perlu memasukkan nama kota pada halaman utama, kemudian sistem akan menghubungi Weather API untuk mengambil data cuaca terbaru dan menampilkannya secara langsung.

Aplikasi ini bertujuan sebagai media pembelajaran implementasi REST API pada pengembangan website menggunakan JavaScript.

---

## ✨ Fitur

- 🔍 Pencarian cuaca berdasarkan nama kota
- 🌡️ Menampilkan suhu saat ini
- ☁️ Menampilkan kondisi cuaca
- 💧 Menampilkan kelembapan udara
- 🌬️ Menampilkan kecepatan angin
- 📍 Menampilkan lokasi kota
- ⚡ Mengambil data cuaca secara real-time
- 🎨 Tampilan website yang responsif
- ❌ Menampilkan pesan apabila kota tidak ditemukan

---

## 🛠️ Teknologi yang Digunakan

- Node.js
- Express.js
- HTML5
- CSS3
- JavaScript
- Weather API
- Fetch API

---

## 📂 Struktur Folder

```
aplikasiCuaca/
│
├── node_modules/          # Dependency project
├── public/                # CSS, JavaScript, gambar, icon
├── src/                   # Source code backend
├── templates/             # Tampilan website (Views)
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## 📂 Penjelasan Folder

### 📁 public

Berisi seluruh file statis yang digunakan website, seperti:

- CSS
- JavaScript
- Gambar
- Icon
- Font

Folder ini dapat diakses langsung oleh browser.

---

### 📁 src

Merupakan folder utama aplikasi yang berisi source code backend, seperti:

- Server Express
- Routing
- Konfigurasi aplikasi
- Pemanggilan Weather API
- Logika pengolahan data cuaca

---

### 📁 templates

Berisi template halaman website yang akan ditampilkan kepada pengguna.

Biasanya terdiri dari:

- Header
- Footer
- Halaman Home
- Halaman Error
- Komponen lainnya

---

## 🚀 Cara Menjalankan Project

### 1. Clone Repository

```bash
git clone https://github.com/fadhliakbar333/aplikasiCuaca.git
```

### 2. Masuk ke Folder Project

```bash
cd aplikasiCuaca
```

### 3. Install Dependency

```bash
npm install
```

### 4. Jalankan Server

```bash
npm start
```

atau

```bash
node src/app.js
```

atau

```bash
nodemon src/app.js
```

*(sesuaikan dengan file utama project)*

---

## 🌐 Cara Kerja Sistem

1. Pengguna membuka website.
2. Halaman utama ditampilkan.
3. Pengguna memasukkan nama kota.
4. Backend menerima permintaan.
5. Backend mengirim request ke Weather API.
6. API mengembalikan data cuaca.
7. Backend memproses data.
8. Data dikirim ke template.
9. Informasi cuaca ditampilkan kepada pengguna.

---

## 📋 Informasi yang Ditampilkan

Website menampilkan beberapa informasi, yaitu:

- Nama Kota
- Negara
- Suhu
- Kondisi Cuaca
- Ikon Cuaca
- Kelembapan
- Kecepatan Angin
- Tekanan Udara
- Suhu Maksimum
- Suhu Minimum

---

## 💻 Cara Menggunakan

1. Jalankan aplikasi.
2. Buka browser.
3. Akses website melalui localhost.
4. Masukkan nama kota.
5. Klik tombol **Cari**.
6. Informasi cuaca akan ditampilkan.

---

## 📸 Screenshot

Tambahkan screenshot aplikasi pada folder berikut.

```
screenshots/
│
├── home.png
├── search.png
├── result.png
└── error.png
```

Kemudian tampilkan pada README.

```markdown
## Screenshot

### Halaman Utama

![Home](screenshots/home.png)

### Hasil Pencarian

![Result](screenshots/result.png)
```

---

## 🎯 Tujuan Pengembangan

- Mengimplementasikan REST API pada website.
- Mempelajari penggunaan Express.js.
- Menghubungkan backend dengan layanan API eksternal.
- Menampilkan data cuaca secara real-time.
- Mengembangkan website berbasis Node.js dengan struktur yang terorganisir.

---

## 👨‍💻 Developer

**Fadhli Akbar Sahendra**

Program Studi Informatika

Universitas Negeri Padang

GitHub:
https://github.com/fadhliakbar333

---

## 📄 Lisensi

Project ini dibuat untuk keperluan pembelajaran dan pengembangan website menggunakan Node.js, Express.js, dan Weather API.
