import { productManager } from '../dao/db/ProductManager.js';


const products = async (req, res) => {
    const products = await productManager.findAll(req.query);

    return res.render('products', {
        products,
        style: 'products.css'
    });
}

const realTimeChat = async (req, res) => {
    return res.render('chat', {
        style: 'chat.css'
    });
}

const realTimeProducts = async (req, res) => {
    return res.render('realTimeProducts', {
        style: 'realTimeProducts.css'
    });
}

export default {
    products,
    realTimeProducts,
    realTimeChat
}