'use strict';


//let window = getElementsByClassName('Window');
window.onload = main;
let canvas;
let gl;


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

  let vertexShaderSourceCode = document.getElementById("2d-vertex-shader").text;
  let fragmentShaderSourceCode = document.getElementById("2d-fragment-shader").text;
  console.log(typeof(vertexShaderSourceCode));
  console.log(vertexShaderSourceCode);
  console.log(window);

  let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertString);
  let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragString);

  let program = createProgram(gl, vertexShader, fragmentShader);

  let positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  console.log(window);
  console.log(glMatrix);
  console.log(glMatrix.glMatrix.toRadian(90));
  console.log(canvas);
}


function createShader(gl, type, source) {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);

  return null;
}

function createProgram(gl, vertexShader, fragmentShader) {
  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  let success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);

  return null;
}

let vertString =
`// an attribute will receive data from a buffer
 attribute vec4 a_position;

 // all shaders have a main function
 void main() {

   // gl_Position is a special variable a vertex shader
   // is responsible for setting
   gl_Position = a_position;
 }`;

 let fragString =
 `// fragment shaders don't have a default precision so we need
  // to pick one. mediump is a good default
  precision mediump float;

  void main() {
    // gl_FragColor is a special variable a fragment shader
    // is responsible for setting
    gl_FragColor = vec4(1, 0, 0.5, 1); // return redish-purple
  }`
