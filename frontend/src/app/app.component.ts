import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild("image1") image1: ElementRef;
  @ViewChild("myCanvas") myCanvas: ElementRef;

  constructor(
    private socketService: SocketService,
    public sanitizer: DomSanitizer
  ) {
    this.init();

  }
  title = 'frontend';
  lastCalledTime: any;
  fps: number;
  zoomImage: SafeStyle;

  isRunning = false;

  async Delay(milliseconds: number) {
    const result = new Promise<void>(resolve => {
      setTimeout(resolve, milliseconds);
    });
    return result;
  }

  stop() {
    this.socketService.socket.emit("stop");
    this.isRunning = false;
  }

  start() {
    this.socketService.socket.emit("start");
    this.isRunning = true;
  }

  async init() {
    this.stop();
    await this.Delay(1000);

    this.start();

    this.socketService.socket.on('image', (msg: any) => {
      if (!this.lastCalledTime) {
        this.lastCalledTime = Date.now();
        this.fps = 0;
      }
      else {
        let delta = (Date.now() - this.lastCalledTime) / 1000;
        this.lastCalledTime = Date.now();
        this.fps = 1 / delta;
      }

      const image_element = this.image1.nativeElement;
      image_element.src = "data:image/jpeg;base64," + msg;
      this.zoomImage = this.sanitizer.bypassSecurityTrustUrl('url(' + image_element.src + ')');
      // let c = this.myCanvas.nativeElement;
      // let ctx = c.getContext("2d");
      // ctx.drawImage(image_element, 0, 0);

    });
  }
}
