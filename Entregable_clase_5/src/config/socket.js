import { Server } from "socket.io";

const WebSocketServer = (httpServer) => {
    const socket = new Server(httpServer);
    
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
   

    return socket;
}

export default WebSocketServer;