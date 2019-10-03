export class Bird {
  x: number;
  y: number;
  midFlap: any;
  upFlap: any;
  downFlap: any;
  v: number;
  currentFlap: any;
  lastFlap: any;
  flapTime: number;

  constructor() {
    this.y = 200;
    this.x = 100;
    this.v = 6;

    this.midFlap = new Image();
    this.midFlap.src = 'assets/yellowbird-midflap.png';

    this.upFlap = new Image();
    this.upFlap.src = 'assets/yellowbird-upflap.png';

    this.downFlap = new Image();
    this.downFlap.src = 'assets/yellowbird-downflap.png';

    this.flapTime = 10;
    this.lastFlap = this.downFlap;
    this.currentFlap = this.midFlap;
  }

  show(context) {
    this.flapTime--;


    if (!this.flapTime) {
      this.flapTime = 10;
      if (this.currentFlap === this.upFlap || this.currentFlap === this.downFlap) {
        this.currentFlap = this.midFlap;
      } else if (this.currentFlap === this.midFlap) {
        if (this.lastFlap === this.upFlap) {
          this.currentFlap = this.downFlap;
        } else if (this.lastFlap === this.downFlap) {
          this.currentFlap = this.upFlap;
        }
      }
    }
    context.drawImage(this.currentFlap, this.x, this.y);
  }

  move() {
    if (this.v <= 6) {
      this.v += 0.5;
    }
    this.y += this.v;
    if (this.y > 372) {
      this.y = 372;
    }
  }

  fly() {
    this.v = -8;
  }
}
