import { cartsModel } from '../models/carts.model.js';
import { productManager } from './ProductManager.js';
import BaseManager from './BaseManager.js';
import errors from '../../config/errors.js';

const {
    CART_NOT_EXIST,
    PRODUCT_NOT_EXIST,
    PRODUCT_TO_DELETE_NOT_EXIST
} = errors;


class CartManager extends BaseManager {
    constructor() {
        super(cartsModel)
    }        

    async findAll(opts) {
        try {
            const info
            
            const result = await this.model.paginate({}, opts);
            return result;
        } catch (error) {
            return GET_CARTS_ERROR;
        }
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

    async getProductsByCartId(cartId) {
        try {
            const cart = await this.model.findById(cartId);
            
            if (!cart) return CART_NOT_EXIST;

            const products = cart.products;

            return products;
        } catch (error) {
            return `Error al obtener los productos del carrito`;
        }
    }

    async deleteProductFromCart(cartId, productId) {
        try {
            const cart = await this.model.findById(cartId);
            if (!cart) return CART_NOT_EXIST;

            const product = cart.products.find(p => p.id == productId);
            if (!product) return PRODUCT_TO_DELETE_NOT_EXIST;

            cart.products = cart.products.filter(p => p.id != productId);

            await cart.save();

            return cart;
        } catch (error) {
            return `Error al eliminar el producto del carrito`;
        }
    }
}

export const cartManager = new CartManager();

