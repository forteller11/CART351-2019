'use strict'

window.onload = main;
const AJAX_STROKE_DATA_DELIMITER = "|/_\\|";
const STROKE_DELIMITER = ';';
const ATTRIB_DELIMITER = ',';
const VERT_SIZE = 3;
const COLOR_DATA_SIZE = 4;
const BASE = 10;


let strokeCollection; //of strokes
let tool;
let graffitiCanvas;

function main () {
  console.log("Chrome extension main");

  strokeCollection = new StrokeCollection();

  //GET DATA FROM SERVER
  // getDataFromServer
  // let getRequest = new XMLHttpRequest();
  // getRequest.open("GET", "https://blooming-meadow-17879.herokuapp.com?hostname=youtube.com", true);
  // getRequest.responseType = "text";
  // getRequest.send();
  //
  // getRequest.onreadystatechange = (e) => {
  //   if (e.target.readyState  === 4){
  //     console.log("GET BACK FROM SERVER:")
  //     console.log(e.target.response);
  //     strokeCollection += e.target
  //   }
  //   console.log("GET readystate: "+ e.target.readyState)
  //   console.log(e);
  // };

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
  strokeCollection.addData(tool.strokeDataBuffer);
  tool.strokeDataBuffer = new Array(); //empty buffer


  let str = strokeCollection.serialize();
  strokeCollection.deserializeAndJoin(str);

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
