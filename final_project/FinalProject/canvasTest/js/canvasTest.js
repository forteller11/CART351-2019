'use strict';
window.onload = main;

let colCursor;
let brightness = 140;
function main(){
  let canvasPicker = document.getElementById("colorCursor");
  let ctxPicker = canvasPicker.getContext("2d");
  ctxPicker.fillStyle = 'blue';
  ctxPicker.fillRect(0,0,canvasPicker.width, canvasPicker.height);
  canvasPicker.style.pointerEvents = "auto";
  canvasPicker.style.touchAction = 'none';
  canvasPicker.style.position = 'absolute';
  canvasPicker.style.zIndex = 200;

  let canvas = document.getElementById("colorPicker");
  let ctx = canvas.getContext("2d");
  canvas.style.pointerEvents = "auto";
  canvas.style.touchAction = 'none';
  canvas.style.position = 'absolute';
  canvas.style.zIndex = 20;
  drawTriangle(canvas, ctx, brightness);




  colCursor = new ColorPickerCursor(canvas.width/2,canvas.height/2);

  canvasPicker.addEventListener('pointerdown', (e)=>{
    if (mouseWithinTriangle(e, canvasPicker, ctxPicker)){
      colCursor.mouseDown = true;
      colCursor.reposition(e);
    }
    colCursor.drawSelfInCanvas(canvasPicker, ctxPicker, ctx);
  });

  canvasPicker.addEventListener('pointermove', (e)=>{
    if ((colCursor.mouseDown) && (mouseWithinTriangle(e, canvasPicker, ctxPicker))){
      colCursor.reposition(e);
    } else colCursor.mouseDown = false;
    colCursor.drawSelfInCanvas(canvasPicker, ctxPicker, ctx);
    });

  canvasPicker.addEventListener('pointerup', (e)=>{
    colCursor.mouseDown = false;
    if (mouseWithinTriangle(e, canvasPicker, ctxPicker)){
      colCursor.reposition(e);
    }
    colCursor.drawSelfInCanvas(canvasPicker, ctxPicker, ctx);
    });

    canvasPicker.addEventListener('pointerout ', (e)=>{
      col.mouseDown = false;
      colCursor.drawSelfInCanvas(canvasPicker, ctxPicker, ctx);
    });

}

function mouseWithinTriangle (mouseEvent, canvas, ctx){
  let tri = new Path2D();
  tri.moveTo(canvas.width/2,0);
  tri.lineTo(0,canvas.height);
  tri.lineTo(canvas.width,canvas.height);
  console.log(ctx.isPointInPath(tri, mouseEvent.clientX, mouseEvent.clientY));
  return ctx.isPointInPath(tri, mouseEvent.clientX, mouseEvent.clientY);
}
function drawTriangle(c, ctx, brightness){
  let value = brightness*dist(new Vertex(0,0), new Vertex(c.width,c.height));
  let c1 = new Vertex(c.width/2, 0);
  let c2 = new Vertex(0,c.height);
  let c3 = new Vertex(c.width,c.height);

  //let dist = canvas.width/2;

  let p1 = new Vertex(c.width/2, -c.height/2.5);
  let p2 = new Vertex(-c.width/2,c.height);
  let p3 = new Vertex(c.width+c.width/2.3,c.height);

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
    this.col = new Color(255,0,255,255);
    this.mouseDown = false;
    this.holdRadius = 20;
    this.restRadius = 10;
  }

  reposition(mouseEvent){
    this.pos.x = mouseEvent.clientX;
    this.pos.y = mouseEvent.clientY;
  }

  drawSelfInCanvas(canvas, ctx, ctxToPickFrom){
    let radius = (this.mouseDown)?this.holdRadius:this.restRadius;
    ctx.clearRect(0,0,canvas.width,canvas.height);

    let data = ctxToPickFrom.getImageData(this.pos.x, this.pos.y, 1, 1).data;
    this.col.r = data[0];
    this.col.g = data[1];
    this.col.b = data[2];
    this.col.a = data[3];

    ctx.beginPath();
    ctx.moveTo(radius/2 + this.pos.x, this.pos.y- radius/2);
    for (let i = 1; i < 32; i++){
      let index = (i/32) * Math.PI * 2;
      let xx = this.pos.x + (Math.cos(index) * radius) - radius/2;
      let yy = this.pos.y + (Math.sin(index) * radius) - radius/2;
      ctx.lineTo(xx,yy);
    }
    ctx.lineTo(radius/2 + this.pos.x, this.pos.y- radius/2);
    //ctx.fillStyle = 'black';
    ctx.fillStyle = this.col.cssSerialize();
    ctx.lineWidth = radius/2 +3;

    ctx.strokeStyle = (this.col.avgVal() < 185)? 'white':'grey';
    ctx.stroke();
    ctx.fill();

  }
}

class Color {
  constructor(r=255,g=0,b=255,a=1){
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
