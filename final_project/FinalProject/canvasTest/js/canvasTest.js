'use strict';
window.onload = main;

function main(){
  let canvas = document.getElementById("colorPicker");
  let ctx = canvas.getContext("2d");
  console.log(canvas);
  console.log(ctx);
  ctx.fillStyle = rgbaCol(255,0,0,1);
  ctx.fillRect(0,0, canvas.width, canvas.height);
  let brightness = 130;
  let value = brightness*dist(new Vertex(0,0), new Vertex(canvas.width,canvas.height));
  console.log(value)
  let p1 = new Vertex(canvas.width/2, 0);
  let p2 = new Vertex(0,canvas.height);
  let p3 = new Vertex(canvas.width,canvas.height);

  ctx.putImageData(colorTriangle(canvas, p1, p2, p3, value),0,0);

  ctx.fillStyle = rgbaCol(255,255,255,1);

  let clip1 = new Path2D();
  console.log(clip1);
    clip1.moveTo(p3.x,p3.y);
    clip1.lineTo(canvas.width,0);
    clip1.lineTo(p1.x,p1.y);
    clip1.lineTo(0,0);
    clip1.lineTo(p2.x,p2.y);
    clip1.lineTo(p1.x,p1.y);
  ctx.clip(clip1, "evenodd");
  // ctx.restore();
  // let clip2 = new Path2D();
  // console.log(clip2);
  //   clip2.moveTo(p1.x,p1.y);
  //   clip2.lineTo(0,0);
  //   clip2.lineTo(p2.x,p2.y);
  // ctx.clip(clip2, "evenodd");

  ctx.fillStyle = 'white';
  ctx.fillRect(0,0,canvas.width,canvas.height);


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
