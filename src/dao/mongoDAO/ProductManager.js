import { productsModel } from '../models/products.model.js';
import BaseManager from './baseManager.js';

class ProductManager extends BaseManager{
    constructor() {
        super(productsModel);
    }

    // Implementacion de metodo abstracto
    async findAll(options) {
        const {
            limit,
            page,
            sort,
            upperPrice,
            lowerPrice,
            category,
            inStock
        } = options;

        // Opciones a pasarle al paginate
        const opts = {
            limit: limit ? limit : 10,
            page: page ? page : 1,
            sort: (sort === 'asc' || sort === 'desc') ? {price: sort == 'asc' ? 1 : -1 }: null,
            lean: true
        }
        
        // Filtro a pasarle al paginate
        const query = {
                category: category ? { $eq: category } : {$exists: true},
                price: {
                    $gte: lowerPrice || 0, 
                    $lte: upperPrice || Infinity 
                  },
                stock: (inStock==='true') ? { $gt: 0 } : {$exists: true},
        }
        
        try {            
            // Verificamos si existe query y options, en caso contrario buscamos todos los productos
            const result = await this.model.paginate(query ? query : {}, opts ? opts : {});
            
            const info = {
                status: 'success',
                payload: result.docs, // Ya que mongoose-paginate-v2 no admite LEAN().
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.prevPage ? 
                `http://localhost:8080/api/products?page=${result.prevPage}&limit=${opts.limit}` : null,
                nextLink: result.nextPage ? 
                `http://localhost:8080/api/products?page=${result.nextPage}&limit=${opts.limit}` : null,
            }
            
            
            return info;

        } catch (error) {
            throw new Error({
                status: 'error',
                error: 'Error al obtener los productos'
            });
        }
    }
}

export const productManager = new ProductManager();

