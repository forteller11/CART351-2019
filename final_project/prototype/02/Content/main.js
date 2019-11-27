'use strict'

window.onload = main;
const AJAX_STROKE_DATA_DELIMITER = "|_|";
const STROKE_DELIMITER = ';';
const ATTRIB_DELIMITER = ',';
const VERT_SIZE = 3;
const COLOR_DATA_SIZE = 4;
const BASE = 10;
const SERVER_HREF = 'https://blooming-meadow-17879.herokuapp.com';

let strokeCollection; //of strokes
let tool;
let graffitiCanvas;

function main () {
  console.log("Chrome extension main");

  strokeCollection = new StrokeCollection();

  //GET DATA FROM SERVER
  console.log(window.location.hostname);

  let hostname = 'hostname='+window.location.hostname;
  let getHeader = SERVER_HREF + "?" + hostname;

  let getRequest = new XMLHttpRequest();
  getRequest.open("GET", getHeader, true);
  getRequest.responseType = "text";
  getRequest.send();

  getRequest.onreadystatechange = (e) => {
    if (e.target.readyState  === 4){
      console.log("GET BACK FROM SERVER:")
      console.log(e.target.response);
      strokeCollection.deserializeAndJoin(e.target.response);
    }
    console.log("GET readystate: "+ e.target.readyState)
    console.log(e);
  };

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

  //upload any new completed strokes to server
  if ((strokeCollection.newStrokeToExport) && (strokeCollection.strokes.length > 0)) {
    strokeCollection.newStrokeToExport = false;
    console.log(strokeCollection);
    let strokeToExport = strokeCollection.strokes[strokeCollection.strokes.length-1];

    let postRequest = new XMLHttpRequest();
    postRequest.open("POST", "https://blooming-meadow-17879.herokuapp.com/", true);
    console.log(postRequest);

    postRequest.setRequestHeader('Content-Type','text/plain');
    postRequest.responseType = "text";

    console.log(strokeToExport);
    let strokeData = strokeCollection.serializeStroke(strokeToExport);
    console.log(strokeData);
    let txtToPost = window.location.hostname + AJAX_STROKE_DATA_DELIMITER + strokeData;

    postRequest.send(txtToPost);

    postRequest.onreadystatechange = (e) => {
      if (e.target.readyState  === 4){
        console.log("POST BACK FROM SERVER: ")
        console.log(e.target.response);
      } else{
        console.log("readystate: "+ e.target.readyState);
        console.log(e);
      }
    };
  }


  // let str = strokeCollection.serialize();
  // strokeCollection.deserializeAndJoin(str);

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
