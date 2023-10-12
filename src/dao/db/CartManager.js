import { cartsModel } from '../models/carts.model.js';
import { productManager } from './ProductManager.js';
import BaseManager from './BaseManager.js';


class CartManager extends BaseManager {
    constructor() {
        super(cartsModel)
    }

    async addProductToCart(cartId, productId) {
        try {
            const cart = await this.model.findById(cartId);
            if (!cart) return CART_NOT_EXIST;

            const product = await productManager.findById(productId);
            if (!product) return PRODUCT_NOT_EXIST;

            const productExist = cart.products && cart.products.find(p => p.id == productId);

            if (productExist) {
                productExist.quantity += 1;
            } else {
                const product = {
                    id: productId,
                    quantity: 1
                }
                cart.products.push(product);
            }

            await cart.save();
            
            return cart;
        } catch (error) {
            return `Error al añadir el producto al carrito: ${error}`;
        }
    }
}

export const cartManager = new CartManager();

