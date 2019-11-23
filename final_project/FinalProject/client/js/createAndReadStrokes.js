'use strict'

window.onload = main;
const AJAX_STROKE_DATA_DELIMITER = "|/_\\|";
const STROKE_DELIMITER = 'd';
const ATTRIB_DELIMITER = ',';
const VERT_SIZE = 3;
const BASE = 10;

let canvas;
let canvasCtx;
let strokesSerialized = new String();
let tool;

function main () {
  //=======canvas stuff ==============
  canvas = document.createElement("CANVAS");
  canvas.style.position = "fixed";
  canvas.style.zIndex = 999999999999999999;
  canvas.style.pointerEvents = "auto";
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  canvasCtx = canvas.getContext("2d");
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  canvasCtx.fillStyle = rgbaCol(0,255,255,1);
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
  console.log("resize; width: " + canvas.width + "; height: " + canvas.height);
  document.body.appendChild(canvas);

  tool = new StrokeBrush(canvas, canvasCtx, strokesSerialized);

  window.requestAnimationFrame(drawStrokes);
  //=========== end of canvas stuff ==============

  //parse stroke

  //tool to create stroke2
 //tablet, phone or screen

 //parse stroke
  //rgba
  //strokeData..... ;
  //stroke

  //animation frame
//tool to strokes
//parse

// let s = "dog;cat";
// let ss = s.split(';');
// console.log(ss);
console.log(parseInt('203;',10));
}

function drawStrokes(){
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  strokesSerialized += tool.emptyStrokeDataBuffer();

  //console.log(strokesSerialized);
  let strokes = strokesSerialized.split(STROKE_DELIMITER);
  // console.log(strokesSerialized);
  // console.log("aaaaaaaaaaaaaaaaa")
  // console.log(strokes.length);
  for (let i = 0; i < strokes.length; i++){
    let attribs = strokes[i].split(ATTRIB_DELIMITER);
    canvasCtx.strokeStyle = rgbaCol(attribs[0], attribs[1], attribs[2], attribs[3]);
    console.log(attribs);
    for (let j = 4; j < attribs.length - VERT_SIZE; j += VERT_SIZE){

      canvasCtx.lineWidth = attribs[j + 2];
      canvasCtx.beginPath();

      canvasCtx.moveTo(
        parseInt(attribs[j + 0 + 0], BASE) - window.scrollX ,
        parseInt(attribs[j + 1], BASE) - window.scrollY);

      canvasCtx.lineTo(
        parseInt(attribs[j + 0 + VERT_SIZE], BASE) - window.scrollX ,
        parseInt(attribs[j + 1 + VERT_SIZE], BASE) - window.scrollY);

      canvasCtx.stroke();
    }
  }
  window.requestAnimationFrame(drawStrokes);
}
