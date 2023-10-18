import { productsModel } from '../models/products.model.js';
import BaseManager from './BaseManager.js';
import errors from '../../config/errors.js';

const {
    GET_PRODUCTS_ERROR
} = errors;

class ProductManager extends BaseManager{
    constructor() {
        super(productsModel);
    }

    async findAll(query, opts) {
        try {
            
            const result = await this.model.paginate(query, opts);
            
            const info = {
                count: result.totalDocs,
                pages: result.totalPages,
                prev: result.prevPage 
                    ? `http://localhost:8080/api/products?page=${result.prevPage}` 
                    : null,
                next: result.nextPage 
                    ? `http://localhost:8080/api/products?page=${result.nextPage}` 
                    : null,
            }
                    
            return {result, info};

        } catch (error) {
            return error;
        }
    }
}

export const productManager = new ProductManager();

