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
  console.log("Chrome extension main");
  //=======canvas stuff ==============

  canvas = document.createElement("CANVAS");
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = "fixed";
  canvas.style.zIndex = 2147483648;
  canvas.style.top = '0px';
  canvas.style.left = '0px';
  canvas.style.margin = '0px';
  canvas.style.padding = '0px';
  canvas.style.pointerEvents = "auto";
  canvas.style.touchAction = 'none';

  window.addEventListener("resize", (e) => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasCtx.fillStyle = rgbaCol(0,255,255,0.4);
  });

  canvasCtx = canvas.getContext("2d");
  canvasCtx.lineCap = "round";
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  canvasCtx.fillStyle = rgbaCol(0,255,255,0.4);
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

  document.body.appendChild(canvas, document.body.lastChild);
  document.body.style.margin = '0px';
  document.body.style.padding = '0px';

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
  //console.log("a");
  document.head.style.zIndex = 0
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
  strokesSerialized += tool.emptyStrokeDataBuffer();

  let strokes = strokesSerialized.split(STROKE_DELIMITER);
  // console.log(strokesSerialized);

  for (let i = 0; i < strokes.length; i++){ //cycle through strokes
    let attribs = strokes[i].split(ATTRIB_DELIMITER);
    canvasCtx.strokeStyle = rgbaCol(attribs[0], attribs[1], attribs[2], attribs[3]);
    //console.log(attribs);
    //cycle through verts of strokes to actually draw
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

function rgbaCol(r,g,b,a){
  return "rgba("+r+","+g+","+b+","+a+")";
}

function constrain (x, min, max){
  if (x < min) x = min;
  if (x > max) x = max;
  return x;
}
