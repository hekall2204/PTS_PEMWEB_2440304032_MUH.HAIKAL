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
= Begitu halaman web dibuka, event DOMContentLoaded langsung memanggil fungsi loadData(). Fungsi ini menampilkan teks loading, lalu mengambil data dari DummyJSON lewat fetch(). Jika data berhasil diambil dan diubah ke format JSON, data disimpan ke variabel global. Setelah itu, fungsi statistik dan fungsi render (tampilkanDataHalaman) jalan untuk menampilkan kartu produk ke layar, lalu loading ditutup.

2. Mengapa setelah fetch() selesai Anda masih perlu memeriksa response.ok? Jelaskan dengan kasus pada aplikasi Anda.
= fetch() itu unik, dia baru akan error jika internet kita mati total. Kalau server membalas dengan error HTTP seperti 404 (Not Found) atau 500, fetch tetap menganggapnya sukses. Makanya kita perlu if (!response.ok) supaya jika terjadi error dari sisi server (misalnya URL salah), aplikasinya sadar, langsung membatalkan proses, dan memunculkan tombol Retry.

3. Pilih satu data JSON dari API dan jelaskan bagaimana data tersebut diubah menjadi elemen DOM yang terlihat.
= Misal kita punya data produk dari API. Di dalam fungsi tampilkanDataHalaman(), data dipotong sesuai halaman yang aktif, lalu kita looping pakai .forEach(). Di dalam loop itu, kita bikin elemen div baru pakai document.createElement('div') dengan kelas item-card. Judul, harga, dan gambar dimasukkan pakai Template Literals, lalu ditempel ke kontainer utama pakai appendChild().

4. Apa yang terjadi jika internet terputus, endpoint salah, atau server mengembalikan HTTP 404/500? Jelaskan penanganannya.
= Jika koneksi mati atau server error, kode di dalam blok try gagal dan langsung lari ke blok catch. Di sinilah loading disembunyikan, pesan error dimunculkan, dan kotak peringatan beserta tombol Retry (#retry-btn) ditampilkan. Jadi, pengguna tinggal klik tombol Retry buat coba lagi tanpa perlu repot-repot refresh halaman.

5. Jelaskan bagaimana fitur berdasarkan digit Y bekerja. Cantumkan nama fungsi/event yang digunakan.
= Pagination ini diatur oleh variabel halaman aktif (currentPage) dan batas baris (rowsPerPage). Data produk dipotong pakai fungsi .slice() supaya yang tampil di layar hanya data sesuai halaman yang dipilih. Jika tombol "berikutnya" atau "Sebelumnya" diubah, nilai halamannya diperbarui lalu data dirender ulang secara dinamis.

6. Jelaskan bagaimana validasi berdasarkan digit Z bekerja dan mengapa input tidak valid tidak boleh langsung diproses.
= Waktu form ulasan disubmit, kita cegah dulu halaman supaya tidak refresh pakai e.preventDefault(). Terus, jumlah huruf di textarea dihitung pakai .length. Jika kurang dari 30 karakter, prosesnya langsung dibatalkan, border input berubah jadi merah, dan pesan error dimunculkan. Alasan tidak boleh langsung diproses adalah supaya data ulasan yang masuk tetap bermutu dan sesuai aturan tugas.

7. Jika project Anda menggunakan localStorage, jelaskan data apa yang disimpan, kapan data dibaca/diubah, dan alasan penggunaannya. Jika varian Anda tidak menggunakan localStorage, jelaskan satu skenario yang relevan tentang bagaimana localStorage dapat diterapkan pada project Anda tanpa harus menambah fitur baru.
= Skenario paling pas buat pakai localStorage adalah fitur Bookmark Produk Favorit. Jadi, jika pengguna ngeklik tombol favorit, ID produknya disimpan ke localStorage. Nanti pas halaman ditutup lalu dibuka lagi, data produk favoritnya tetap ada dan tidak hilang.

8. Pilih satu fungsi JavaScript penting, lampirkan potongan maksimal 15 baris, lalu jelaskan input - proses - output.
= Fungsi JavaScript penting (hitungStatistik):
function hitungStatistik(data) {
  if (!data || data.length === 0) return;
  const totalHarga = data.reduce((sum, p) => sum + p.price, 0);
  const avgPrice = (totalHarga / data.length).toFixed(2);
  const maxProduct = data.reduce((max, p) => p.price > max.price ? p : max, data[0]);
  const categories = new Set(data.map(p => p.category)).size;

  document.getElementById('avg-price').textContent = `$${avgPrice}`;
  document.getElementById('max-product').textContent = `${maxProduct.title} ($${maxProduct.price})`;
  document.getElementById('total-category').textContent = categories;
}
- Input: Array data produk dari API.
- Proses: Memakai .reduce() untuk menjumlahkan harga & mencari produk termahal, serta Set dan .map() untuk menghitung kategori produk yang unik.
- Output: Mengubah teks di HTML secara otomatis untuk nampilin rata-rata harga, produk termahal, dan jumlah kategori.

9. Sebutkan bug/error paling sulit selama PTS, penyebabnya, cara menemukannya, dan cara memperbaikinya.
= Bug paling sulit itu waktu membuat pagination, angka halaman sering salah hitung. Penyebabnya, nilai dari dropdown limit ternyata dibaca sebagai string (teks), jadi pas dipakai buat rumus matematika, angkanya malah digabung bukannya dijumlah. Ketahuannya pas dicek pakai console.log(typeof). Solusinya tinggal pakai parseInt() supaya berubah jadi angka.

10. Jika diberi satu minggu lagi, sebutkan dua perbaikan teknis yang akan Anda lakukan dan alasannya.
= 
- Bikin kolom Pencarian (Search) secara real-time biar gampang nyari produk tertentu.
- Menambahkan fitur Dark Mode (Mode Gelap) yang preferensinya disimpan di localStorage.