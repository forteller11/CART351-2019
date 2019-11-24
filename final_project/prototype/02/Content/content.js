'use strict';

//git
let url = "graffitiExtension" + window.location.href;
let endOfStroke = 123456789;
//r,g,b,a,width, x,y,x,y....'stop'
let strokes = [];
console.log(strokes);
let tool;
let canvasCtx;
let canvas;
let debuggingFillStyle = rgbaCol(0,0,255,0.5);
let mouseXPrev = 0;
let mouseYPrev = 0;
let mouseX=0;
let mouseY=0;

let pEvent = true;
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
    this.g = 0;
    this.b = 0;
    this.a = 1;
    this.w = 2;

    this.quality = 32; //quality of drawing

    document.addEventListener("keydown", (e) =>{
      let colInc = 15;
      console.log("ah");
      console.log(e.keyCode);
      switch (e.keyCode){
        case 219: //[
          if (this.w > 2) this.w *= .8;
          this.w = constrain(this.w,0,1000);
          break;
        case 221: //]
          this.w *= 1.2;
          this.w = constrain(this.w,0,1000);
          break;
        case 82: //r
          if (e.shiftKey) this.r -= colInc;
          else this.r += colInc;
          this.r = constrain(this.r,0,255);
          break;
        case 71: //g
          if (e.shiftKey) this.g -= colInc;
          else this.g += colInc;
          this.g = constrain(this.g,0,255);
          break;
        case 66: //b
          if (e.shiftKey) this.b -= colInc;
          else this.b += colInc;
          this.b = constrain(this.b,0,255);
          break;
        case 65: //b
          if (e.shiftKey) this.a -= 0.1;
          else this.a += 0.1;
          this.a = constrain(this.a,0,1);
          break;
        case 90: //z
          console.log("toggle pointer event");
          if (pEvent) {
            canvas.style.pointerEvents = "none";
            pEvent = false;
          }
          else {
            canvas.style.pointerEvents = "auto";
            pEvent = true;
          }
          break;

        default:
          break;
        //color
      }
      console.log(e);

    })
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
      e.clientX + window.scrollX,
      e.clientY + window.scrollY
    );

  }

  onDrag(e){
    if (this.drag === true){
      //if (this.drag === false) return;
      strokes.push(mouseX + window.scrollX, mouseY + window.scrollY);
    }
  }

  onRelease(e){
    this.drag = false;
  //  super.onRelease(e);
    strokes.push(e.clientX + window.scrollX, e.clientY + window.scrollY, endOfStroke);
    localStorage.setItem(url, strokes);
    console.log(strokes);
  }

  drawSelf(){
    canvasCtx = canvas.getContext("2d");
    canvasCtx.fillStyle = rgbaCol(this.r,this.g,this.b,this.a);
    canvasCtx.strokeStyle = rgbaCol(this.r,this.g,this.b,this.a);
    canvasCtx.lineWidth = this.w/10;
    canvasCtx.beginPath();
      //first stroke
      canvasCtx.moveTo(mouseX+this.w/2, mouseY);[[]]
      for (let i = 1; i < this.quality; i++){
        let index = (i/this.quality) * Math.PI * 2;
        let xx = mouseX + (Math.cos(index) * this.w/2);
        let yy = mouseY + (Math.sin(index) * this.w/2);
        canvasCtx.lineTo(xx, yy);
      }
      canvasCtx.closePath();
      if (pEvent)
      canvasCtx.fill();
      else canvasCtx.stroke();
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
  canvas.style.pointerEvents = "auto";
  resizeCanvas();
  document.body.appendChild(canvas);
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
  canvasCtx.lineWidth = 20;
  canvasCtx.lineCap = "round";
  canvasCtx.strokeStyle = rgbaCol(0,255,0,.5);
  canvasCtx.strokeRect(0, 0, canvas.width, canvas.height);

   if ((strokes != null) && (strokes != undefined) && (strokes.length > 3)) {
     let index = 0;
     while ((index < strokes.length)&&(index < 10000)){
       index = drawLine(index);
     }
     //console.log("index1: "+index);
   }

   tool.drawSelf();

   //if diff between frames
   if (mouseX != mouseXPrev || mouseY != mouseYPrev){
     tool.onDrag();
   }
   mouseXPrev = mouseX;
   mouseYPrev = mouseY;
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

canvasCtx.beginPath();

  //first stroke
  canvasCtx.moveTo(strokes[index+0] - window.scrollX , strokes[index+1] - window.scrollY);
  //console.log("X: "+strokes[index+0] + " Y: "+ strokes[index+1]);
  index += 2;

  //console.log(strokes[index]);
  //other strokes
  while ((strokes[index] != endOfStroke) && (strokes[index-1] != endOfStroke) && (index < 10000)){
    //console.log("X: "+strokes[index] + " Y: "+ strokes[index+1]);
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

function updateUrl(){
  url = "graffitiExtension" + window.location.href;
}

function constrain (x, min, max){
  if (x < min) x = min;
  if (x > max) x = max;
  return x;
}
