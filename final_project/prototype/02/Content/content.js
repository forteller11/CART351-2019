'use strict';



class ITool {
  constructor (canvas){
    this.canvas = canvas;
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
  constructor(canvas){
    super.constructor(canvas);
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 255;
    this.radius;
    this.canvas;
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
let canvas;

window.onload = main;

function main(){
  console.log("main");
  console.log(window.location.href);

  strokes = getCollectiveStrokes(); //get paintings of any previous users

  repaintCanvasBasedOnStrokes(canvas); //create canvas and draw to it based on strokes

  window.addEventListener("scroll", repaintCanvasBasedOnStrokes);
  window.addEventListener("resize", repaintCanvasBasedOnStrokes);

  //set up mouse events
  tool = new ITool(canvas);
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
  console.log("testval: " + testVal);
  if (value != null) strokes = history;

}

function paintLoop(){
  //console.log("paintLoop");
  window.requestAnimationFrame(paintLoop);
}

function repaintCanvasBasedOnStrokes(cvs){
  cvs
}
