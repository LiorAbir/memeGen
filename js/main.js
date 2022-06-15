'use strict'

var gCanvas
var gCtx

function inIt() {
    gCanvas = document.querySelector('.canvas');
    gCtx = gCanvas.getContext('2d');

    renderGallery()
    // resizeCanvas()
    // addEvListeners()

}


// function addEvListeners() {
//     window.addEventListener('resize', resizeCanvas)
//     // addMouseListeners()
//     // addTouchListeners()
// }

// function resizeCanvas() {
//     var  elContainer = document.querySelector('.canvas-container')
//     console.log(elContainer);
//     gCanvas.width = elContainer.offsetWidth
//     gCanvas.height = elContainer.offsetHeight
// }