'use strict'

var gCanvas
var gCtx

function inIt() {
    gCanvas = document.querySelector('.canvas');
    gCtx = gCanvas.getContext('2d');

    addEvListeners()
    resizeCanvas()
    renderGallery()
}

function addEvListeners() {
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

function onScreen() {
    if (document.body.classList.contains('menu-open')) {
        onToggleMenu()
    }
}

function onToggleMenu() {
    document.body.classList.toggle('menu-open')
    var  elBtn = document.querySelector('.menu-btn')
    elBtn.innerText = elBtn.innerText === '☰' ? '✖' : '☰'
}