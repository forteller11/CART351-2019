let submitTexts   = [];
let submitButtons = [];
let eHeight = 64;
window.onload = main;
function main(){
  console.log("AH");
  createGridOfSubmitButtons();
}

function createGridOfSubmitButtons(){
  let bodyE = document.getElementById("main");
  console.log(bodyE);
  let rowNumber = 10;
  let colNumber = 5;

  let containerWidth = window.innerWidth/rowNumber;
  let containerHeight = window.innerHeight/colNumber;
  console.log(window.innerWidth)
  for (let i = 0; i < rowNumber; i ++){
    for (let j = 0; j < colNumber; j++){
      let container = bodyE.appendChild(document.createElement("span"));
      container.style.position = "absolute";
      container.style.left  = j * containerHeight  + "px";
      container.style.top   = i * containerWidth + "px";
      container.style.backgroundColor = "black";
      container.width = containerWidth + "px";
      container.height = containerHeight + "px";
      console.log(container);
      container.appendChild(createSubmitText(j));
      container.appendChild(createSubmitButton(i));
    }
  }
}

function createSubmitText(index){
  let txt = document.createElement("INPUT");
  txt.type = "text";
  let c = (index%2)*255;
  txt.style.backgroundColor = "rgba("+c+",0,255,1)";
  //txt.style.width  = eHeight + "px";
  //txt.style.height = eHeight + "px";;
  return txt;
}

function createSubmitButton(index){
  let butt = document.createElement("BUTTON");
  let c = (index%2)*255;
  butt.style.backgroundColor = "rgba(0,255,"+c+",1)";
  butt.style.width  = eHeight + "px";
  butt.style.height = eHeight + "px";;
  return butt;
}
//creation of inputs


//change color on search to correct width based on rounding... making fine enough
