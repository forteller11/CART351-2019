'use strict';



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

let graffiti = false;
let strokes = [];
let pageAcessTimes = 100;
let testVal = 0;
let tool = new ITool();

window.onload = main;

function main(){
  console.log("main");
  console.log(window.location.href);

  getCollectiveCanvas(); //get paintings of any previous users
  window.requestAnimationFrame(graffitiGUI); //animation loop
}

function getCollectiveCanvas(){
  let url = window.location.pathname;
  console.log("url: "+ url);
  testVal = localStorage.getItem(url);
  console.log("testval: " + testVal);
  if (testVal == null) testVal = 0;
  testVal ++;
  localStorage.setItem(url, testVal);

  //if there is a key that matches window.location.href then get tht json and deserialize it
  chrome.storage.local.get([url], (result) => {
          console.log('Value currently is ' + result.key);
          if (result.key == undefined) pageAcessTimes = 0;
          else pageAcessTimes = result.key++;
          chrome.storage.local.set({url : pageAcessTimes}, () => {
                  console.log('Value iss set to ' + pageAcessTimes);
                });
        });

}

function graffitiGUI(){
console.log("animate");
window.requestAnimationFrame(graffitiGUI);
}
