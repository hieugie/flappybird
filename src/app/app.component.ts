import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {Pipe} from './pipe';
import {Bird} from './bird';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  AfterViewInit {
  @ViewChild('canvas', {static: true})
  canvas: ElementRef;
  context: any;
  background: any;
  ground: any;
  pipes: Pipe[];
  count: number;
  bird: Bird;
  isOver: boolean;
  isStart: boolean;
  score: number;

  ngAfterViewInit(): void {
    this.context = (this.canvas.nativeElement as HTMLCanvasElement).getContext('2d');
    this.background = new Image();
    this.background.src = 'assets/background-day.png';
    this.ground = new Image();
    this.ground.src = 'assets/base.png';
    this.pipes = [];
    this.count = 0;
    this.isOver = false;
    this.isStart = false;
    this.bird = new Bird();
    this.score = 0;
    setInterval(() => this.draw(), 15);
  }

  draw() {
    this.context.drawImage(this.background, 0, 0);
    this.context.drawImage(this.background, 288, 0);
    this.context.drawImage(this.background, 288 * 2, 0);
    this.context.drawImage(this.background, 288 * 3, 0);

    if (this.bird.y > 370) {
      this.isOver = true;
    }

    if (this.isStart) {
      this.bird.move();
      if (this.count % 100 === 0) {
        this.pipes.push(new Pipe());
      }

      for(let i = 0; i < this.pipes.length; i++) {
        this.pipes[i].show(this.context);
        if (! this.isOver) {
          this.pipes[i].move();
        }

        if (this.pipes[i].x < -52) {
          this.pipes.shift();
        }

        if (this.pipes[i].x <= (this.bird.x + 34) && (this.pipes[i].x + 52) >= (this.bird.x + 34)
            && (this.pipes[i].centerSpace - (this.pipes[i].space / 2) >= this.bird.y
                  || this.pipes[i].centerSpace + (this.pipes[i].space / 2) <= this.bird.y)) {
          this.isOver = true;
        }

        if (this.pipes[i].x + 52 < this.bird.x && !this.pipes[i].isScored) {
          this.score++;
          this.pipes[i].isScored = true;
        }
      }
    }
    this.bird.show(this.context);

    this.context.drawImage(this.ground, 0, 400);
    this.context.drawImage(this.ground, 336, 400);
    this.context.drawImage(this.ground, 336 * 2, 400);
    this.count++;
    this.context.fillStyle = 'black';
    this.context.font = '20px arial';
    this.context.fillText('Điểm: ' + this.score, 100, 480);
  }

  @HostListener('window:keydown', ['$event'])
  fly(event) {
    if(!this.isStart) {
      this.isStart = true;
    }
    if (event.key === ' ' && !this.isOver) {
      this.bird.fly();
    }
  }
}
