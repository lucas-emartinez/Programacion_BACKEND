import { cartManager } from "../dao/mongoDAO/CartManager.js";

class CartService {
    constructor() {
        this.cartManager = cartManager;
    }

    async createOne(cart) {
        return await cartManager.createOne(cart);
    }

    async findAll(opts) {
        return await cartManager.findAll(opts);
    }

    async findById(cartId) {
        return await cartManager.getCart(cartId);
    }

    async getProductsByCartId(cartId) {
        return await cartManager.getProductsByCartId(cartId);
    }

    async addProductToCart(cartId, productId) {
        return await cartManager.addProductToCart(cartId, productId);
    }

    async updateCart(cartId, cart) {
        return await cartManager.updateCart(cartId, cart);
    }

    async updateProductQuantity(cartId, productId, quantity) {
        return await cartManager.updateProductQuantity(cartId, productId, quantity);
    }

    async deleteAllProductsFromCart(cartId) {
        return await cartManager.deleteAllProductsFromCart(cartId);
    }

    async deleteProductFromCart(cartId, productId) {
        return await cartManager.deleteProductFromCart(cartId, productId);
    }

    async deleteCart(cartId) {
        return await cartManager.deleteOne(cartId);
    }
}

export const cartService = new CartService();