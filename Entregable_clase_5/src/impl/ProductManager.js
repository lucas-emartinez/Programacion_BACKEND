import fs from 'fs';
import path from 'path';
import __dirname from '../utils.js';
import errors from '../config/errors.js';
import Product from '../models/Product.js';

const {
    PRODUCT_CODE_EXIST,
    PRODUCT_NOT_EXIST,
    PRODUCT_MUST_HAVE_CATEGORY,
    PRODUCT_MUST_HAVE_CODE,
    PRODUCT_MUST_HAVE_DESCRIPTION,
    PRODUCT_MUST_HAVE_PRICE,
    PRODUCT_MUST_HAVE_STOCK,
    PRODUCT_MUST_HAVE_TITLE,
    PRODUCT_MUST_HAVE_POSITIVE_PRICE,
    PRODUCT_MUST_HAVE_POSITIVE_STOCK
} = errors;


class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct(product) {
        
        try {
            if (!product.title) return PRODUCT_MUST_HAVE_TITLE;
            if (!product.description) return PRODUCT_MUST_HAVE_DESCRIPTION;
            if (!product.price) return PRODUCT_MUST_HAVE_PRICE;
            if (!product.stock) return PRODUCT_MUST_HAVE_STOCK;
            if (!product.category) return PRODUCT_MUST_HAVE_CATEGORY;
            if (!product.code) return PRODUCT_MUST_HAVE_CODE;
            if (product.stock < 0) return PRODUCT_MUST_HAVE_POSITIVE_STOCK;
            if (product.price < 0) return PRODUCT_MUST_HAVE_POSITIVE_PRICE;
            
            const products = await this.getProducts();
                
            const productCodeExist = products && products.find(p => p.code == product.code);
           
            if (productCodeExist) return PRODUCT_CODE_EXIST;

            const id = products.length ? products[products.length - 1].id + 1 : 1;


            const newProduct = new Product(
                product.title, 
                product.description, 
                product.price, 
                product.thumbnails, 
                product.stock, 
                product.category, 
                product.code
            );

            newProduct.setId(id);

            await fs.promises.writeFile(this.path, JSON.stringify([...products, newProduct]));

            return 'Producto añadido correctamente';
            
        } catch(error) {
            return `Error al añadir el producto: ${error}`;
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts();
            const product = products.find(p => p.id == id);
            
            
            return product || PRODUCT_NOT_EXIST
        } catch (error) {
            return GET_PRODUCTS_ERROR;
        }

    }

    async getProducts() {
        try {
            if(fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(products);
            } else {
                return [];
            }
        } catch (error) {
           return `Error al leer el archivo: ${error}"`;
        }
    }

    async updateProduct(id, product) {
        try {
            const products = await this.getProducts();

            const existingProduct = products.find(p => p.id == id);
            
            if (!existingProduct) return PRODUCT_NOT_EXIST;
            
            if (product.title) existingProduct.title = product.title
            if (product.description) existingProduct.description = product.description;
            if (product.price) existingProduct.price = product.price;
            if (product.thumbnails) existingProduct.thumbnails = product.thumbnails;
            if (product.stock && product.stock >= 0) existingProduct.stock = product.stock;
            if (product.category) existingProduct.category = product.category;
            if (existingProduct.code != product.code) {
                product.code = existingProduct.code;
            } else {
                return PRODUCT_CODE_EXIST;
            }

            await fs.promises.writeFile(this.path, JSON.stringify(products));

            return 'Producto actualizado correctamente'	;
        } catch (error) {
            return `Error al actualizar el producto: ${error}`;
        }
    }

    async deleteProduct(id) {
        try {

            let products = await this.getProducts();

            products = products.filter(p => p.id != id);

            await fs.promises.writeFile(this.path, JSON.stringify(products));

            return 'Producto eliminado correctamente';
        } catch (error) {
            return `Error al eliminar el producto: ${error}`;
        }
    }

}

export const productManager = new ProductManager(path.resolve(__dirname,  "db/products.json"));
