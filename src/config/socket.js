import { Server } from "socket.io";
import { productService } from "../services/products.service.js";
import { messageService } from "../services/messages.service.js";

const Websocket = (httpServer) => {

    const socketServer = new Server(httpServer);

    // Namespace para productos (Para no enviar otras cosas a los clientes - Por ejemplo los mensajes del chat)
    const productsSpace = socketServer.of('/products');

    productsSpace.on('connection', async (socket) => {

        // Mensaje de conexion del socke t
        console.log(`Cliente conectado a realTimeProducts - ID: ${socket.id}`)


        // Obtencion de productos actuales 
        try {
            const products = await productService.findAll({});
            socket.emit('products', products);
        } catch (error) {
            socket.emit('error', "No se pudieron obtener los productos");
        }

        // Creacion de productos
        socket.on('productCreated', async (product) => {
            try {
                const newProduct = await productManager.createOne(product);
                productsSpace.emit('newProduct', newProduct);
            } catch (error) {
                socket.emit('error', "No se pudo crear el producto");
            }
        });

        // Actualizacion de productos
        socket.on('productUpdated', async (product) => {
            try {
                const updatedProduct = await productService.updateOne(product);
                productsSpace.emit('updatedProduct', updatedProduct);
            } catch (error) {
                socket.emit('error', "No se pudo actualizar el producto");
            }
        });

        // Eliminacion de productos
        socket.on('productDeleted', async (product) => {
            try {
                const deletedProduct = await productService.deleteOne(product);
                productsSpace.emit('deletedProduct', deletedProduct);
            } catch (error) {
                socket.emit('error', "No se pudo eliminar el producto");
            }
        });

        // Mensaje de desconexion del socket
        socket.on('disconnect', () => {
            console.log(`Cliente desconectado de realTimeProducts - ID: ${socket.id} `);
        });
    });

        // Namespace para chat (Para no enviar otras cosas a los clientes - Por ejemplo los productos)
        const chatSpace = socketServer.of('/chat');

        chatSpace.on('connection', async (socket) => {
            // Mensaje de conexion del socket
            console.log(`Cliente conectado al chat - ID: ${socket.id}`)

            socket.on('newUser', (user) => {
                // broadcast del usuario que se conecto
                socket.broadcast.emit('newUserBroadcast', user);
            });

            // Nuevo mensaje del chat
            socket.on('newMessage', async (message) => {
                try {
                    const newMsg = await messageService.createOne(message);
                    chatSpace.emit('messageCreated', newMsg);
                } catch (error) {
                    socket.emit('error', "No se pudo enviar el mensaje");
                }
            });

            // Mensaje de desconexin del socket
            socket.on('disconnect', () => {
                console.log(`Cliente desconectado del chat - ID: ${socket.id} `);
            });
        });

        return socketServer;
}

export default Websocket;