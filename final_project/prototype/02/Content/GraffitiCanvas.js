'use strict';

class GraffitiCanvas {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.backgroundFill = new Color(0,255,0,.2);

    window.addEventListener("resize", (e) => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.ctx = this.canvas.getContext('2d');
      this.ctx.lineCap = "round";
      this.ctx.fillStyle = rgbaCol(0, 255, 255, 0.4);
    });

  }

  clearCanvas() {
    this.ctx.fillStyle = this.backgroundFill.cssSerialize();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawStrokeLine(stroke) {
    this.ctx.strokeStyle = stroke.color.cssSerialize();

    for (let i = 0; i < stroke.verts.length - 1; i++) {

      this.ctx.lineWidth = stroke.verts[i].w;
      this.ctx.beginPath();

      this.ctx.moveTo(
        stroke.verts[i + 0].x - window.scrollX,
        stroke.verts[i + 0].y - window.scrollY
      );

      this.ctx.lineTo(
        stroke.verts[i + 1].x - window.scrollX,
        stroke.verts[i + 1].y - window.scrollY
      );

      this.ctx.stroke();
    }
  }

  drawStrokeFill(stroke) {

    this.ctx.fillStyle = stroke.color.cssSerialize();
    this.ctx.beginPath();

    for (let i = 0; i < stroke.verts.length - 1; i++) {

      this.ctx.lineWidth = stroke.verts[i].w;

      this.ctx.lineTo(
        stroke.verts[i + 0].x - window.scrollX,
        stroke.verts[i + 0].y - window.scrollY
      );

      this.ctx.lineTo(
        stroke.verts[i + 1].x - window.scrollX,
        stroke.verts[i + 1].y - window.scrollY
      );
    }
    this.ctx.fill();
  }


}
