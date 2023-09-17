const fs = require('fs');


class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct(product) {
        
        try {
            if (!product.title) return 'El producto debe tener un título';
            if (!product.description) return 'El producto debe tener una descripción';
            if (!product.price) return 'El producto debe tener un precio';
            if (!product.thumbnails) return 'El producto debe tener un thumbnail';
            if (!product.stock) return 'El producto debe tener un stock';
            if (!product.category) return 'El producto debe tener una categoria';
            if (!product.code) return 'El producto debe tener un código';
            if (product.stock < 0) return 'El stock no puede ser negativo';
            if (product.price < 0) return 'El precio no puede ser negativo';
            
            const products = await this.getProducts();
                
            const productCodeExist = products && products.find(p => p.code == product.code);
           
            if (productCodeExist) return 'El Producto que intenta añadir tiene un código que ya existe';

            const id = products.length ? products[products.length - 1].id + 1 : 1;
            product.id = id;

            await fs.promises.writeFile(this.path, JSON.stringify([...products, product]));

            return 'Producto añadido correctamente';
            
        } catch(error) {
            return `Error al añadir el producto: ${error}`;
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts();
            const product = products.find(p => p.id == id);
            
            return product || 'Not found'
        } catch (error) {
            return `Error al obtener el producto: ${error}`;
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
            
            if (!existingProduct) return 'El producto que intenta actualizar no existe';
            
            if (product.title) existingProduct.title = product.title
            if (product.description) existingProduct.description = product.description;
            if (product.price) existingProduct.price = product.price;
            if (product.thumbnails) existingProduct.thumbnails = product.thumbnails;
            if (product.stock && product.stock >= 0) existingProduct.stock = product.stock;
            if (product.category) existingProduct.category = product.category;
            if (existingProduct.code != product.code) {
                product.code = existingProduct.code;
            } else {
                return 'No se puede modificar el código del producto';
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
            if (!products) return 'No hay productos cargados';

            products = products.filter(p => p.id != id);

            await fs.promises.writeFile(this.path, JSON.stringify(products));

            return 'Producto eliminado correctamente';
        } catch (error) {
            return `Error al eliminar el producto: ${error}`;
        }
    }

}

module.exports = ProductManager;
