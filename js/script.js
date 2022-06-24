// Основные переменные
const resetBtn = document.querySelector('.reset'),
    savingBtn = document.querySelector('.saving'),
    downloadBtn = document.querySelector('.download'),
    download = document.querySelector('.download > a'),
    content = document.querySelector('.content'),
    save = document.querySelector('.save'),
    upload = document.querySelector('.upload')

// Инструменты
const moveMode = document.querySelector('.move'),
    cropMode = document.querySelector('.crop'),
    zoomIn = document.querySelector('.zoom-in'),
    zoomOut = document.querySelector('.zoom-out'),
    rotateRight = document.querySelector('.rotate-right'),
    rotateLeft = document.querySelector('.rotate-left'),
    showCropper = document.querySelector('.show-cropper'),
    hideCropper = document.querySelector('.hide-cropper'),
    flipHorizontal = document.querySelector('.flip-horizontal'),
    flipVertical = document.querySelector('.flip-vertical'),
    resetCrop = document.querySelector('.reset-crop')

// Вспомогательные
let cropper = ''
let imgSrc = ''


// Модуль
const cropperModule = {
    draw(e) {
        // Проверка на то, есть ли уже загруженные изображение, а то они накладываются
        if (content.childNodes.length != 0) {
            alert("У вас уже загружено изображение.\nПеред загрузкой нового, пожалуйста, очистите старое.")
        } else {
            if (e.target.files.length) {
                // Чекаем есть ли вообще файлы
                const reader = new FileReader()
                reader.onload = (e) => {
                    // Запускаем ридер
                    if (!(e.target.result.indexOf('image') == -1)) {
                        // Проверка на тип файла, если есть "image", то работаем
                        let img = document.createElement('img')
                        img.src = e.target.result
                        content.appendChild(img)
                        // Создаем картинку
                        cropper = new Cropper(img)
                        // Инициализируем кроппер библиотеку
                        downloadBtn.classList.remove('disabled')
                        // врубаем кнопку
                        // даём зелёный свет
                        this.successEvent(upload)
                    } else {
                        // даём красный свет(ошибку)
                        this.failEvent(upload)
                    }
                }
                // Записываем в дата урл = путь к файлу
                reader.readAsDataURL(e.target.files[0])
            }
        }
    },
    reset() {
        // Чистим всё
        content.innerHTML = ''
        cropper.destroy()
        document.querySelector('#upload-image').value = null
    },
    // Ивент зелёнки
    successEvent(target) {
        target.classList.toggle('success')
        setTimeout(() => {
            target.classList.toggle('success')
        }, 2000);
    },
    // Ивент ошибки
    failEvent(target) {
        target.classList.toggle('failed')
        setTimeout(() => {
            target.classList.toggle('failed')
        }, 2000);
    },
    save() {
        // Цепляем путь измененной картинки
        imgSrc = cropper.getCroppedCanvas().toDataURL()
        // добавляем эффектики
        download.classList.add('ready')
        this.successEvent(savingBtn)
    },
    download(e) {
        if (downloadBtn.classList.contains('disabled')) {
            // Проверка на наличие файла
            e.preventDefault()
            alert('Пожалуйста, загрузите изображение!')
        } else if (download.classList.contains('ready')) {
            // Если измененно, то качаем
            download.download = 'cropped-image.png'
            download.setAttribute('href', imgSrc)
            // Очищаю путь, потому что при ховере потом начинает лагать сайт
            setTimeout(() => {
                download.setAttribute('href', '')
                download.classList.remove('ready')
            }, 500)
        } else {
            // Сообщение об ошибке
            e.preventDefault()
            alert('Пожалуйста, сохраните изменения!')
        }
    }
}

// Запуск инструментов

moveMode.addEventListener('click', () => {
    cropper.setDragMode('move')
})
cropMode.addEventListener('click', () => {
    cropper.setDragMode('crop')
})

zoomIn.addEventListener('click', () => {
    cropper.zoom(0.1)
})
zoomOut.addEventListener('click', () => {
    cropper.zoom(-0.1)
})

rotateRight.addEventListener('click', () => {
    cropper.rotate(45)
})
rotateLeft.addEventListener('click', () => {
    cropper.rotate(-45)
})

showCropper.addEventListener('click', () => {
    cropper.crop()
})
hideCropper.addEventListener('click', () => {
    cropper.clear()
})

flipHorizontal.addEventListener('click', () => {
    cropper.scaleX(flipHorizontal.classList.contains('flipped') ? 1 : -1)
    flipHorizontal.classList.toggle('flipped')
})

flipVertical.addEventListener('click', () => {
    cropper.scaleY(flipVertical.classList.contains('flipped') ? 1 : -1)
    flipVertical.classList.toggle('flipped')
})

resetCrop.addEventListener('click', () => {
    cropper.reset()
})

// запуск модуля
document.querySelector('#upload-image').addEventListener('change', (e) => {
    cropperModule.draw(e)
})

// запуск ресета
resetBtn.addEventListener('click', () => {
    cropperModule.reset()
})

// запуск сохранения
savingBtn.addEventListener('click', () => {cropperModule.save()})

// запуск скачивания
download.addEventListener('click', () => {cropperModule.download(this)})



// Выдаёт ошибку, не знаю почему. Старая версия
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