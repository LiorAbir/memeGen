'use strict'

function renderGallery() {
    var strHTML = ``
    var imgs = getImgs()

    var strHTML = imgs.map(
        (img) => `<img src="${img.url}" alt="img" class="img img${img.id}" onclick="onImgSelect(${img.id})">`
    )

    document.querySelector('.gallery-container').innerHTML = strHTML.join('')
}

function renderKeyWords() {
    var keyWordsMap = getKeywordsMap()
    var keyWords = Object.keys(keyWordsMap)
    var strHTML = ``

    for (var i = 0; i < keyWords.length; i++) {
        strHTML += `<span class="key${i + 1}" onclick="onSetFilter('${keyWords[i]}')"> ${keyWords[i]}</span>`
    }
    document.querySelector('.words-filter').innerHTML = strHTML
}

function renderDataList(){
    var keyWordsMap = getKeywordsMap()
    var keyWords = Object.keys(keyWordsMap) 
    var strHTML = keyWords.map(
        (key) => `<option class="opt">${key}</option>`
    )

    document.querySelector('.opts').innerHTML = strHTML.join('')
}

function onImgSelect(imgId) {
    document.querySelector('.main-page').classList.add('hide')
    document.querySelector('.edit-page').classList.remove('hide')

    resizeCanvas()
    setImg(imgId)
    renderMeme()
}

function onSetFilter(filter) {
    setFilter(filter)
    renderGallery()
}