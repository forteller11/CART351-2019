console.log("content script loaded");
let graffiti = false;
let strokes = [];

let tool = new Tool();

window.onload = graffitiLoop;

function graffitiLoop(){
  getCollectiveCanvas(); //get paintings of any previous users

  graffitiGUI();
  if (graffiti) window.requestAnimationFrame(graffitiLoop);
}

function getCollectiveCanvas(){
  //if there is a key that matches window.location.href then get tht json and deserialize it
}
function graffitiGUI(){
console.log("animate");
}


class ITool {
  constructor (canvas){
    this.canvas = canvas;
  }
  onClick(){}
  onDrag(){}
  onRelease(){}
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

  }
}
