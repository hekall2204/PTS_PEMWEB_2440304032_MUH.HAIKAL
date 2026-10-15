let productsData = [];
let currentPage = 1;
let rowsPerPage = 10;
const apiUrl = 'https://dummyjson.com/products?limit=100';

const loadingEl = document.getElementById('loading');
const containerEl = document.getElementById('product-container');
const errorBox = document.getElementById('error-box');
const errorText = document.getElementById('error-text');
const retryBtn = document.getElementById('retry-btn');
const syncInfo = document.getElementById('sync-info');

async function loadData() {
    loadingEl.style.display = 'block';
    containerEl.innerHTML = '';
    errorBox.classList.add('hidden');

    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        productsData = data.products;

        loadingEl.style.display = 'none';
        // Fungsi untuk menghitung statistik data
        hitungStatistik();
        tampilkanDataHalaman();
        
        let waktuSekarang = new Date().toLocaleTimeString();
        syncInfo.innerText = `Terakhir data berhasil dimuat pada: ${waktuSekarang}`;

    } catch (error) {
        loadingEl.style.display = 'none';
        errorText.innerText = `Gagal memuat data: ${error.message}`;
        errorBox.classList.remove('hidden');
    }
}

function hitungStatistik() {
    if (productsData.length === 0) return;
    let totalHarga = productsData.reduce((sum, item) => sum + item.price, 0);
    let rataRata = (totalHarga / productsData.length).toFixed(2);
    document.getElementById('avg-price').innerText = `$${rataRata}`;
    let termahal = productsData.reduce((prev, curr) => (prev.price > curr.price) ? prev : curr);
    document.getElementById('max-product').innerText = `${termahal.title} ($${termahal.price})`;
    let daftarKategori = new Set(productsData.map(item => item.category));
    document.getElementById('total-category').innerText = daftarKategori.size;
}

function tampilkanDataHalaman() {
    containerEl.innerHTML = '';
    let awal = (currentPage - 1) * rowsPerPage;
    let akhir = awal + parseInt(rowsPerPage);
    let dataPotong = productsData.slice(awal, akhir);

    if (dataPotong.length === 0) {
        containerEl.innerHTML = '<p>Tidak ada data produk ditemukan.</p>';
        return;
    }

    dataPotong.forEach(prod => {
        let card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div>
                <img src="${prod.thumbnail}" alt="${prod.title}">
                <h4>${prod.title}</h4>
                <p>Kategori: ${prod.category}</p>
            </div>
            <div>
                <span>Harga: $${prod.price}</span>
            </div>
        `;
        containerEl.appendChild(card);
    });

    let totalHalaman = Math.ceil(productsData.length / rowsPerPage);
    document.getElementById('page-indicator').innerText = `Halaman ${currentPage} dari ${totalHalaman || 1}`;
    document.getElementById('prev-btn').disabled = currentPage === 1;
    document.getElementById('next-btn').disabled = currentPage >= totalHalaman;
}
// Logika Pagination
document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        tampilkanDataHalaman();
    }
});

document.getElementById('next-btn').addEventListener('click', () => {
    let totalHalaman = Math.ceil(productsData.length / rowsPerPage);
    if (currentPage < totalHalaman) {
        currentPage++;
        tampilkanDataHalaman();
    }
});

document.getElementById('limit-select').addEventListener('change', (e) => {
    rowsPerPage = e.target.value;
    currentPage = 1;
    tampilkanDataHalaman();
});

retryBtn.addEventListener('click', () => {
    loadData();
});

const form = document.getElementById('feedback-form');
const inputNote = document.getElementById('note-input');
const msgBox = document.getElementById('msg-box');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    let teks = inputNote.value.trim();

    if (teks.length < 30) {
        msgBox.style.color = 'red';
        msgBox.innerText = `Gagal! Catatan masih ${teks.length} karakter. Minimal harus 30 karakter!`;
        inputNote.style.borderColor = 'red';
    } else {
        msgBox.style.color = 'green';
        msgBox.innerText = 'Berhasil! Catatan memenuhi syarat dan tersimpan.';
        inputNote.style.borderColor = 'green';
    }
});

window.addEventListener('DOMContentLoaded', () => {
    loadData();
});