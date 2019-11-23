'use strict'

window.onload = main;
const AJAX_STROKE_DATA_DELIMITER = "|/_\\|";
const STROKE_DELIMITER = ";";
const STROKE_ATTRIB_DELIMITER = ",";
let canvas;
let canvasCtx;
let strokeDatas;
let tool = new Tool();

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
}
