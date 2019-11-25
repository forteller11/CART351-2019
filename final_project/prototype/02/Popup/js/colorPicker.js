'use strict';

let colCursor;
let valCursor;
function colorCursorInit(){
  let canvas = document.getElementById("colorPicker");
  let ctx = canvas.getContext("2d");
  canvas.style.pointerEvents = "auto";
  canvas.style.touchAction = 'none';
  canvas.style.position = 'absolute';

  let canvasPicker = document.getElementById("colorCursor");
  let ctxPicker = canvasPicker.getContext("2d");

  canvasPicker.style.pointerEvents = "auto";
  canvasPicker.style.touchAction = 'none';
  canvasPicker.style.position = 'absolute';
  canvasPicker.style.zIndex = 2;

  let canvasValue = document.getElementById("valuePicker");
  let ctxValue = canvasValue.getContext("2d");
  canvasValue.style.pointerEvents = "auto";
  canvasValue.style.touchAction = 'none';
  canvasValue.style.zIndex = 3;
  canvasValue.style.position = 'relative';

  colCursor = new ColorPickerCursor(canvas.width/2,80);
  valCursor = new ValueCursor(canvasValue.width/2, canvasValue, ctxValue);

  canvasPicker.addEventListener('pointerdown', (e)=>{
    if (mouseWithinTriangle(e, canvasPicker, ctxPicker)){
      colCursor.mouseDown = true;
      colCursor.reposition(e);
      sizeCursor.draw();
    }
    colCursor.drawSelfInCanvas(canvasPicker, ctxPicker, ctx);
  });

  canvasPicker.addEventListener('pointermove', (e)=>{
    if ((colCursor.mouseDown) && (mouseWithinTriangle(e, canvasPicker, ctxPicker))){
      colCursor.reposition(e);
      sizeCursor.draw();
      colCursor.drawSelfInCanvas(canvasPicker, ctxPicker, ctx);
    }
    });

  canvasPicker.addEventListener('pointerup', (e)=>{
    colCursor.mouseDown = false;
    if (mouseWithinTriangle(e, canvasPicker, ctxPicker)){
      colCursor.reposition(e);
      sizeCursor.draw();
    }
    colCursor.drawSelfInCanvas(canvasPicker, ctxPicker, ctx);
    });

    canvasPicker.addEventListener('pointerout ', (e)=>{
      col.mouseDown = false;
    });


    canvasValue.addEventListener('pointerdown', (e)=>{
      valCursor.mouseDown = true;
      valCursor.reposition(e);
      sizeCursor.draw();
      drawTriangle(canvas, ctx, valCursor.value);
    });

    canvasValue.addEventListener('pointermove', (e)=>{
      if (valCursor.mouseDown){
        valCursor.reposition(e);
        valCursor.draw();
        sizeCursor.draw();
        drawTriangle(canvas, ctx, valCursor.value);
        colCursor.drawSelfInCanvas(canvasPicker, ctxPicker, ctx);
      }
    });

    canvasValue.addEventListener('pointerup', (e)=>{
      valCursor.mouseDown = false;
      sizeCursor.draw();
    });

    canvasValue.addEventListener('pointerout ', (e)=>{
      valCursor.mouseDown = false;
    });


drawTriangle(canvas, ctx, valCursor.value);
valCursor.draw();
colCursor.drawSelfInCanvas(canvasPicker, ctxPicker, ctx, true);
}

function mouseWithinTriangle (mouseEvent, canvas, ctx){
  let tri = new Path2D();
  tri.moveTo(canvas.width/2,0);
  tri.lineTo(0,canvas.height);
  tri.lineTo(canvas.width,canvas.height);
  return ctx.isPointInPath(tri, mouseEvent.offsetX, mouseEvent.offsetY);
}
function drawTriangle(c, ctx, brightness){
  let value = brightness*dist(new Vertex(0,0), new Vertex(c.width,c.height));
  let c1 = new Vertex(c.width/2, 0);
  let c2 = new Vertex(0,c.height);
  let c3 = new Vertex(c.width,c.height);

  //let dist = canvas.width/2;

  let p1 = new Vertex(c.width/2, 0); //r
  let p2 = new Vertex(0,c.height); //g
  let p3 = new Vertex(c.width,c.height);

  ctx.putImageData(colorTriangle(c, p1, p2, p3, value),0,0);

  let clip1 = new Path2D();
    clip1.moveTo(c3.x,c3.y);
    clip1.lineTo(c.width,0);
    clip1.lineTo(c1.x,c1.y);
    clip1.lineTo(0,0);
    clip1.lineTo(c2.x,c2.y);
    clip1.lineTo(c1.x,c1.y);
  ctx.clip(clip1, "nonzero");
  ctx.fillStyle = 'white';
  ctx.fillRect(0,0,c.width,c.height);
}

function rgbaCol(r,g,b,a){
  return "rgba("+r+","+g+","+b+","+a+")";
}

function lerp(v1, v2, lerp){
  let delta = v2 - v1;
  let lerpValue = delta * lerp;
  let result = lerpValue + v1;
}

function dist(p1,p2){
  return Math.sqrt((p2.x-p1.x)*(p2.x-p1.x) + (p2.y-p1.y)*(p2.y-p1.y));
}

