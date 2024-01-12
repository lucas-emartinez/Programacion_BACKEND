import { productService } from '../services/products.service.js';
import { userService } from '../services/users.service.js';
import { cartService } from '../services/carts.service.js';

class ViewController {
    constructor() {
        this.productService = productService
        this.userService = userService
        this.cartService = cartService
    }

    login = (req, res) => {
        return res.render('login', {
            style: 'login.css'
        });
    };

    signup = (req, res) => {
        return res.render('signup', {
            style: 'signup.css'
        });
    }

    products = async (req, res) => {
        try {
            const result = await this.productService.findAll(req.query);
            const user = await this.userService.findByEmail(req.user.email);

            return res.render('products', {
                prevPage: result.hasPrevPage ? result.page - 1 : null,
                page: result.page,
                nextPage: result.hasNextPage ? result.page + 1 : null,
                products: result.payload,
                cart: user.cart._id,
                style: 'products.css'
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    carts = async (req, res) => {
        const cartId = req.params.cid;
        const cart = await this.cartService.findById(cartId);
        return res.render('carts', {
            products: cart.products,
            style: 'carts.css'
        });
    }

    realTimeChat = (req, res) => {
        return res.render('chat', {
            style: 'chat.css'
        });
    }

    realTimeProducts = (req, res) => {
        return res.render('realTimeProducts', {
            style: 'realTimeProducts.css'
        });
    };
}

export const viewController = new ViewController();