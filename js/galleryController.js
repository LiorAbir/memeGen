'use strict'

function renderGallery() {
    var strHTML = ``
    var img = getImgs()
    console.log(img);
    for (var i = 0; i < img.length; i++) {
        strHTML += `<img src="imgs/${i + 1}.jpg" alt="img" class="img img${i + 1}" onclick="onImgSelect(${i + 1})">`
    }

    document.querySelector('.gallery-container').innerHTML = strHTML
}

function onImgSelect(imgId) {
    document.querySelector('.main-page').classList.add('hide')
    document.querySelector('.edit-page').classList.remove('hide')

    resizeCanvas()
    setImg(imgId)
    renderMeme()
    // resizeCanvas(imgId)
    // document.querySelector('.main-page').style.display = 'none'
    // document.querySelector('.edit-page').style.display = 'block'


}