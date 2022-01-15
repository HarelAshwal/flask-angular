import { Injectable } from '@angular/core';

import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'http://' + window.location.hostname + ':5000';

// Actions you can take on the App
export enum Action {
    JOINED,
    LEFT,
    RENAME
}

// Socket.io events
export enum Event {
    CONNECT = 'connect',
    DISCONNECT = 'disconnect',
    SERVER_INIT = 'server-init'
}

class SocketIoMsgObj {
    constructor(
        public msg: string,
    ) { }
}

@Injectable()
export class SocketService {
    constructor(
    ) {
        this.socket = io(SERVER_URL);
        this.initSocket();
    }

    public socket: Socket;

    public initSocket(): void {
        // client-side
        this.socket.on("connect", () => {
            console.log("SocketIO connected, ID : " + this.socket.id); // x8WIv7-mJelg7on_ALbx
        });

        this.socket.on('message', (data: any) => console.log(JSON.stringify(data)));

    }

    public send(cmd: string, obj: any = undefined): void {
        this.socket.emit(cmd, obj);
    }



}