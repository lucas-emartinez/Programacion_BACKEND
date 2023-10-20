import { productManager } from '../dao/db/ProductManager.js';
import { cartManager } from '../dao/db/CartManager.js';

const products = async (req, res) => {    
    const cart = await cartManager.createOne();
    const result = await productManager.findAll(req.query);
    
    return res.render('products', {
        cart: cart._id,
        prevPage: result.hasPrevPage ? result.page - 1 : null,
        page: result.page,
        nextPage: result.hasNextPage ? result.page + 1 : null,
        products: result.payload,
        style: 'products.css'
    });
}

const carts = async (req, res) => {
    const cartId = req.params.cid;
    const cart = await cartManager.findById(cartId);
    return res.render('carts', {
        products: cart.products,
        style: 'cart.css'
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
    carts,
    products,
    realTimeProducts,
    realTimeChat
}