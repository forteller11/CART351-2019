'use strict';


//var window = getElementsByClassName('Window');
window.onload = main;
var canvas;
var gl;


console.log("ah");

function main(){
  canvas = document.getElementById("canvasId");
  gl = canvas.getContext("webgl2");

  if (gl == null)
  {
    console.error("Couldn't get webGL context!");
    return;
  }

  //gl.useProgram(material01);


console.log(gl);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clearColor(1, 0, 1, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  var vertexShaderSourceCode = document.getElementById("2d-vertex-shader").text;
  var fragmentShaderSourceCode = document.getElementById("2d-fragment-shader").text;
  console.log(vertexShaderSourceCode);
  console.log(window);

  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSourceCode);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSourceCode);

  var program = createProgram(gl, vertexShader, fragmentShader);

  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  console.log(window);
  console.log(glMatrix);
  console.log(glMatrix.glMatrix.toRadian(90));
  console.log(canvas);
}


function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);

  return null;
}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);

  return null;
}
