import { productsModel } from '../models/products.model.js';
import BaseManager from './BaseManager.js';

class ProductManager extends BaseManager{
    constructor() {
        super(productsModel);
    }
}

export const productManager = new ProductManager();

