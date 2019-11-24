'use strict';
window.onload = main;

function main(){
  let canvas = document.getElementById("colorPicker");
  let ctx = canvas.getContext("2d");
  console.log(canvas);
  console.log(ctx);
  ctx.fillStyle = rgbaCol(255,0,0,1);
  ctx.fillRect(0,0, canvas.width, canvas.height);
  brush.addEventListener('click', ()=>{
    console.log("brush clicked");
    //change tool to brush on current tab (or all tabs?)
  });

  let clear = document.getElementById("clear");

  clear.addEventListener('click', ()=>{
    console.log("canvas cleared");

    //change tool to brush on current tab (or all tabs?)
  });
}

function rgbaCol(r,g,b,a){
  return "rgba("+r+","+g+","+b+","+a+")";
}
