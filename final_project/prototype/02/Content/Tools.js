'use strict';

class Tool {

  constructor(){

    this.strokeDataBuffer = new String();

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

  emptyStrokeDataBuffer(){
    const strToUpload = this.strokeDataBuffer.slice(0); //copy string with value
    this.strokeDataBuffer = new String();
    return strToUpload;
  }


}

class StrokeBrush extends Tool {
  constructor(canvas, canvasCtx, strokeDatas){
    //console.log(canvas);
    super (canvas, canvasCtx, strokeDatas);
    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.a = 1;
    this.width = 5;

  }
onInitClick(e){

  let colorData =
    this.r + ATTRIB_DELIMITER +
    this.g + ATTRIB_DELIMITER +
    this.b + ATTRIB_DELIMITER +
    this.a + ATTRIB_DELIMITER;
    //console.log(colorData);
  let initVert = this.serializeVertData(e) + ATTRIB_DELIMITER;
  let initStrokeSerealized = colorData + initVert;
  this.strokeDataBuffer += initStrokeSerealized;
}

onHold(e){
    this.strokeDataBuffer += this.serializeVertData(e) + ATTRIB_DELIMITER;
}

onRelease(e){
  this.strokeDataBuffer += this.serializeVertData(e) + STROKE_DELIMITER;
}
  serializeVertData(e){
    let xx = e.clientX + window.scrollX;
    let yy = e.clientY + window.scrollY;
    let ww = (this.width * e.pressure*1.5) + this.width/4;
    let str = xx + ATTRIB_DELIMITER + yy + ATTRIB_DELIMITER + ww;
    let strs = str.split(ATTRIB_DELIMITER);
    //console.log(strs);
    return xx + ATTRIB_DELIMITER + yy + ATTRIB_DELIMITER + ww;
  }
}
