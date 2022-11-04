import { io, Socket } from "socket.io-client";
import { environment } from 'src/environments/environment';

export class WebsocketService {

    public socket!: Socket;
  
    constructor() {   }
    
    setupSocketConnection() {
      this.socket = io(environment.SOCKET_ENDPOINT, {
        query: {
          token: localStorage.getItem('token') || ''
        }
      });
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
  }