'use strict'

function renderMeme() {

    var meme = getMeme()
    drawMeme(meme)
    document.querySelector('[name=txt]').placeholder = meme.lines[0].txt
}

function drawMeme(meme) {

    var memeImg = getImgById(meme.selectedImgId)
    var img = new Image()
    img.src = memeImg.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)

        for (var i = 0; i < meme.lines.length; i++) {
            var memeLine = meme.lines[i]
            drawText(memeLine)
        }
    }
}

function drawText(memeLine) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = memeLine.color;
    gCtx.font = `${memeLine.size}px Impact`;
    var xCoordinate = memeLine.place.x
    var yCoordinate = memeLine.place.y

    if (memeLine.isSelected === true) {
        console.log(yCoordinate);
        drawRect(xCoordinate, yCoordinate)
    }

    gCtx.fillText(memeLine.txt, xCoordinate, yCoordinate)
    gCtx.strokeText(memeLine.txt, xCoordinate, yCoordinate)
}

function drawRect(x, y) {
    console.log(y);
    gCtx.beginPath();
    gCtx.rect(5, y-30, gCanvas.width-10, gCanvas.height/8);
    // gCtx.fillStyle = 'orange';
    // gCtx.fillRect(x, y, 150, 150);
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
}

function onSetLineTxt(txt) {
    console.log(txt);
    setLineTxt(txt)
    renderMeme()
}

function onSetFillColor(color) {
    console.log(color);
    setFillColor(color)
    renderMeme()
}

function onChangeLineSize(elBtn) {
    var diff = (elBtn.innerText === 'increase') ? 2 : -2
    ChangeLineSize(diff)
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
}