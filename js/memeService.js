'use strict'

var gCurrLine = 0
var gFont = 'impact'
var gKeywordSearchCountMap = {
    'funny': 12,
    'cat': 16,
    'baby': 2
}

var gImgs = [
    { id: 1, url: 'imgs/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'imgs/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'imgs/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'imgs/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'imgs/5.jpg', keywords: ['funny', 'cat'] },
    { id: 6, url: 'imgs/6.jpg', keywords: ['funny', 'cat'] },
    { id: 7, url: 'imgs/7.jpg', keywords: ['funny', 'cat'] },
    { id: 8, url: 'imgs/8.jpg', keywords: ['funny', 'cat'] },
    { id: 9, url: 'imgs/9.jpg', keywords: ['funny', 'cat'] },
    { id: 10, url: 'imgs/10.jpg', keywords: ['funny', 'cat'] },
    { id: 11, url: 'imgs/11.jpg', keywords: ['funny', 'cat'] },
    { id: 12, url: 'imgs/12.jpg', keywords: ['funny', 'cat'] },
    { id: 13, url: 'imgs/13.jpg', keywords: ['funny', 'cat'] },
    { id: 14, url: 'imgs/14.jpg', keywords: ['funny', 'cat'] },
    { id: 15, url: 'imgs/15.jpg', keywords: ['funny', 'cat'] },
    { id: 16, url: 'imgs/16.jpg', keywords: ['funny', 'cat'] },
    { id: 17, url: 'imgs/17.jpg', keywords: ['funny', 'cat'] },
    { id: 18, url: 'imgs/18.jpg', keywords: ['funny', 'cat'] },
    { id: 19, url: 'imgs/19.jpg', keywords: ['funny', 'cat'] },
    { id: 20, url: 'imgs/20.jpg', keywords: ['funny', 'cat'] },
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
            place: {
                x: 30,
                y: 50
            },
            isSelected: true
        },
        {
            txt: 'I love to sleep',
            size: 25,
            align: 'ltr',
            color: 'white',
            place: {
                x: 30,
                y: 450
            },
            isSelected: false
        }
    ]
}

function getMeme() {
    return gMeme
}

function getImgs() {
    return gImgs
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setLineTxt(txt) {
    gMeme.lines[gCurrLine].txt = txt
}

function setFillColor(color) {
    gMeme.lines[gCurrLine].color = color
}

function ChangeLineSize(diff) {
    gMeme.lines[gCurrLine].size += diff
}

function getImgById(imgId) {
    var img = gImgs.find(img => img.id === imgId)
    return img
}

function switchLine() {
    
    gMeme.lines[gCurrLine].isSelected = false
    gCurrLine += 1

    if (gCurrLine === gMeme.lines.length) gCurrLine = 0
    if (gCurrLine < 0) gCurrLine = 0

    gMeme.lines[gCurrLine].isSelected = true
}

function removeLine() {
    gMeme.lines.splice(gCurrLine, 1)
    gCurrLine = 0
}

function addLine(txt) {
    if(gMeme.lines.length){
      gMeme.lines[gCurrLine].isSelected = false  
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
        place: {
            x: 50,
            y: 300
        },
        isSelected: true
    }
}

function moveTextDown() {
    gMeme.lines[gCurrLine].place.y += 10
}

function moveTextUp() {
    gMeme.lines[gCurrLine].place.y -= 10
}

function getFont() {
    return gFont
}

function changeFont(font) {
    gFont = font
}