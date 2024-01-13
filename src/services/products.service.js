import { productManager } from "../dao/mongoDAO/ProductManager.js";

class ProductService {
    constructor() {
        this.productManager = productManager
    }

    async findAll(opts) {
        return await productManager.findAll(opts);
    }

    async findById(id) {
        return await productManager.findById(id);
    }

    async createOne(product) {
        return await productManager.createOne(product)
    }

    async updateOne(id, product) {
        return await productManager.updateOne(id, product);
    }

    async deleteOne(id) {
        return await productManager.deleteOne(id);
    }
    
}

export const productService = new ProductService();