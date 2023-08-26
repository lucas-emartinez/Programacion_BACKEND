class ProductManager {
    constructor(){
        this.products = [];
    }

    addProduct(product){

        // Tambien puedo poner if(!product.title || !product.stock || !product.price || !product.code || !product.thumbnail || !product.description)
        if (!product.title) return 'El título es obligatorio';
        if (!product.stock) return 'El stock es obligatorio';
        if (!product.price) return 'El precio es obligatorio';
        if (!product.code) return 'El código es obligatorio';
        if (!product.thumbnail) return 'El thumbnail es obligatorio';
        if (!product.description) return 'La descripción es obligatoria';

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
        if (!product) return 'Not Found'
        
        return product;
    }

    getProducts(){
        return this.products;
    }
}

module.exports = ProductManager;