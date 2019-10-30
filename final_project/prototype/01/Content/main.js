console.log("ahhh234");
let graffiti = false;
let strokes = [];

window.onload = graffitiLoop;

function graffitiLoop(){
  graffitiGUI();
  if (graffiti) window.requestAnimationFrame(graffitiLoop);
}

function graffitiGUI(){
console.log("animate");
}
