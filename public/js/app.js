console.log('Client side javascript file diproses')

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const pesanSatu = document.querySelector('#pesan-1')
const pesanDua = document.querySelector('#pesan-2')

// pesanSatu.textContent = 'Dari JavaScript'

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    pesanSatu.textContent = 'Sedang mencari lokasi ...'
    pesanDua.textContent = ''

    fetch('http://localhost:3000/infoCuaca?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                pesanSatu.textContent = data.error
            } else {
                pesanSatu.textContent = data.lokasi
                pesanDua.textContent = data.prediksiCuaca
            }
        })
    })
})