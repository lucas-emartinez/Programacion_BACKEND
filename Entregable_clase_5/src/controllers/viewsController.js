import { socketServer }  from '../app.js';
import { productManager } from '../impl/ProductManager.js';


const home = async (req, res) => {

    const products = await productManager.getProducts();

    return res.render('home', {
        products,
        style: 'home.css'
    });
}

const realTimeProducts = async (req, res) => {
    
        const products = await productManager.getProducts();

        socketServer.on('connection', (socket) => {
            socket.emit('products', products);
        });

        return res.render('realTimeProducts', {
            style: 'realTimeProducts.css'
        });
    }

export default {
    home,
    realTimeProducts
}