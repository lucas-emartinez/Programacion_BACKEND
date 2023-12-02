import { productManager } from '../dao/db/ProductManager.js';
import { cartManager } from '../dao/db/CartManager.js';
import { userManager } from '../dao/db/UserManager.js';

const login = (req, res) => {
   return res.render('login', {
        style: 'login.css'
   });
};

const signup = (req, res) => {
    return res.render('signup', {
        style: 'signup.css'
   });
}

const products = async (req, res) => {    
    const result = await productManager.findAll(req.query);
    const user =  await userManager.findByEmail(req.user.email);
    return res.render('products', {
        prevPage: result.hasPrevPage ? result.page - 1 : null,
        page: result.page,
        nextPage: result.hasNextPage ? result.page + 1 : null,
        products: result.payload,
        cart: user.cart._id,
        style: 'products.css'
    });
}

const carts = async (req, res) => {
    const cartId = req.params.cid;
    const cart = await cartManager.findById(cartId);
    return res.render('carts', {
        products: cart.products,
        style: 'carts.css'
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
};

export default {
    login,
    signup,
    carts,
    products,
    realTimeProducts,
    realTimeChat
}