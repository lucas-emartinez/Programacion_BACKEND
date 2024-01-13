import { productService } from '../../services/products.service.js';
import { cartsModel } from '../models/carts.model.js';
import BaseManager from './baseManager.js';

class CartManager extends BaseManager {

    constructor() {
        super(cartsModel, "products.product");
    }

    async addProductToCart(cartId, productId) {
        try {
            const cart = await this.model.findById(cartId);
            
            if (!cart) {
                throw new Error('El carrito no existe');
            }

            const product = await productService.findById(productId);
            if (!product) {
                throw new Error('El producto no existe');
            }

            const productExist = cart.products && cart.products.find(p => p.product._id === productId);
            
            if (productExist) {
                productExist.quantity += 1;
            } else {
                cart.products.push({ product: product._id, quantity: 1 });
            }

            const result = await this.updateOne(cartId, cart);
            
            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateCart(cartId, cart) {
        try {
            const result = await this.model.findByIdAndUpdate(cartId, cart).populate(this.populateOption);
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateProductQuantity(cartId, productId, quantity) {
        try {
            const cart = await this.model.findById(cartId);
            if (!cart) {
                throw new Error('El carrito no existe');
            }

            const product = cart.products.find(p => p.product._id === productId);
            if (!product) {
                throw new Error('El producto no existe');
            }

            if (quantity === 0) {
                return await this.deleteProductFromCart(cartId, productId);
            } else {
                product.quantity = quantity;
            }

            const result = await cart.save();

            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteAllProductsFromCart(cartId) {
        try {
            const cart = await this.model.findById(cartId);
            if (!cart) {
                throw new Error('El carrito no existe');
            }

            cart.products = [];

            const result = await cart.save();

            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getProductsByCartId(cartId) {
        try {
            const cart = await this.model.findById(cartId).populate(this.populateOption);
            
            if (!cart) {
                throw new Error('El carrito no existe');
            }
            
            const products = cart.products;
            return products;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getCart(cartId) {
        try {
            const cart = await this.model.findById(cartId).populate(this.populateOption);
            return cart;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteProductFromCart(cartId, productId) {
        try {
            const cart = await this.model.findById(cartId);
            if (!cart) {
                throw new Error('El carrito no existe');
            }

            const product = cart.products.find(p => p.product._id === productId);
            if (!product) {
                throw new Error('El producto no existe');
            }

            cart.products = cart.products.filter(p => p.product._id !== productId);

            const result = await cart.save();

            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const cartManager = new CartManager();
