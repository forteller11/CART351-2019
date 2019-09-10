'use strict';


//var window = getElementsByClassName('Window');
window.onload = main;
var canvas;
var gl;


console.log("ah");

function main(){
  canvas = document.getElementById("canvasId");
  gl = canvas.getContext("webgl");

console.log(window);
  if (gl == null)
  {
    console.error("Couldn't get webGL context!");
    return;
  }





  console.log(window);
  console.log(glMatrix);
  console.log(glMatrix.glMatrix.toRadian(90));
  console.log(canvas);
}
