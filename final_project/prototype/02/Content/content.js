'use strict';



class ITool {
  constructor (ctx){
    this.drag = false;
  }
  onClick(){
    this.drag = true;
    console.log("onToolClick");
  }
  onDrag(){
    if (this.drag == false) return;
    //console.log("onToolDrag");
  }
  onRelease(){
    this.drag = false;
    console.log("onToolRelease");
  }

  drawSelf(){
      console.log("tool being drawn");
  }
}

class Brush extends ITool{
  constructor(ctx){
    super.constructor(ctx);
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 255;
    this.radius;
    this.pressure = 0.5;
  }
  onClick(){
    super.onClick();
    console.log("dog");
  }

  onRelease(){
    super.onRelease();
    localStorage.setItem(url, strokes);
  }

}


let url = window.location.pathname;
let endOfStroke = 54321;
//r,g,b,a,width, x,y,x,y....'stop'
let strokes = [255, 0, 0, 1, 40,   0, 0,   500, 500,   endOfStroke];
let tool;
let canvasCtx;
let canvas;
let debuggingFillStyle = rgbaCol(0,0,255,0.5);

window.onload = main;

function main(){
  console.log("main");
  console.log(window.location.href);

  createCanvas();
  console.log(canvas);
  console.log(canvasCtx);
  console.log("width: "+canvas.width);


  repaintCanvasBasedOnStrokes(); //create canvas and draw to it based on strokes

  getCollectiveStrokes(); //get paintings of any previous users


  window.addEventListener("scroll", () => {
    repaintCanvasBasedOnStrokes;
  });

  window.addEventListener("resize", () => {
    repaintCanvasBasedOnStrokes;
    resizeCanvas();

  });

  //set up mouse events
  tool = new ITool();
  window.addEventListener("mousedown", () => {
    tool.onClick();
  })
  window.addEventListener("mousemove", () => {
    tool.onDrag();
  })
  window.addEventListener("mouseup", () => {
    tool.onRelease();
  })

  window.requestAnimationFrame(paintLoop); //animation loop
}

function getCollectiveStrokes(){

  console.log("url: "+ url);
  let history = localStorage.getItem(url);
  console.log("history: " + history);
  if (history != null) strokes = history;

}

function createCanvas(){

  console.log("createcanvas");
  canvas = document.createElement("CANVAS");
  canvas.style.position = "fixed";
  canvas.style.zIndex = 999999999999999999;
  resizeCanvas();
  document.body.appendChild(canvas);
  canvasCtx = canvas.getContext("2d");

  let t = document.createElement("div");
  t.style.backgroundColor = "red";
  t.style.width = "500px";
  t.style.height = "500px";
  document.body.appendChild(t);
}

function resizeCanvas(){
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  canvasCtx = canvas.getContext("2d");
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
  console.log("resize; width: " + canvas.width + "; height: " + canvas.height);
}

function paintLoop(){
  //console.log("paintLoop");
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  canvasCtx.fillStyle = debuggingFillStyle;
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

   let index = 0;
   while (index < strokes.length){
     index = drawLine(index);
   }

  window.requestAnimationFrame(paintLoop);
}

function drawLine(index){
  let r = strokes[index + 0];
  let g = strokes[index + 1];
  let b = strokes[index + 2];
  let a = strokes[index + 3];
  let w = strokes[index + 4];
  canvasCtx.strokeStyle = rgbaCol(r,g,b,a);
  canvasCtx.lineWidth = w;

  index += 5;

  //first stroke
  canvasCtx.moveTo(strokes[index+0] - window.scrollX , strokes[index+1] - window.scrollY);
  index += 2;

  //other strokes
  while (index != endOfStroke){
    canvasCtx.lineTo(strokes[index+0] - window.scrollX , strokes[index+1] - window.scrollY);
    index += 2;
  }

  canvasCtx.stroke();

  return index; //index of r on new stroke or nothing
}

function repaintCanvasBasedOnStrokes(cvs){

}

function rgbaCol(r,g,b,a){
  return "rgba("+r+","+g+","+b+","+a+")";
}
