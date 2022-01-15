import { Component, ElementRef, ViewChild } from '@angular/core';
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
  ) {
    this.init();
  }
  title = 'frontend';

  init() {
    this.socketService.socket.emit("check");
    this.socketService.socket.on('image', (msg: any) => {
      console.log("new image!!!");
      // if (!lastCalledTime) {
      //   lastCalledTime = Date.now();
      //   fps = 0;
      //   return;
      // }
      // delta = (Date.now() - lastCalledTime) / 1000;
      // lastCalledTime = Date.now();
      // fps = 1 / delta;
      // console.log(fps);

      const image_element = this.image1.nativeElement;
      image_element.src = "data:image/jpeg;base64," + msg;

      // let c = this.myCanvas.nativeElement;
      // let ctx = c.getContext("2d");
      // ctx.drawImage(image_element, 0, 0);




    });
  }
}
