import fs from 'fs';
import path from 'path';
import { __dirname } from '../utils.js';


// Manager requerido 
import { productManager } from "../impl/ProductManager.js";



class CarritoManager {
    constructor(path) {
        this.path = path;
    }

    async addCarrito() {
        try {
            
            const carritos = await this.getCarritos();
            
            const id = carritos.length ? carritos[carritos.length - 1].id + 1 : 1;

            const carrito = {
                id: id,
                products: []
            }
            
            await fs.promises.writeFile(this.path, JSON.stringify([...carritos, carrito]));

            return 'Carrito añadido correctamente';
            
        } catch(error) {
            return `Error al añadir el carrito: ${error}`;
        }
    }

    async addProductToCarrito(carritoId, productId) {

        try {

            const carritos = await this.getCarritos();

            const carrito = carritos.find(c => c.id == carritoId);

            if(!carrito) return 'El carrito al que intenta añadir el producto no existe';

            const product = await productManager.getProductById(productId);
        

            if(product == 'Not found') return 'El producto que intenta añadir no existe';

            const productExist = carrito.products && carrito.products.find(p => p.id == productId);

            if (productExist) {
                productExist.quantity += 1;
            } else {
                const product = {
                    id: productId,
                    quantity: 1
                }
                carrito.products.push(product);
            }

            await fs.promises.writeFile(this.path, JSON.stringify(carritos));

            return 'Producto añadido correctamente al carrito';

        } catch (error) {
            return `Error al añadir el producto al carrito: ${error}`;
        }
        

    }

    async getProductsByCarritoId(id) {
        try {
            const carritos = await this.getCarritos();
            const carrito = carritos.find(p => p.id == id);
            
            const products = carrito.products;

            return products || 'Not found'
        } catch (error) {
            return `Error al obtener el carrito: ${error}`;
        }

    }

    async getCarritos () {
        try {
            if(fs.existsSync(this.path)){
                const carritos = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(carritos);
            } else {
                return [];
            }
        } catch (error) {
           return `Error al leer el archivo: ${error}"`;
        }
    }

    async deleteCarrito(id) {
        try {
            let carritos = await this.getCarritos();
            if (!carritos) return 'No hay carritos cargados';

            carritos = carritos.filter(p => p.id != id);

            await fs.promises.writeFile(this.path, JSON.stringify(carritos));

            return 'Carrito eliminado correctamente';
        } catch (error) {
            return `Error al eliminar el carrito: ${error}`;
        }
    }

}

export const carritoManager = new CarritoManager(path.resolve(__dirname, "db/carritos.json"));
