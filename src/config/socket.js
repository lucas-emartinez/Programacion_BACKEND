import { Server } from "socket.io";
import { productManager } from "../dao/db/ProductManager.js";

const Websocket = (httpServer) => {

    const socket = new Server(httpServer);
    socket.on('connection', (socket) => {

        // Mensaje de conexion del socket
        console.log(`Cliente conectado - ID: ${socket.id}`)

        // Mensaje de desconexion del socket
        socket.on('disconnect', () => {
            console.log(`Cliente desconectado - ID: ${socket.id} `);
        });

        // Obtencion de productos actuales 
        socket.emit('products', async () => {
            try {
                const products = await productManager.findAll();
                console.log(products)
                return products;
            } catch (error) {
                socket.emit('error', "No se pudo obtener los productos");
            }
        });

        // Creacion de productos
        socket.on('productCreated', async (product) => {
            try {
                const newProduct = await productManager.createOne(product);
                socket.emit('newProduct', newProduct);
            } catch (error) {
                socket.emit('error', "No se pudo crear el producto");
            }
        });

        // Actualizacion de productos
        socket.on('productUpdated', async (product) => {
            try {
                const updatedProduct = await productManager.updateOne(product);
                socket.emit('updatedProduct', updatedProduct);
            } catch (error) {
                socket.emit('error', "No se pudo actualizar el producto");
            }
        });

        // Eliminacion de productos
        socket.on('productDeleted', async (product) => {
            try {
                const deletedProduct = await productManager.deleteOne(product);
                socket.emit('deletedProduct', deletedProduct);
            } catch (error) {
                socket.emit('error', "No se pudo eliminar el producto");
            }1
        });
    });
    
    return socket;
}

export default Websocket;