function findLerp(x1, y1, x2, y2, p1, p2){
  let xLerp = x2-x1;
  let yLerp = y
  let delta = v2 - v1;
  let lerpValue = delta * lerp;
  let result = lerpValue + v1;
}

//lerp so that each color is ind
function colorTriangle(c, p1, p2, p3, value){

  let data = new Uint8ClampedArray (c.width*c.height*4);
  for (let i = 0; i < c.width; i++){
    for (let j = 0; j < c.height; j++){
      let index = (j + (i * c.width)) * 4;
      let currentPoint = new Vertex(j,i);
      let rr = (
        value/dist(currentPoint,p1)
      );

      let gg = (
        value/dist(currentPoint,p2)
      );

      let bb = (
        value/dist(currentPoint,p3)
      );

      data[index + 0] = rr;
      data[index + 1] = gg;
      data[index + 2] = bb;
      data[index + 3] = 255;
    }
  }

  return new ImageData(data, c.width, c.height);
}

class Vertex {
  constructor(x,y){
    this.x=x;
    this.y=y;
  }
}

class ColorPickerCursor{
  constructor(x,y){
    this.pos = new Vertex(x,y);
    this.col = new Color(0,0,0,255);
    this.mouseDown = false;
    this.holdRadius = 16;
    this.restRadius = 8;
  }

  reposition(mouseEvent){
    this.pos.x = mouseEvent.offsetX;
    this.pos.y = mouseEvent.offsetY;
  }

  drawSelfInCanvas(canvas, ctx, ctxToPickFrom, firstUpdate=false){
    console.log(this.col);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, this.col, function(response) {
    console.log(response.farewell);
  });
});



    let radius = (this.mouseDown)?this.holdRadius:this.restRadius;
    ctx.clearRect(0,0,canvas.width,canvas.height);

    if (firstUpdate===false){ //only color pick after first update
      let data = ctxToPickFrom.getImageData(this.pos.x, this.pos.y, 1, 1).data;
      this.col.r = data[0];
      this.col.g = data[1];
      this.col.b = data[2];
      this.col.a = data[3];
  }
    ctx.beginPath();
    ctx.moveTo(this.pos.x+radius, this.pos.y);
    for (let i = 1; i < 32; i++){
      let index = (i/32) * Math.PI * 2;
      let xx = this.pos.x + (Math.cos(index) * radius) ;
      let yy = this.pos.y + (Math.sin(index) * radius);
      ctx.lineTo(xx,yy);
    }
    ctx.closePath();
    //ctx.fillStyle = 'black';
    ctx.fillStyle = this.col.cssSerialize();
    ctx.lineWidth = radius/3 +2;

    ctx.strokeStyle = (this.col.avgVal() < 185)? 'white':'black';
    ctx.stroke();
    ctx.fill();

  }
}

class ValueCursor{
  constructor(x,canvas,ctx){
    this.mouseDown = false;
    this.x=x;
    this.canvas=canvas;
    this.ctx=ctx;
    this.minBrightness = 0;
    this.maxBrightness = 200;
    this.gradientWidth = this.canvas.width;
    this.gradientHeight = this.canvas.height*.3;
    this.pointerWidth = canvas.width/10;
    this.pointerHeight = canvas.height;
    this.value = 100;

  }
  reposition(mouseEvent){
    if (this.mouseDown)
    {
      this.x = mouseEvent.offsetX;
      if (this.x > this.gradientWidth-this.pointerWidth/2){
        this.x = this.gradientWidth-this.pointerWidth/2
      }
      if (this.x < this.pointerWidth/2){
        this.x = this.pointerWidth/2
      }
    }
  }
  draw(){

    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

    //linear gradient
    let grd = this.ctx.createLinearGradient(0, 0, 170, 0);
    grd.addColorStop(0, "black");
    grd.addColorStop(1, "white");

    this.ctx.fillStyle = grd;
    this.ctx.fillRect(
      0, (this.canvas.height-this.gradientHeight)/2,
      this.canvas.width, this.gradientHeight);

    //rect
    this.calcValue();

    let col = 370*(this.value-this.minBrightness)/(this.maxBrightness-this.minBrightness);
    this.ctx.fillStyle = new Color(col,col,col,255).cssSerialize();
    let xx1 = this.x-this.pointerWidth/2;
    let yy1 = this.canvas.height-this.pointerHeight/(1.58);
    let w2 = this.pointerWidth;
    let h2 = this.pointerHeight/2 +this.gradientHeight/2;
    this.ctx.fillRect(xx1,yy1,w2,h2);
    //this.ctx.strokeStyle = (col > 128)? 'black': 'white';
    if (col > 128){
      this.ctx.strokeStyle = 'black';
      this.ctx.lineWidth = 1;
      // this.ctx.strokeRect(xx1,yy1,xx2,yy2);
    }

  }
  calcValue(){
    let lerpAmount = this.x/this.canvas.width;
    let delta = this.maxBrightness - this.minBrightness;
    this.value =  (delta * lerpAmount) + this.minBrightness;
  }
}

class Color {
  constructor(r=0,g=0,b=0,a=1){
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  cssSerialize(){
    return "rgba("+this.r+","+this.g+","+this.b+","+this.a+")";
  }

  avgVal(){
    return (this.r+this.g+this.b)/3;
  }
}
