class ProductManager {
    constructor(){
        this.products = [];
    }

    addProduct(title, stock, price, code, thumbnail, description){

        // Tambien puedo poner if(!product.title || !product.stock || !product.price || !product.code || !product.thumbnail || !product.description)
        if (!title) return 'El título es obligatorio';
        if (!stock) return 'El stock es obligatorio';
        if (!price) return 'El precio es obligatorio';
        if (!code) return 'El código es obligatorio';
        if (!thumbnail) return 'El thumbnail es obligatorio';
        if (!description) return 'La descripción es obligatoria';

        const product = {
            title,
            stock,
            price,
            code,
            thumbnail,
            description
        };

        // Verifico el código
        const codeExist = this.products.find(p => p.code === product.code);
        if (codeExist){
            return 'El código ya existe';
        } ;

        // Agrego el ID dependiendo si hay o no otros productos
        const id = this.products.length ? this.products[this.products.length - 1].id + 1 : 1;
        product.id = id;

        this.products.push(product);
        return 'Producto agregado con éxito';
    }

    getProductById(id){
        const product = this.products.find(p => p.id === id);
        if (!product){
            return 'Not Found'
        } else{
            return product;
        }
    }

    getProducts(){
        return this.products;
    }
}

module.exports = ProductManager;