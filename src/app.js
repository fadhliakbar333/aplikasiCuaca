const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/prediksiCuaca')

const app = express()

// Mendefinisikan jalur / path untuk konfigurasi Express
const direktoriPublic = path.join(__dirname, '../public')
const direktoriViews = path.join(__dirname, '../templates/views')
const direktoriPartials = path.join(__dirname, '../templates/partials')

// Menggunakan partials pada handlebars
hbs.registerPartials(direktoriPartials)

// Helper untuk meng-serialize objek ke JSON di template (untuk memasukkan data server-side ke JS)
hbs.registerHelper('toJSON', (context) => {
    return JSON.stringify(context)
})

hbs.registerHelper('year', () => {
    return new Date().getFullYear()
})

// Menggunakan direktori public untuk file statis
app.set('view engine', 'hbs')
app.set('views', direktoriViews)
hbs.registerPartials(direktoriPartials)

app.use(express.static(direktoriPublic))

// Ini halaman / page utama
app.get('', (req, res) => {
    res.render('index', {
        judul: 'Aplikasi Cek Cuaca',
        nama: 'Fadhli Akbar Sahendra'
    })
})

// Ini halaman bantuan / FAQ (Frequently Asked Questions)
app.get('/bantuan', (req, res) => {
    res.render('bantuan', {
        judul: 'Halaman Bantuan',
        nama: 'Fadhli Akbar Sahendra',
        teksBantuan: 'Ini adalah teks bantuan'
    })
})

// Ini halaman info cuaca
app.get('/infoCuaca', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Kamu harus memasukkan lokasi yang ingin dicari'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, dataPrediksi) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                prediksiCuaca: dataPrediksi,
                lokasi: location,
                address: req.query.address
            })
        })
    })
})

// Ini halaman tentang
app.get('/tentang', (req, res) => {
    res.render('tentang', {
        judul: 'Tentang Saya',
        nama: 'Fadhli Akbar Sahendra'
    })
})

// Contoh data berita statis sederhana (nanti bisa diambil dari API atau DB)
const beritaData = [
    {
        title: 'Cuaca Cerah di Jakarta Hari Ini',
        description: 'Suhu berkisar 24-32°C dengan kemungkinan hujan lokal di daerah pegunungan.',
        url: '#',
        image: '/img/news-placeholder.png',
        source: 'Antara',
        category: 'general',
        published_at: new Date().toISOString()
    },
    {
        title: 'Inovasi Teknologi Ramah Lingkungan',
        description: 'Startup lokal meluncurkan panel surya portabel yang lebih efisien.',
        url: '#',
        image: '/img/news-placeholder.png',
        source: 'TechDaily',
        category: 'technology',
        published_at: new Date().toISOString()
    }
]

// Konfigurasi API berita (mediastack)
const MEDIASTACK_KEY = '7c078bcada62d7b70c0c9a7512973883'
const MEDIASTACK_BASE = 'http://api.mediastack.com/v1/news'

// Halaman berita: ambil dari mediastack (server-side) lalu kirim data ke template
app.get('/berita', async (req, res) => {
    try {
        // opsi: bisa tambahkan query params untuk category/search jika diperlukan
        // NOTE: avoid using unsupported language filter (some language codes are not valid on mediastack free tier)
        const url = `${MEDIASTACK_BASE}?access_key=${MEDIASTACK_KEY}&countries=id&limit=20`
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Gagal mengambil data dari Mediastack')
        }
        const result = await response.json()
        console.log('Mediastack response status:', response.status)
        // optional: log validation errors from API
        if (result && result.error) {
            console.warn('Mediastack API error:', result.error)
        }
        let beritaFromApi = []
        if (Array.isArray(result.data)) {
            beritaFromApi = result.data.map(item => ({
                title: item.title || item.author || 'No title',
                description: item.description || '',
                url: item.url || '#',
                image: item.image || '/img/news-placeholder.png',
                source: item.source || '',
                category: item.category || 'general',
                published_at: item.published_at || new Date().toISOString()
            }))
        }

        // If API returned no Indonesian news, try a global request as fallback
        if (Array.isArray(result.data) && result.data.length === 0) {
            console.log('No articles for countries=id — trying global feed as fallback')
            const url2 = `${MEDIASTACK_BASE}?access_key=${MEDIASTACK_KEY}&limit=20`
            const resp2 = await fetch(url2)
            const r2 = await resp2.json()
            if (Array.isArray(r2.data) && r2.data.length > 0) {
                beritaFromApi = r2.data.map(item => ({
                    title: item.title || item.author || 'No title',
                    description: item.description || '',
                    url: item.url || '#',
                    image: item.image || '/img/news-placeholder.png',
                    source: item.source || '',
                    category: item.category || 'general',
                    published_at: item.published_at || new Date().toISOString()
                }))
            }
        }

        // Jika tidak ada data, fallback ke beritaData statis
        const beritaToRender = beritaFromApi.length > 0 ? beritaFromApi : beritaData

        res.render('berita', {
            judul: 'Berita Terkini',
            nama: 'Fadhli Akbar Sahendra',
            berita: beritaToRender
        })
    } catch (err) {
        console.error('Error fetching berita:', err.message)
        // fallback: render dengan data statis jika API gagal
        res.render('berita', {
            judul: 'Berita Terkini',
            nama: 'Fadhli Akbar Sahendra',
            berita: beritaData
        })
    }
})

// Tangkap subpath dari /bantuan seperti /bantuan/something menggunakan regex
app.get(/^\/bantuan\/.*$/, (req, res) => {
    res.render('404', {
        judul: '404',
        nama: 'Fadhli Akbar Sahendra',
        pesanKesalahan: 'Halaman Bantuan Tidak Ditemukan'
    })
})

// Tangkap semua route lain -> 404 (gunakan middleware tanpa pattern supaya tidak menggunakan path-to-regexp)
app.use((req, res) => {
    res.status(404).render('404', {
        judul: '404',
        nama: 'Fadhli Akbar Sahendra',
        pesanKesalahan: 'Halaman Tidak Ditemukan'
    })
})

// Menjalankan server pada port 3000
app.listen(3000, () => {
    console.log('Server berjalan pada port 3000')
})