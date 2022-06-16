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
    var xCoordinate = memeLine.place.x
    var yCoordinate = memeLine.place.y
    var font = getFont()


    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = memeLine.color
    gCtx.font = `${memeLine.size}px ${font}`

    gCtx.fillText(memeLine.txt, xCoordinate, yCoordinate)
    gCtx.strokeText(memeLine.txt, xCoordinate, yCoordinate)

    if (memeLine.isSelected === true) {
        drawRect(xCoordinate, yCoordinate)
    }
}

function drawRect(x, y) {
    gCtx.beginPath();
    gCtx.rect(5, y - 40, gCanvas.width - 10, gCanvas.height / 8);

    gCtx.fillStyle = 'rgb(189 193 194 / 20%)';
    gCtx.fillRect(5, y - 40, gCanvas.width - 10, gCanvas.height / 8);

    gCtx.strokeStyle = 'black';
    gCtx.stroke();
}

function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onSetFillColor(color) {
    setFillColor(color)
    renderMeme()
}

function onChangeLineSize(elBtn) {
    var diff = (elBtn.innerText === 'A +') ? 2 : -2
    ChangeLineSize(diff)
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
}

function onRemoveLine() {
    removeLine()
    renderMeme()
}

function onAddLine(ev) {
    ev.preventDefault()

    var elInput = document.querySelector('[name=txt]')
    var txt = elInput.value
    console.log(txt);
    addLine(txt)
    elInput.value = ''
    renderMeme()


}

function onMoveTextUp() {
    moveTextUp()
    renderMeme()
}

function onMoveTextDown() {
    moveTextDown()
    renderMeme()
}

function onSaveMeme(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'Meme';
}

function onChangeFont(font) {
    changeFont(font)
    renderMeme()
}

function onShareMeme() {
    const imgDataUrl = gCanvas.toDataURL("image/jpeg");
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.user-msg').innerText = `Your photo is available here: ${uploadedImgUrl}`
        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData();
    formData.append('img', imgDataUrl)
    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}
