import { productManager } from '../dao/db/ProductManager.js';


const home = async (req, res) => {
    const products = await productManager.findAll();

    return res.render('home', {
        products,
        style: 'home.css'
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
    home,
    realTimeProducts,
    realTimeChat
}