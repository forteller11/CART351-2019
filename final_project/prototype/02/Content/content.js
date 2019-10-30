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
    console.log("onToolDrag");
  }
  onRelease(){
    this.drag = false;
    console.log("onToolRelease");
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
//r,g,b, x,y,width,x,y,width....'stop'
let strokes = [255, 0, 0, 255,   0, 0, 40,   500, 500, 100,   endOfStroke];
let tool;
let canvasCtx;
let canvas;

window.onload = main;

function main(){
  console.log("main");
  console.log(window.location.href);

  createCanvas();
  console.log(canvas);
  console.log(canvasCtx);
  canvasCtx.fillStyle = "green";
  console.log("width: "+canvas.width);
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
  repaintCanvasBasedOnStrokes(canvasCtx); //create canvas and draw to it based on strokes

  strokes = getCollectiveStrokes(); //get paintings of any previous users


  window.addEventListener("scroll", () => {
    repaintCanvasBasedOnStrokes;
  });

  window.addEventListener("resize", () => {
    repaintCanvasBasedOnStrokes;
    resizeCanvas(canvasCtx);
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
  canvas.style.zIndex = "-10000000";
  resizeCanvas();
  document.body.appendChild(canvas);
  canvasCtx = canvas.getContext("2d");
}

function resizeCanvas(){
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  console.log("resize; width: " + canvas.width + "; height: " + canvas.height);
}

function paintLoop(){
  //console.log("paintLoop");
  window.requestAnimationFrame(paintLoop);
}

function repaintCanvasBasedOnStrokes(cvs){

}
