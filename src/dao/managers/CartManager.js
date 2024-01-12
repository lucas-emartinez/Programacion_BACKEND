import { cartsModel } from '../models/carts.model.js';
import { productManager } from './ProductManager.js';
import BaseManager from './baseManager.js';


class CartManager extends BaseManager {
    constructor() {
        super(cartsModel, "products.product")
    }        

    async addProductToCart(cartId, productId) {
        try {
            const cart = await this.model.findById(cartId);
            
            if (!cart) return CART_NOT_EXIST;

            const product = await productManager.findById(productId);
            if (!product) return PRODUCT_NOT_EXIST;

            const productExist = cart.products && cart.products.find(p => p.product._id == productId);
            
            if (productExist) {
                productExist.quantity += 1;
            } else {
                cart.products.push({product: product._id, quantity: 1});
            }

            const result = await cartManager.updateOne(cartId, cart);
            
            return result;
        } catch (error) {
            return `Error al añadir el producto al carrito`;
        }
    }

    async updateCart(cartId, cart) {
        try {
            const result = await this.model.findByIdAndUpdate(cartId, cart).populate(this.populateOption);
            return result;
        } catch (error) {
            return `Error al actualizar el carrito`;
        }
    }

    async updateProductQuantity(cartId, productId, quantity) {
        try {
            const cart = await this.model.findById(cartId);
            if (!cart) return 'El carrito no existe'

            const product = cart.products.find(p => p.product._id == productId);
            if (!product) return 'El producto no existe';

            if (quantity === 0) {
                return await this.deleteProductFromCart(cartId, productId);
            } else{
                product.quantity = quantity;
            }

            const result = await cart.save();

            return result;
        } catch (error) {
            return `Error al actualizar la cantidad del producto en el carrito`;
        }
    }

    async deleteAllProductsFromCart(cartId) {
        try {
            const cart = await this.model.findById(cartId);
            if (!cart) return 'El carrito no existe';

            cart.products = [];

            const result = await cart.save();

            return result;
        } catch (error) {
            return `Error al eliminar todos los productos del carrito`;
        }
    }

    async getProductsByCartId(cartId) {
        try {
            const cart = await this.model.findById(cartId).populate(this.populateOption);
            
            if (!cart) return 'El carrito no existe';
            
            const products = cart.products 
            return products;
        } catch (error) {
            return `Error al obtener los productos del carrito`;
        }
    }

    async getCart(cartId) {
        try {
            const cart = await this.model.findById(cartId).populate(this.populateOption);
            return cart;
        } catch (error) {
            return `Error al obtener el carrito`;
        }
    }

    async deleteProductFromCart(cartId, productId) {
        try {
            const cart = await this.model.findById(cartId);
            if (!cart) return 'El carrito no existe';

            const product = cart.products.find(p => p.product._id == productId);
            if (!product) return 'El producto no existe';

            cart.products = cart.products.filter(p => p.product._id != productId);

            const result = await cart.save(cart);

            return result;
        } catch (error) {
            return `Error al eliminar el producto del carrito`;
        }
    }
}

export const cartManager = new CartManager();

