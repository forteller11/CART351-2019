'use strict';

class Tool {

  constructor() {

    this.strokeDataBuffer = new Array();
    this.cursorStroke = null; //used to draw the brush cursor
    this.mouseDown = false;

    this.spacingLevel = 2;
    this.spacingCounter = 0;

    window.addEventListener("pointerdown", (e) => {
      this.mouseDown = true;
      this.pressureNormalized = 1;
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

  onInitClick(e) {
    console.warn("oninitclick method has not been implemented!");
  }

  spacingManager(e) {

    this.spacingCounter++;

    let spacingLvl = this.spacingLevel;
    if (e.pointerType != 'mouse')
      spacingLvl /= 2;

    if (this.spacingCounter > spacingLvl) {
      this.spacingCounter = 0;
      this.onHold(e);
    }
  }

  onHold(e) {
    console.warn("onhold method has not been implemented!");
  }

  onRelease(e) {
    console.warn("onrelease method has not been implemented!");
  }

  redrawCursor(e) {
    console.warn("redrawCursor method has not been implemented!");
  }

}

class StrokeBrush extends Tool {
  constructor(canvas, canvasCtx, strokeDatas) {
    super(canvas, canvasCtx, strokeDatas);
    this.color = new Color(255, 0, 0, 1);
    this.width = 5;
    this.pickerPos = new Vertex(64,64);
    this.valuePos = 55;
    this.sizePos = 110;


    let t = this;
    chrome.runtime.onMessage.addListener(
      (request, sender, sendResponse) => {
        // console.log(request);
        // console.log(sender);

        switch (request.type) {
          case 'setColor':
            this.color.r = request.r;
            this.color.g = request.g;
            this.color.b = request.b;
            this.color.a = request.a;
            this.pickerPos.x = request.pickerPos.x;
            this.pickerPos.y = request.pickerPos.y;
            this.valuePos = request.valuePos;
            sendResponse({msg: "received set color"});
            break;

          case 'getColor':
            sendResponse({
              pickerPos : {x:this.pickerPos.x, y:this.pickerPos.y},
              valuePos  : this.valuePos,
              sizePos : this.sizePos
            });

          case 'setSize':
            this.width = request.size*2;
            this.sizePos = request.sizePos;
            sendResponse({msg:"received set size"});
            break;

          default:
            console.warn("unrecognized type of chrome message!");
            break;

        } //end of switch
      });



}
onInitClick(e) {
  let colorData = new Color(this.color.r, this.color.g, this.color.b, this.color.a);
  let firstVert = this.createVertFromMouseEvent(e);

  this.strokeDataBuffer.push(colorData, firstVert);
}

onHold(e) {
  this.strokeDataBuffer.push(this.createVertFromMouseEvent(e));
}

onRelease(e) {
  this.strokeDataBuffer.push(this.createVertFromMouseEvent(e));
  strokeCollection.newStrokeToExport = true;
}

createVertFromMouseEvent(e) {
  let xx = e.pageX;
  let yy = e.pageY;
  let ww = (this.width * e.pressure * 1.5) + this.width / 4;
  return new Vertex(xx, yy, ww);
}

redrawCursor(e) {
  this.cursorStroke = new Stroke(this.color);
  let radius = (this.width/2);
  if (this.mouseDown)
    radius *= e.pressure;
  this.cursorStroke.verts.push(new Vertex(e.pageX + radius, e.pageY, 1));
  for (let i = 1; i < 32; i++) {
    let index = (i / 32) * Math.PI * 2;
    let xx = e.pageX + (Math.cos(index) * radius);
    let yy = e.pageY + (Math.sin(index) * radius);
    this.cursorStroke.verts.push(new Vertex(xx, yy, 1));
  }
  this.cursorStroke.verts.push(new Vertex(e.pageX + radius, e.pageY, 1));
}
}

class Color {
  constructor(r = 255, g = 0, b = 255, a = 1) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  cssSerialize() {
    return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
  }

  cssDeserialize(str) {
    let arr = str.split(",");
    this.r = parseInt(arr[0]);
    this.g = parseInt(arr[1]);
    this.b = parseInt(arr[2]);
    this.a = parseInt(arr[3]);
  }
}

class Vertex {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
  }
}

class Stroke {
  constructor(col) {
    this.color = col;
    this.verts = new Array();
    // this.hasBeenExported = true; //if false, marks as dirty
  }
}
class StrokeCollection {
  constructor(str=null) {
    this.newStrokeToExport = false;
    this.strokes = new Array();
    if (str!= null){
      this.deserialize(str);
    }
  }

  addData(objs) {
    for (let i = 0; i < objs.length; i++) {
      //if color, create new stroke
      if (objs[i] instanceof Color)
        this.strokes.push(new Stroke(objs[i]))
      else //otherwise push vertex
        this.strokes[this.strokes.length - 1].verts.push(objs[i]);
    }
    //create new stroke
  }

  serialize() {
    let result = new String();
    for (let i = 0; i < this.strokes.length; i++) {
      result += this.serializeStroke(this.strokes[i]);
    }
    return result;
  }

  serializeStroke(s) {

    let result =
      s.color.r + ATTRIB_DELIMITER +
      s.color.g + ATTRIB_DELIMITER +
      s.color.b + ATTRIB_DELIMITER +
      s.color.a;
    for (let i = 0; i < s.verts.length; i ++) {
      result += ATTRIB_DELIMITER +
        s.verts[i].x + ATTRIB_DELIMITER +
        s.verts[i].y + ATTRIB_DELIMITER +
        s.verts[i].w;
  }
    result += STROKE_DELIMITER;
    return result;
  }

  deserializeAndJoin(str){
    if (str.length === 0)
      return;

    let strokesSerialized = str.split(STROKE_DELIMITER);
    strokesSerialized.splice(strokesSerialized.length-1, 1);
    let newStrokes = new Array(strokesSerialized.length);

    for (let i = 0; i < strokesSerialized.length; i++){
      let attribs = strokesSerialized[i].split(ATTRIB_DELIMITER);
      newStrokes[i] = new Stroke(
        new Color (
          parseInt(attribs[0]),
          parseInt(attribs[1]),
          parseInt(attribs[2]),
          parseInt(attribs[3])
        )
      );

      for (let j = COLOR_DATA_SIZE; j < attribs.length; j += VERT_SIZE){
        let newVert = new Vertex (
          (attribs[j+0]),
          (attribs[j+1]),
          (attribs[j+2])
        );
        newStrokes[i].verts.push(newVert);
      }
    } //end of newStrokes

    for (let i = 0; i < newStrokes.length; i++){ //add newly deserialized strokes to collection
      this.strokes.push(newStrokes[i]);
    }
  }

}
