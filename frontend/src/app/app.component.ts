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
  lastCalledTime : any;
  fps : number;    
  
  init() {
    this.socketService.socket.emit("check");
    this.socketService.socket.on('image', (msg: any) => {
      console.log("new image!!!");
      if (!this.lastCalledTime) {
        this.lastCalledTime = Date.now();
        this.fps = 0;
      }
      else
      {
       let delta = (Date.now() - this.lastCalledTime) / 1000;
       this.lastCalledTime = Date.now();
       this.fps = 1 / delta;
      }
      

      const image_element = this.image1.nativeElement;
      image_element.src = "data:image/jpeg;base64," + msg;

      // let c = this.myCanvas.nativeElement;
      // let ctx = c.getContext("2d");
      // ctx.drawImage(image_element, 0, 0);




    });
  }
}
