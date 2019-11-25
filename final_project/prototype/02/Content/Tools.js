'use strict';

class Tool {

  constructor(){

    this.strokeDataBuffer = new Array();
    this.cursorStroke = null; //used to draw the brush cursor
    this.mouseDown = false;

    this.spacingLevel = 8;
    this.spacingCounter = 0;

    window.addEventListener("pointerdown", (e) => {
      this.mouseDown = true;
      this.onInitClick(e);
    });

    window.addEventListener("pointermove", (e) => {
      if (this.mouseDown)
        tool.spacingManager(e);

      this.redrawCursor(e);
    });

    window.addEventListener("pointerup", (e) => {
      this.mouseDown = false;
        tool.onRelease(e);
    });

  }

  onInitClick(e){
    console.warn("oninitclick method has not been implemented!");
  }

  spacingManager (e){

    this.spacingCounter++;

    let spacingLvl = this.spacingLevel;
    if (e.pointerType != 'mouse')
      spacingLvl /= 2;

    if (this.spacingCounter > spacingLvl){
      this.spacingCounter = 0;
      this.onHold(e);
    }
  }

  onHold(e){
    console.warn("onhold method has not been implemented!");
  }

  onRelease(e){
    console.warn("onrelease method has not been implemented!");
  }

  redrawCursor(e){
    console.warn("redrawCursor method has not been implemented!");
  }

}

class StrokeBrush extends Tool {
  constructor(canvas, canvasCtx, strokeDatas){
    //console.log(canvas);
    super (canvas, canvasCtx, strokeDatas);
    this.color = new Color (255, 0, 0, 1);
    this.width = 5;

    let t = this;
    chrome.runtime.onMessage.addListener(
      (request, sender, sendResponse) => {
        this.color.r = request.r;
        this.color.g = request.g;
        this.color.b = request.b;
        this.color.a = request.a;

        console.log(request);
        // console.log(sender);
        // console.log(sendResponse);
        //
          sendResponse({farewell: "GOT IT"});

      });
  }
onInitClick(e){
  let colorData = new Color(this.color.r, this.color.g, this.color.b, this.color.a);
  let firstVert = this.createVertFromMouseEvent(e);

  this.strokeDataBuffer.push(colorData, firstVert);
}

onHold(e){
  this.strokeDataBuffer.push(this.createVertFromMouseEvent(e));
}

onRelease(e){
  this.strokeDataBuffer.push(this.createVertFromMouseEvent(e));
}

createVertFromMouseEvent(e){
  let xx = e.clientX + window.scrollX;
  let yy = e.clientY + window.scrollY;
  let ww = (this.width * e.pressure*1.5) + this.width/4;
  return new Vertex (xx, yy, ww);
}

  redrawCursor(e){
    this.cursorStroke = new Stroke(this.color);
    for (let i = 1; i < 32; i++){
      let index = (i/32) * Math.PI * 2;
      let xx = e.clientX + (Math.cos(index) * this.width/2);
      let yy = e.clientY + (Math.sin(index) * this.width/2);
      this.cursorStroke.verts.push(new Vertex(xx,yy,1));
    }
  //  console.log(this.cursorStroke);
  }
}

class Color {
  constructor(r=255,g=0,b=255,a=1){
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  cssSerialize(){
    return "rgba("+this.r+","+this.g+","+this.b+","+this.a+")";
  }

  cssDeserialize(str){
    console.log(str);
    let arr = str.split(",");
    this.r = parseInt(arr[0]);
    this.g = parseInt(arr[1]);
    this.b = parseInt(arr[2]);
    this.a = parseInt(arr[3]);
  }
}

class Vertex {
  constructor(x,y,w){
    this.x = x;
    this.y = y;
    this.w = w;
  }
}

class Stroke{
  constructor(col){
    this.color = col;
    this.verts = new Array();
  }
}
class StrokeCollection {
  constructor(){
    this.strokes = new Array();
  }

  addData(objs){
    for (let i = 0; i < objs.length; i++){
      //if color, create new stroke
      if (objs[i] instanceof Color)
        this.strokes.push(new Stroke(objs[i]))
      else //otherwise push vertex
        this.strokes[this.strokes.length-1].verts.push(objs[i]);
    }
    //create new stroke
  }

}
