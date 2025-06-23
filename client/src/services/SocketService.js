import { io } from "socket.io-client";

class SocketService {
    socket = null;

    connect(url) {
        this.socket = io(url);
        return new Promise((resolve) => {
        this.socket.on("connect", () => {
            console.log("Socket connected", this.socket?.id);
            resolve();
        });
        });
    }

    emit(event, data = {}) {
        console.log(event)        
        this.socket.emit(event, data);
    }

    on(event, callback) {
        this.socket.on(event, callback);
    }

    off(event) {
        this.socket.off(event);
    }

    disconnect() {
        if (this.socket) {
        this.socket.disconnect();
        console.log("Socket disconnected");
        }
    }

    getSocket() {
        return this.socket;
    }
}

const socketService = new SocketService();
export default socketService;
