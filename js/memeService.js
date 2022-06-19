'use strict'

var gFilterBy
var gImojis = ['😁', '🤓', '❤️', '😑', '🤣']
var gCurrLine = 0
var gFont = 'impact'
var gKeywordSearchCountMap = {
    'funny': 12,
    'animals': 16,
    'baby': 2,
    'movies': 7,
    'celeb': 16,
    'israel': 20,
}

var gImgs = [
    { id: 1, url: 'imgs/1.jpg', keywords: ['funny', 'celeb'] },
    { id: 2, url: 'imgs/2.jpg', keywords: ['cute', 'animals'] },
    { id: 3, url: 'imgs/3.jpg', keywords: ['cute', 'baby', 'animals'] },
    { id: 4, url: 'imgs/4.jpg', keywords: ['animals', 'cute'] },
    { id: 5, url: 'imgs/5.jpg', keywords: ['baby', 'funny'] },
    { id: 6, url: 'imgs/6.jpg', keywords: ['funny'] },
    { id: 7, url: 'imgs/7.jpg', keywords: ['baby', 'fanny'] },
    { id: 8, url: 'imgs/8.jpg', keywords: ['funny', 'Movies'] },
    { id: 9, url: 'imgs/9.jpg', keywords: ['funny', 'baby'] },
    { id: 10, url: 'imgs/10.jpg', keywords: ['funny', 'celeb'] },
    { id: 11, url: 'imgs/11.jpg', keywords: ['funny'] },
    { id: 12, url: 'imgs/12.jpg', keywords: ['israel'] },
    { id: 13, url: 'imgs/13.jpg', keywords: ['funny'] },
    { id: 14, url: 'imgs/14.jpg', keywords: ['funny', 'movie'] },
    { id: 15, url: 'imgs/15.jpg', keywords: ['movie'] },
    { id: 16, url: 'imgs/16.jpg', keywords: ['funny'] },
    { id: 17, url: 'imgs/17.jpg', keywords: ['celeb'] },
    { id: 18, url: 'imgs/18.jpg', keywords: ['movie'] }
]

var gMeme = {
    selectedImgId: 4,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 25,
            align: 'right',
            color: 'white',
            borderColor: 'black',
            pos: {
                x: 10,
                y: 40
            },
            isSelected: true,
            isDrag: false,
            font: 'impact',
            width: 0,
        },
        {
            txt: 'Armed in knowledge',
            size: 25,
            align: 'ltr',
            color: 'white',
            borderColor: 'black',
            pos: {
                x: 10,
                y: 290,
            },
            isSelected: false,
            isDrag: false,
            font: 'impact',
            width: 0,
        }
    ]
}

function getMeme() {
    return gMeme
}

function getImgs() {
    var imgs = gImgs
    if (gFilterBy) {
        imgs = gImgs.filter(img => img.keywords.some(key => key.startsWith(gFilterBy.toLowerCase())))
    }
    return imgs
}

function getImojis() {
    return gImojis
}

function getLines() {
    return gMeme.lines
}

function getKeywordsMap() {
    return gKeywordSearchCountMap
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setFilter(filter) {
    gFilterBy = filter
}

function _getCurrLine() {
    return gMeme.lines[gCurrLine]
}

function setMemeProp(key, val) {
    const line = _getCurrLine()
    line[key] = val
}

function setLineTxt(txt) {
    // const line = _getCurrLine()
    // const canvasWidth = getCanvasWidth()
    // if (line.width + 30 > canvasWidth) return

    setMemeProp('txt', txt)
}

function setFillColor(color) {
    setMemeProp('color', color)
}

function setStrokeColor(color) {
    setMemeProp('borderColor', color)
}

function changeDirection(direction) {
    const line = _getCurrLine()
    switch (direction) {
        case 'left':
            line.pos.x = 5
            break
        case 'right':
            line.pos.x = Math.abs(getCanvasWidth() - line.width - 5)
            break
        case 'center':
            line.pos.x = Math.abs(getCanvasWidth() - line.width) / 2
    }
}

function DecreaseSize() {
    const line = _getCurrLine()
    if (line.size === 17) return
    line.size -= 1
}

function IncreaseSize() {
    const line = _getCurrLine()
    if (line.size === 40) return
    line.size += 1
}

function getImgById(imgId) {
    var img = gImgs.find(img => img.id === imgId)
    return img
}

function switchLine() {
    const line = _getCurrLine()
    line.isSelected = false
    gCurrLine += 1

    if (gCurrLine === gMeme.lines.length) gCurrLine = 0
    if (gCurrLine < 0) gCurrLine = 0

    gMeme.lines[gCurrLine].isSelected = true
}

function removeLine() {
    gMeme.lines.splice(gCurrLine, 1)
    gCurrLine = 0
}

function addTxt(txt) {
    const line = _getCurrLine()
    if (gMeme.lines.length) {
        line.isSelected = false
    }
    var newLine = _createLine(txt)
    gMeme.lines.push(newLine)
    gCurrLine = gMeme.lines.length - 1
}

function _createLine(txt) {
    return {
        txt,
        size: 25,
        align: 'left',
        color: 'white',
        borderColor: 'black',
        pos: {
            x: 10,
            y: 150
        },
        isSelected: true,
        isDrag: false,
        font: 'impact',
        width: 0
    }
}

function moveTextDown() {
    gMeme.lines[gCurrLine].pos.y += 10
}

function moveTextUp() {
    gMeme.lines[gCurrLine].pos.y -= 10
}

function getFont() {
    return gFont
}

function changeFont(font) {
    setMemeProp('font', font)
}

// function updateKeyWordsSize(key) {
//     console.log();
//     console.log(gKeywordSearchCountMap.key);
// }

function getLineByPos(pos) {
    if (!gMeme.lines.length) return
    const clickedLine = gMeme.lines.find((line) => {
        const xStart = line.pos.x
        const xEnd = line.width + line.pos.x
        const yStart = line.pos.y - line.size
        const yEnd = line.pos.y

        if (pos.x >= xStart && pos.x <= xEnd && pos.y >= yStart && pos.y <= yEnd) {
            return line
        }
    })
    if (clickedLine) {
        setClickedLineSelected(clickedLine)
    }
    return clickedLine
}

function setClickedLineSelected(clickedLine) {
    gMeme.lines[gCurrLine].isSelected = false
    var lineIdx = gMeme.lines.findIndex(line => {
        return line === clickedLine
    })
    gCurrLine = lineIdx
    gMeme.lines[gCurrLine].isSelected = true
}

function setLineDrag(isDrag) {
    var line = _getCurrLine()
    line.isDrag = isDrag
}

function moveLine(dx, dy) {
    var line = _getCurrLine()
    line.pos.x += dx
    line.pos.y += dy
}

function getLineIsDrag(){
    var line = _getCurrLine()
    return line.isDrag
}