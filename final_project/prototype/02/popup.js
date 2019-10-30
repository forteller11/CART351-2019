'use strict';
window.onload = main;

function main(){
  let brush = document.getElementById("brush");

  brush.addEventListener('click', ()=>{
    console.log("brush clicked");
    //change tool to brush on current tab (or all tabs?)
  });
}
