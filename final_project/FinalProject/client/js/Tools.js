'use strict';

class Tool {

  constructor(canvas = null, canvasCtxt = null, strokes = null){

    this.canvas;
    this.canvasCtx;
    this.strokes;

    if (canvas == null || canvasCtx == null || strokes === null)
      console.warn("TOOL not constructed fully!");

    this.spacingLevel = 10;
    this.spacingCounter = 0;

    window.addEventListener("mousedown", (e) => {
      this.onInitClick(e);
    });

    window.addEventListener("mousemove", (e) => {
      tool.spacingManager(e);
    });

    window.addEventListener("mouseup", (e) => {
      tool.onRelease(e);
    });

  }
//simplify stroke and do less

  onInitClick(e){
    console.warn("method has not been implemented!");
  }

  spacingManager (e){
    this.spacingCounter++;
    if (this.spacingCounter > this.spacingLevel){
      this.spacingCounter = 0;
      this.onHold(e);
    }
  }

  onHold(e){
    console.warn("method has not been implemented!");
  }

  onRelease(e){
    console.warn("method has not been implemented!");
  }

  createVert(mouseEvent){

  }

}
