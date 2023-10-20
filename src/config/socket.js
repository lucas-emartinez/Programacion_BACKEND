import { Server } from "socket.io";
import { productManager } from "../dao/db/ProductManager.js";
import { messageManager } from "../dao/db/MessageManager.js";

const Websocket = (httpServer) => {

    const socket = new Server(httpServer);

    socket.on('connection', async (sock) => {

        // Mensaje de conexion del socket
        console.log(`Cliente conectado - ID: ${sock.id}`)

        // Mensaje de desconexion del socket
        sock.on('disconnect', () => {
            console.log(`Cliente desconectado - ID: ${sock.id} `);
        });

        // Obtencion de productos actuales 
        try {
            const products = await productManager.findAll({});
            sock.emit('products', products);
        } catch (error) {
            sock.emit('error', "No se pudieron obtener los productos");
        }

        // Creacion de productos
        sock.on('productCreated', async (product) => {
            try {
                const newProduct = await productManager.createOne(product);
                  
                socket.emit('newProduct', newProduct);
            } catch (error) {
                sock.emit('error', "No se pudo crear el producto");
            }
        });

        // Actualizacion de productos
        sock.on('productUpdated', async (product) => {
            try {
                const updatedProduct = await productManager.updateOne(product);
                socket.emit('updatedProduct', updatedProduct);
            } catch (error) {
                sock.emit('error', "No se pudo actualizar el producto");
            }
        });

    

        // Eliminacion de productos
        sock.on('productDeleted', async (product) => {
            try {
                const deletedProduct = await productManager.deleteOne(product);
                socket.emit('deletedProduct', deletedProduct);
            } catch (error) {
                sock.emit('error', "No se pudo eliminar el producto");
            }1
        });

        // Obtencion de mensajes actuales
        try {
            const messages = await messageManager.findAll();
            sock.emit('messages', messages);
        } catch (error) {
            sock.emit('error', "No se pudieron obtener los mensajes");
        }
        
        // Nuevo mensaje del chat
        sock.on('newMessage', async (message) => {
            try {
                const newMsg = await messageManager.createOne(message);
                socket.emit('messageCreated', newMsg);
            } catch (error) {
                sock.emit('error', "No se pudo enviar el mensaje");
            }
        });
    });
    
    return socket;
}

export default Websocket;