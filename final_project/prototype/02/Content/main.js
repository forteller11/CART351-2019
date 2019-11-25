'use strict'

window.onload = main;
const AJAX_STROKE_DATA_DELIMITER = "|/_\\|";
const STROKE_DELIMITER = 'd';
const ATTRIB_DELIMITER = ',';
const VERT_SIZE = 3;
const BASE = 10;


let strokeCollection; //of strokes
let tool;
let graffitiCanvas;

function main () {
  console.log("Chrome extension main");

  strokeCollection = new StrokeCollection();

  //=======canvas stuff ==============

  let canvas = document.createElement("CANVAS");
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

  let canvasCtx = canvas.getContext("2d");
  canvasCtx.lineCap = "round";

  document.body.appendChild(canvas, document.body.lastChild);
  document.body.style.margin = '0px';
  document.body.style.padding = '0px';

  graffitiCanvas = new GraffitiCanvas(canvas, canvasCtx);

  tool = new StrokeBrush();

  window.requestAnimationFrame(drawLoop);
  //=========== end of canvas stuff ==============



}

function drawLoop(){
  //input
  //console.log(strokeCollection);
  strokeCollection.addData(tool.strokeDataBuffer);
  tool.strokeDataBuffer = new Array();

  graffitiCanvas.clearCanvas();

  //draw strokes
  for (let i = 0; i < strokeCollection.strokes.length; i ++){ //cycle through strokes
    graffitiCanvas.drawStrokeLine(strokeCollection.strokes[i]);
  }

  //draw tool
  if (tool.cursorStroke != null){
    if (tool.mouseDown) graffitiCanvas.drawStrokeFill(tool.cursorStroke);
    else graffitiCanvas.drawStrokeLine(tool.cursorStroke);
  }

  window.requestAnimationFrame(drawLoop);
}

function rgbaCol(r,g,b,a){
  return "rgba("+r+","+g+","+b+","+a+")";
}

function constrain (x, min, max){
  if (x < min) x = min;
  if (x > max) x = max;
  return x;
}

// function drawLoop(ctx, strkData, fill = false){
//   graffitiCanvas.clearCanvas();
//   graffitiCanvas.drawStroke
//   // let attribs = strkData[i].split(ATTRIB_DELIMITER);
//   // ctx.strokeStyle = rgbaCol(attribs[0], attribs[1], attribs[2], attribs[3]);
//   // //console.log(attribs);
//   // //cycle through verts of strokes to actually draw
//   //
//   // if (fill){
//   //   for (let j = 4; j < attribs.length - VERT_SIZE; j += VERT_SIZE){
//   //     ctx.lineWidth = attribs[j + 2];
//   //     ctx.beginPath();
//   //
//   //     ctx.moveTo(
//   //       parseInt(attribs[j + 0 + 0], BASE) - window.scrollX ,
//   //       parseInt(attribs[j + 1], BASE) - window.scrollY);
//   //
//   //     ctx.lineTo(
//   //       parseInt(attribs[j + 0 + VERT_SIZE], BASE) - window.scrollX ,
//   //       parseInt(attribs[j + 1 + VERT_SIZE], BASE) - window.scrollY);
//   //
//   //     ctx.stroke();
//   //   }
//   // }
//   // else {
//   //   ctx.beginPath();
//   //   for (let j = 4; j < attribs.length - VERT_SIZE; j += VERT_SIZE){
//   //     ctx.lineWidth = attribs[j + 2];
//   //
//   //     ctx.lineTo(
//   //       parseInt(attribs[j + 0 + 0], BASE) - window.scrollX ,
//   //       parseInt(attribs[j + 1], BASE) - window.scrollY);
//   //
//   //     ctx.lineTo(
//   //       parseInt(attribs[j + 0 + VERT_SIZE], BASE) - window.scrollX ,
//   //       parseInt(attribs[j + 1 + VERT_SIZE], BASE) - window.scrollY);
//   //   }
//   //   ctx.fill();
//   // }
//
// }
