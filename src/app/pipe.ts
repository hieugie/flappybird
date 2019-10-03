export class Pipe {
  x: number;
  y: number;
  image: any;
  speed: number;
  centerSpace: number;
  space: number;
  isScored: boolean;

  constructor() {
    this.x = 800;
    this.y = 0;
    this.image = new Image();
    this.image.src = 'assets/pipe-green.png';
    this.speed = 3;
    this.space = 120;
    this.isScored = false;
    this.randomCenterSpace();
  }

  randomCenterSpace() {
    do {
      this.centerSpace = Math.floor(Math.random() * 400);
    } while (this.centerSpace < 80 || this.centerSpace > 320);
  }

  move() {
    this.x -= this.speed;
  }

  show(context) {
    context.fillStyle = 'white';
    context.drawImage(this.image, this.x, this.centerSpace + this.space / 2);

    context.save();
    context.translate(this.x, this.y);
    context.rotate(-180 * Math.PI / 180);
    context.translate(-this.x, -this.y);
    context.drawImage(this.image, this.x -52, this.y - this.centerSpace + this.space / 2);
    context.restore();
  }
}
