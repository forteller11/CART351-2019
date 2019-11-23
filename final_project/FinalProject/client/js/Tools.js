'use strict';

class Tool {

  constructor(){

    this.strokeDataBuffer = new String();

    this.mouseDown = false;

    this.spacingLevel = 10;
    this.spacingCounter = 0;

    window.addEventListener("mousedown", (e) => {
      this.mouseDown = true;
      this.onInitClick(e);
    });

    window.addEventListener("mousemove", (e) => {
      if (this.mouseDown)
        tool.spacingManager(e);
    });

    window.addEventListener("mouseup", (e) => {
      this.mouseDown = false;
      tool.onRelease(e);
    });

  }
//simplify stroke and do less

  onInitClick(e){
    console.warn("oninitclick method has not been implemented!");
  }

  spacingManager (e){
    this.spacingCounter++;
    if (this.spacingCounter > this.spacingLevel){
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

  emptyStrokeDataBuffer(){
    // if (this.strokeDataBuffer.length > 0)
    //   console.log(this.strokeDataBuffer);

    const strToUpload = this.strokeDataBuffer.slice(0); //copy string with value
    this.strokeDataBuffer = new String();
    return strToUpload;
  }


}

class StrokeBrush extends Tool {
  constructor(canvas, canvasCtx, strokeDatas){
    console.log(canvas);
    super (canvas, canvasCtx, strokeDatas);
    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.a = 1;
    this.width = 5;

  }
onInitClick(e){
  //
  let colorData =
    this.r + ATTRIB_DELIMITER +
    this.g + ATTRIB_DELIMITER +
    this.b + ATTRIB_DELIMITER +
    this.a + ATTRIB_DELIMITER;
    console.log(colorData);
  let initVert = this.serializeVertData(e) + ATTRIB_DELIMITER;
  let initStrokeSerealized = colorData + initVert;
  this.strokeDataBuffer += initStrokeSerealized;
}

onHold(e){
  this.strokeDataBuffer += this.serializeVertData(e) + ATTRIB_DELIMITER;
}

onRelease(e){
this.strokeDataBuffer += this.serializeVertData(e) + STROKE_DELIMITER;
//logSerliazedStrokes(this.strokeDatas);

}
  serializeVertData(mouseEvent){
    let xx = mouseEvent.clientX;
    let yy = mouseEvent.clientY;
    let ww = this.width;
    return xx + ATTRIB_DELIMITER + yy + ATTRIB_DELIMITER + ww;
  }
}
