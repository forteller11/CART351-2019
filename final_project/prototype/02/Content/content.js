'use strict';

let url = window.location.pathname;
let endOfStroke = 123456789;
//r,g,b,a,width, x,y,x,y....'stop'
let dog = [];
dog.push (1, 2, 3, 20);
let strokes = [255, 0, 0, 1, 40,
     0, 0,   500, 500,
     endOfStroke];
console.log(strokes);
let tool;
let canvasCtx;
let canvas;
let debuggingFillStyle = rgbaCol(0,0,255,0.5);
let mouseXPrev = 0;
let mouseYPrev = 0;
let mouseX=0;
let mouseY=0;

class ITool {
  constructor (ctx){
    this.drag = false;
  }
  onClick(e){
    this.drag = true;
    console.log("onToolClick");
  }
  onDrag(mouseX, mouseY){
    if (this.drag === false) return;
    //console.log("onToolDrag");
  }
  onRelease(expfun){
    this.drag = false;
    console.log("onToolRelease");
  }

  drawSelf(e){
      console.log("tool being drawn");
  }
}

class Brush {
  constructor(){
    this.drag = false;
    console.log("drag "+this.drag);
    this.r = 0;
    this.g = 255;
    this.b = 0;
    this.a = 1;
    this.w = 10;
  }
  onClick(e){
    this.drag = true;
    console.log(e);
    console.log(strokes);
    strokes.push(
      this.r,
      this.g,
      this.b,
      this.a,
      this.w,
      e.clientX,
      e.clientY
    );

  }

  onDrag(e){
    if (this.drag === true){
      //if (this.drag === false) return;
      strokes.push(mouseX, mouseY);
    }
  }

  onRelease(e){
    this.drag = false;
  //  super.onRelease(e);
    strokes.push(e.clientX, e.clientY, endOfStroke);
    localStorage.setItem(url, strokes);
    console.log(strokes);
  }

}

window.onload = main;

function main(){
  console.log("main");
  console.log(window.location.href);

  createCanvas();
  console.log(canvas);
  console.log(canvasCtx);

  getCollectiveStrokes(); //get paintings of any previous users


  window.addEventListener("scroll", () => {
  });

  window.addEventListener("resize", () => {
    resizeCanvas();
  });

  //set up mouse events
  tool = new Brush();
  window.addEventListener("mousedown", (event) => {
    tool.onClick(event);
  });

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    //tool.onDrag(event);
  });

  window.addEventListener("mouseup", (event) => {
    tool.onRelease(event);
  });

  window.requestAnimationFrame(paintLoop); //animation loop
}

function getCollectiveStrokes(){

  console.log("url: "+ url);
  let history = localStorage.getItem(url);
  console.log("history: " + history);
  if (history != null) {
    let strings = history.split(",");
    let newHistory = [];
    for (let i = 0; i < strings.length; i++){
      newHistory.push(parseInt(strings[i],10));
    }
    console.log(strings);
    strokes = newHistory;
  }
  console.log(strokes);

}

function createCanvas(){

  console.log("createcanvas");
  canvas = document.createElement("CANVAS");
  canvas.style.position = "fixed";
  canvas.style.zIndex = 999999999999999999;
  resizeCanvas();
  document.body.appendChild(canvas);

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
  canvasCtx.fillStyle = debuggingFillStyle;
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
  console.log("resize; width: " + canvas.width + "; height: " + canvas.height);
}

function paintLoop(){
  //console.log("paintLoop");
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  //canvasCtx = canvas.getContext("2d");
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  canvasCtx.fillStyle = rgbaCol(0,255,0,.5);
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

   if ((strokes != null) && (strokes != undefined) && (strokes.length > 3)) {
     let index = 0;
     while (index < strokes.length){
       index = drawLine(index);
     }
     //console.log("index1: "+index);
   }

   //if diff between frames
   if (mouseX != mouseXPrev || mouseY != mouseYPrev){
     tool.onDrag();
   }
   mouseXPrev = mouseX;
   mouseYPrev = mouseY;
  //window.requestAnimationFrame(paintLoop);
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

canvasCtx.beginPath();

  //first stroke
  canvasCtx.moveTo(strokes[index+0] - window.scrollX , strokes[index+1] - window.scrollY);
  console.log("X: "+strokes[index+0] + " Y: "+ strokes[index+1]);
  index += 2;

  //console.log(strokes[index]);
  //other strokes
  while ((strokes[index] != endOfStroke)){
    console.log("X: "+strokes[index] + " Y: "+ strokes[index+1]);
    canvasCtx.lineTo(strokes[index+0] - window.scrollX , strokes[index+1] - window.scrollY);
    index += 2;
  } //console.log("index2: "+index);
  index++;
  canvasCtx.stroke();

  return index; //index of r on new stroke or nothing
}


function rgbaCol(r,g,b,a){
  return "rgba("+r+","+g+","+b+","+a+")";
}
