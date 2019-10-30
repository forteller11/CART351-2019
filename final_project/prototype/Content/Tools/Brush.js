class Brush extends ITool{
  constructor(canvas){
    super.constructor(canvas);
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 255;
    this.radius;
    this.canvas;
    this.pressure = 0.5;
  }

  onClick(){

  }
}
