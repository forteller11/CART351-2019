'use strict';
function rgbaCol(r,g,b,a){
  return "rgba("+r+","+g+","+b+","+a+")";
}

function constrain (x, min, max){
  if (x < min) x = min;
  if (x > max) x = max;
  return x;
}

// function logSerliazedStrokes(strokeSerializedData){
//   let strokes = strokeSerializedData.split(';');
//   console.log("%rgbaCol(255,0,0,1) testing")
//   for (let i = 0; i < strokes.length; i ++){
//     console.log();
//   }
// }
//
// function logStroke()
