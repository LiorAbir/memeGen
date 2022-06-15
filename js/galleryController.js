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
    
    setImg(imgId)
    renderMeme()
    document.querySelector('.main-page').style.display = 'none'
    document.querySelector('.edit-page').style.display = 'block'
}