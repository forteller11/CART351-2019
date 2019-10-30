console.log("ahhh234");
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
