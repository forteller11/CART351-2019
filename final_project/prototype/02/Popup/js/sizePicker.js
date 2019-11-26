'use strict';

let sizeCursor;
function sizeCursorInit(){

  let sizeCanvas = document.getElementById("sizePicker");
  let sizeCtx = sizeCanvas.getContext("2d");
  sizeCanvas.style.pointerEvents = "auto";
  sizeCanvas.style.touchAction = 'none';
  sizeCanvas.style.position = 'relative';
  sizeCanvas.style.zIndex = 20;


sizeCursor = new SizeCursor(sizeCanvas.height-32,sizeCanvas, sizeCtx);
sizeCursor.draw();
console.log(sizeCursor);

    sizeCanvas.addEventListener('pointerdown', (e)=>{
      sizeCursor.mouseDown = true;
      sizeCursor.reposition(e);
      sizeCursor.draw();
    });

    sizeCanvas.addEventListener('pointermove', (e)=>{
      if (sizeCursor.mouseDown){
        sizeCursor.reposition(e);
        sizeCursor.draw();
      }
    });

    sizeCanvas.addEventListener('pointerup', (e)=>{
      sizeCursor.mouseDown = false;
    });

    sizeCanvas.addEventListener('pointerout ', (e)=>{
      sizeCursor.mouseDown = false;
    });


}

//
//
class SizeCursor{
  constructor(y,sizeCanvas,sizeCtx){
    this.mouseDown = false;
    this.y=y;
    this.sizeCanvas=sizeCanvas;
    this.sizeCtx=sizeCtx;

    this.scrollSize = 6;

    this.maxCursorRadius = 64;
    this.minCursorRadius = 1;
    this.size = 8;

  }
  reposition(mouseEvent){

    if (this.mouseDown)
    {
      let minY = this.maxCursorRadius-this.scrollSize*3;
      let maxY = this.sizeCanvas.height-this.scrollSize;
      this.y = mouseEvent.offsetY;
      console.log (this.y);

      if (this.y > maxY)
        this.y = maxY

      if (this.y < minY)
        this.y = minY;

    }
  }
  draw(){

    this.sizeCtx.clearRect(0,0,this.sizeCanvas.width,this.sizeCanvas.height);

    const w = this.sizeCanvas.width;
    const h = this.sizeCanvas.height;
    const minSz = this.minSize;
    const maxSz = this.maxSize;

    let y2 = this.scrollSize;
    let y1 = h - this.scrollSize;

    this.sizeCtx.beginPath();
    this.sizeCtx.moveTo(w/2,y1);
    this.sizeCtx.lineTo(w/2,y2);

    this.sizeCtx.lineWidth = 6;
    this.sizeCtx.lineCap = "round";
    this.sizeCtx.strokeStyle = 'black';
    this.sizeCtx.stroke();
    this.calcSize();

    if (colCursor != null)
      this.sizeCtx.fillStyle = colCursor.col.cssSerialize();
    this.sizeCtx.strokeStyle = 'white';
    this.sizeCtx.lineWidth = 8*(this.size/this.maxCursorRadius) + 1;
    this.drawCircle(w/2, this.y, this.size);

    //when rly light col, draw outline
    if (colCursor != null){
      if (colCursor.col.avgVal() > 235){
        const c = .9;
        this.sizeCtx.lineWidth = 1;
        this.sizeCtx.strokeStyle = new Color(colCursor.col.r*c,colCursor.col.g*c,colCursor.col.b*c,1).cssSerialize();
        this.drawCircle(w/2, this.y, this.size);
      }
    }



    }

    drawCircle(x,y,r, fill=true){
      this.sizeCtx.beginPath();
      this.sizeCtx.moveTo(x+r, y);
      for (let i = 1; i < 32; i++){
        let index = -(i/32) * Math.PI * 2;
        let xx = x + (Math.cos(index) * r) ;
        let yy = y + (Math.sin(index) * r);
        this.sizeCtx.lineTo(xx,yy);
      }
      this.sizeCtx.closePath();
      if (fill) this.sizeCtx.fill();
      this.sizeCtx.stroke();

    }

  calcSize(){
    let lerpAmount = ((this.sizeCanvas.height-this.y)/this.sizeCanvas.height);
    let delta = this.maxCursorRadius - this.minCursorRadius;
    this.size =  (delta * lerpAmount) + this.minCursorRadius;
  }
}
