const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct(product) {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            const productCodeExist = products.find(p => p.code === product.getCode());
            
            if (productCodeExist) return 'El Producto que intenta añadir tiene un código que ya existe';

            const id = products.length ? products[products.length - 1].id + 1 : 1;
            product.setId(id);
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            
            return product;
        } catch (error) {
            console.log(`Error al leer o escribir el archivo: ${error}`);
        }
    }

    async getProductById(id) {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            const product = products.find(product => product.id === id);
            return product;
        } catch (error) {
            console.log(`Error al leer el archivo: ${error}`);
        }
    }

    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.log(`Error al leer el archivo: ${error}`);
        }
    }

    async updateProduct(id, product) {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            const oldProduct = products.find(p => p.id === id);
            
            if (!oldProduct) return 'No existe el producto';

            oldProduct.title = product.getTitle();
            oldProduct.stock = product.getStock();
            oldProduct.price = product.getPrice();
            oldProduct.code = product.getCode();
            oldProduct.thumbnail = product.getThumbnail();
            oldProduct.description = product.getDescription();

            await fs.promises.writeFile(this.path, JSON.stringify(products));

            return oldProduct;
        } catch (error) {
            console.log(`Error al actualizar el producto: ${error}`);
        }
    }
}

module.exports = ProductManager;
