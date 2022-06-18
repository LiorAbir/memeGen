'use strict'

var gFilterBy = ''
var gImojis = ['😁', '🤓', '❤️', '😑', '🤣']
var gCurrLine = 0
var gFont = 'impact'
var gKeywordSearchCountMap = {
    'Funny': 12,
    'Animals': 16,
    'Baby': 2,
    'Movies': 7,
    'Celeb': 16,
    'Israel': 20,
}

var gImgs = [
    { id: 1, url: 'imgs/1.jpg', keywords: ['Funny', 'Celeb'] },
    { id: 2, url: 'imgs/2.jpg', keywords: ['Cute', 'Animals'] },
    { id: 3, url: 'imgs/3.jpg', keywords: ['Cute', 'Baby', 'Animals'] },
    { id: 4, url: 'imgs/4.jpg', keywords: ['Animals', 'Cute'] },
    { id: 5, url: 'imgs/5.jpg', keywords: ['Baby', 'Funny'] },
    { id: 6, url: 'imgs/6.jpg', keywords: ['Funny'] },
    { id: 7, url: 'imgs/7.jpg', keywords: ['Baby', 'Fanny'] },
    { id: 8, url: 'imgs/8.jpg', keywords: ['Funny', 'Movies'] },
    { id: 9, url: 'imgs/9.jpg', keywords: ['Funny', 'Baby'] },
    { id: 10, url: 'imgs/10.jpg', keywords: ['Funny', 'Celeb'] },
    { id: 11, url: 'imgs/11.jpg', keywords: ['Funny'] },
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
            borderColor: 'black',
            place: {
                x: 30,
                y: 50
            },
            isSelected: true
        },
        {
            txt: 'Armed in knowledge',
            size: 25,
            align: 'ltr',
            color: 'white',
            borderColor: 'black',
            place: {
                x: 30,
                y: 280
            },
            isSelected: false
        }
    ]
}

function sortBy(filterBy) {
    console.log(filterBy);
    gFilterBy = filterBy
    console.log(gFilterBy);
}

function getMeme() {
    return gMeme
}

function getImgs() {
    return gImgs
}

function getImojis() {
    return gImojis
}

function getKeywordsMap(){
    return gKeywordSearchCountMap
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

function setStrokeColor(color) {
    gMeme.lines[gCurrLine].borderColor = color
}

function DecreaseSize() {
    if (gMeme.lines[gCurrLine].size === 15) return
    gMeme.lines[gCurrLine].size -= 1
}

function IncreaseSize() {
    if (gMeme.lines[gCurrLine].size === 40) return
    gMeme.lines[gCurrLine].size += 1
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
    if (gMeme.lines.length) {
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
        borderColor: 'black',
        place: {
            x: 50,
            y: 200
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