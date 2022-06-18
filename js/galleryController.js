'use strict'

function renderGallery() {
    var strHTML = ``
    var img = getImgs()
    for (var i = 0; i < img.length; i++) {
        strHTML += `<img src="imgs/${i + 1}.jpg" alt="img" class="img img${i + 1}" onclick="onImgSelect(${i + 1})">`
    }

    document.querySelector('.gallery-container').innerHTML = strHTML
}

function renderKeyWords() {
    var keyWordsMap = getKeywordsMap()
    var keyWords = Object.keys(keyWordsMap)
    var strHTML = ``

    for (var i = 0; i < keyWords.length; i++) {
        strHTML += `<span class="key${i + 1}"> ${keyWords[i]}</span>`
    }
    document.querySelector('.words-filter').innerHTML = strHTML
}

function onImgSelect(imgId) {
    document.querySelector('.main-page').classList.add('hide')
    document.querySelector('.edit-page').classList.remove('hide')

    resizeCanvas()
    setImg(imgId)
    renderMeme()
}

function onSortBy(filterBy) {
    sortBy(filterBy)
    renderGallery()
}