// is the extension activated?

var x; // to store mouse x
var y; // to store mouse y
var imgArray =[]; // array of images
var img;
var croppedImage;
var posX =0;
var isDone =false;

chrome.runtime.sendMessage({name: "isPaused?"}, function (response) {

//Global variables
// Check whether or not the extension is allowed to run

if (response.value != 'true') { // if the extension has been activated
  drawAnimation();
} // end of response.value

/*********************************/



function drawAnimation(){
  console.log("d");
  // Not paused, so make any changes to the document you want here!

      // First we specify a sketch object that will do all the stuff
      // to the canvas placed over the current page.

      var overlaySketch = function (p) {



        p.setup = function() {

           overlayCanvas = p.createCanvas(500, 500);

          // Now we set the CSS of this canvas we've added to the current
          // page.

          overlayCanvas.elt.style.position = 'fixed'; // Fixed position so it's always visible
          overlayCanvas.elt.style.left = '0'; // Aligned hard left
          overlayCanvas.elt.style.top = '0'; // and hard to the top
          overlayCanvas.elt.style["z-index"] = 1000; // Floating over the top of the rest of the page
          overlayCanvas.elt.style["pointer-events"] = 'none'; // Not receiving pointer events

          // Note that depth 1 still means on some sites (like YouTube for example)
          // certain things will be 'higher' than your canvas, going over the top of it.
          // You could always try setting it higher.

          // Note we don't receive pointer events so that the user can still interact
          // with the actual page underneath our canvas. It's probably possible to do
          // both at the same time, but I haven't looked into it.


}; // end setup


// This is the draw function, kind of obvious?

p.draw = function() {
p.clear();
p.background(255,0,0);
p.fill(0);
p.rect(50,50,50,50);







};//end of draw function

p.mousePressed = function()
{
  console.log("clicked");
}
} // end of overlay sketch

// Finally, OUTSIDE the sketch, we actually instantiate the sketch
// using p5 so that it starts running on the page.
var overlaySketchInstance = new p5(overlaySketch);
} // end of startAnimation();

// get the mouse
document.onmousemove=function(e){
   x = e.clientX;
   y = e.clientY;

}
});
