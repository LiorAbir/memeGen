'use strict'

var gCanvas
var gCtx
var gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function inIt() {
    gCanvas = document.querySelector('.canvas');
    gCtx = gCanvas.getContext('2d');

    addEvListeners()
    resizeCanvas()
    renderGallery()
    renderImojis()
    renderKeyWords()
    renderDataList()
}

function addEvListeners() {
    window.addEventListener('resize', () => {
        resizeCanvas()
        updateLinesPos()
        renderMeme()
    })
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

function onDown(ev) {
    const pos = getEvPos(ev)
    const line = getLineByPos(pos)
    if (!line) return
    setLineDrag(true)
    gStartPos = pos
    document.querySelector('.canvas-container').style.cursor = 'grabbing'
    renderMeme()
}

function onMove(ev) {
    if (getLineIsDrag()) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveLine(dx, dy)
        gStartPos = pos
        renderMeme()
    }
}

function onUp() {
    setLineDrag(false)
    document.querySelector('.canvas-container').style.cursor = 'grab'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function onScreen() {
    if (document.body.classList.contains('menu-open')) {
        onToggleMenu()
    }
}

function onToggleMenu() {
    document.body.classList.toggle('menu-open')
    var elBtn = document.querySelector('.menu-btn')
    elBtn.innerText = elBtn.innerText === '☰' ? '✖' : '☰'
}

function getCanvasWidth() {
    return gCanvas.width
}

function getCanvasHeight() {
    return gCanvas.height
}
