const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct(product) {
        try {
            if (!product.getTitle()) return 'El producto debe tener un título';
            if (!product.getDescription()) return 'El producto debe tener una descripción';
            if (!product.getPrice()) return 'El producto debe tener un precio';
            if (!product.getThumbnail()) return 'El producto debe tener un thumbnail';
            if (!product.getStock()) return 'El producto debe tener un stock';
            if (product.getStock() < 0) return 'El stock no puede ser negativo';
            if (product.getPrice() < 0) return 'El precio no puede ser negativo';
            if (!product.getCode()) return 'El producto debe tener un código';

            const products = await this.getProducts();

            const productCodeExist = products && products.find(p => p.code === product.getCode());
           
            if (productCodeExist) return 'El Producto que intenta añadir tiene un código que ya existe';

            const id = products.length ? products[products.length - 1].id + 1 : 1;
            product.setId(id);

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

    async updateProduct(id, updatedProduct) {
        try {
            const products = await this.getProducts();

            const product = products.find(p => p.id === id);
            if (!product) return 'El producto que intenta actualizar no existe';

            if (product.code !== updatedProduct.getCode()) return 'No se puede modificar el código del producto';

            // Setters de la clase Product. El ID NO SE MODIFICA, El Code lo omitimos ya que TAMPOCO, ademas, lo estamos verificando arriba.
            if (updatedProduct.getTitle()) {
                product.title = updatedProduct.getTitle();
            }
            if (updatedProduct.getDescription()) {
                product.description = updatedProduct.getDescription();
            }
            if (updatedProduct.getPrice()) {
                product.price = updatedProduct.getPrice();
            }
            if (updatedProduct.getThumbnail()) {
                product.thumbnail = updatedProduct.getThumbnail();
            }
            if (updatedProduct.getStock()) {
                product.stock = updatedProduct.getStock();
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
            if (!products) return 'No Hay productos cargados';

            products = products.filter(p => p.id !== id);

            await fs.promises.writeFile(this.path, JSON.stringify(products));

            return 'Producto eliminado correctamente';
        } catch (error) {
            return `Error al eliminar el producto: ${error}`;
        }
    }

}

module.exports = ProductManager;
