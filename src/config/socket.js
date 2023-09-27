import { Server } from "socket.io";

const WebSocketServer = (httpServer) => {

    const socket = new Server(httpServer);
    socket.on('connection', (socket) => {

        console.log(`Cliente conectado - ID: ${socket.id}`)

        socket.on('disconnect', () => {
            console.log(`Cliente desconectado - ID: ${socket.id} `);
        });
    });
    
    return socket;
}

export default WebSocketServer;