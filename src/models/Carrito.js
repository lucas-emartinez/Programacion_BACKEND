class Carrito{

    #id;
    #products;

    constructor(){
        this.products = [];
    }

    getId(){
        return this.#id;
    }

    getProducts(){
        return this.#products;
    }

    setProducts(products){
        this.#products = products;
    }

}

moduel.exports = Carrito;