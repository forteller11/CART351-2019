'use strict';


//let window = getElementsByClassName('Window');
window.onload = main;
let canvas;
let gl;


console.log("ah");

function main() {
  canvas = document.getElementById("canvasId");
  gl = canvas.getContext("webgl2");

  if (gl == null) {
    console.error("Couldn't get webGL context!");
    return;
  }
