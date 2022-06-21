const canvas = document.querySelector('.canvas')
const context = canvas.getContext('2d')

const resetBtn = document.querySelector('.reset')
const framingBtn = document.querySelector('.framing')
const download = document.querySelector('.download')


document.querySelector('#upload-text').onchange = function (e) {
    let img = new Image()
    img.onload = draw
    img.src = URL.createObjectURL(this.files[0])
}

function draw() {
    canvas.width = this.width
    canvas.height = this.height
    context.drawImage(this, 0,0)
}

download.addEventListener('click', () => {
    let data = canvas.toDataURL('image/png')
    download.querySelector('a').setAttribute('href',data)
})

resetBtn.addEventListener('click', () => {
    context.clearRect(0, 0, canvas.width, canvas.height)
})



// Выдаёт ошибку, не знаю почему
// const canvas = document.querySelector('.canvas')
// const context = canvas.getContext('2d')

// const cropper = {
//     loadImage(elem) {
//         let img = new Image()
//         img.onload = this.draw(elem)
//         img.onerror = this.error()
//         img.src = URL.createObjectURL(elem.files[0])
//     },
//     draw(elem) {
//         canvas.width = elem.width;
//         canvas.height = elem.height;
//         context.drawImage(elem, 0, 0);
//     },
//     error() {
//         console.error("Файл, который вы загрузили не является изображением.")
//     },
//     reset() {
//         context.clearRect(0, 0, canvas.width, canvas.height)
//     }
// }

// document.querySelector('.upload-text').onchange = cropper.loadImage(this)