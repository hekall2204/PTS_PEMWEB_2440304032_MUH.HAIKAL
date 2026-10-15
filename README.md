```markdown
# PTS Pemrograman Web

- **Nama:** Muh. Haikal
- **NPM:** 2440304032

# Nama aplikasi dan deskripsi singkat.
**Haikal Mart Dashboard** adalah mini project front-end berbasis web untuk mengelola data produk UMKM. Aplikasi ini mengambil data dari REST API publik, dilengkapi fitur pagination + jumlah data per halaman, analisis data otomatis, serta form validasi catatan.

# Perhitungan variasi soal berdasarkan NIM.
Berdasarkan 3 digit terakhir NPM saya (032):
- **Dataset:** Products (Produk UMKM)
- **Fitur Utama:** Pagination + pilihan jumlah data per halaman
- **Form & Validasi:** Catatan minimal 30 karakter
- **Challenge:** Tombol Retry ketika Fetch gagal + waktu terakhir data berhasil dimuat

# Dataset/API yang digunakan.
- **Sumber Data:** DummyJSON API (Dataset Products)

# Fitur utama dan challenge.
- **Pagination:** Memecah data produk ke beberapa halaman
- **Jumlah data per halaman:** Opsi jumlah tampil per halaman (misal 5, 10, 20, dll).
- **Tombol Retry ketika Fetch gagal:** Jika koneksi terputus atau terjadi error, tombol Retry akan muncul untuk memuat ulang data tanpa refresh halaman.
- **Waktu terakhir data berhasil dimuat:** Menampilkan waktu terakhir data berhasil ditarik dari server.

# Cara menjalankan project.
1. Unduh atau copy repository project ini ke dalam direktori root web server lokal Anda (misalnya di `C:/laragon/www/PTS_PEMWEB_2440304032_MUH.HAIKAL/`).
2. Buka browser, lalu akses URL lokal project tersebut.

# Screenshot desktop dan mobile.
1. Tampilan Dekstop
![Screenshot Desktop](TampilanDesktop.png)

2. Tampilan Mobile
![Screenshot Desktop](TampilanMobile.png)

# Endpoint REST API.
- `https://dummyjson.com/products?limit=100`

# Jawaban 10 pertanyaan penjelasan kode.
1. Jelaskan alur sejak halaman dibuka sampai data REST API tampil. Sebutkan nama fungsi pada project Anda.
2. Mengapa setelah fetch() selesai Anda masih perlu memeriksa response.ok? Jelaskan dengan kasus pada aplikasi Anda.
3. Pilih satu data JSON dari API dan jelaskan bagaimana data tersebut diubah menjadi elemen DOM yang terlihat.
4. Apa yang terjadi jika internet terputus, endpoint salah, atau server mengembalikan HTTP 404/500? Jelaskan penanganannya.
5. Jelaskan bagaimana fitur berdasarkan digit Y bekerja. Cantumkan nama fungsi/event yang digunakan.
6. Jelaskan bagaimana validasi berdasarkan digit Z bekerja dan mengapa input tidak valid tidak boleh langsung diproses.
7. Jika project Anda menggunakan localStorage, jelaskan data apa yang disimpan, kapan data dibaca/diubah, dan alasan penggunaannya. Jika varian Anda tidak menggunakan localStorage, jelaskan satu skenario yang relevan tentang bagaimana localStorage dapat diterapkan pada project Anda tanpa harus menambah fitur baru.
8. Pilih satu fungsi JavaScript penting, lampirkan potongan maksimal 15 baris, lalu jelaskan input - proses - output.
9. Sebutkan bug/error paling sulit selama PTS, penyebabnya, cara menemukannya, dan cara memperbaikinya.
10. Jika diberi satu minggu lagi, sebutkan dua perbaikan teknis yang akan Anda lakukan dan alasannya.