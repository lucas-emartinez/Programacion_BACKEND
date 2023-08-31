const ProductManager = require('./ProductManager');
const ProductEntity = require('./ProductEntity');

const productManager = new ProductManager("./productos.json");

const product = new ProductEntity(
    title = 'Producto 1',
    description = 'Descripción del producto',
    price = 200,
    thumbnail = 'Sin imagen',
    code = 'abc123',
    stock = 25
);

(async () => {
    // Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
    console.log(await productManager.getProducts());

    // Se llamará al método “addProduct” con los campos
    console.log(await productManager.addProduct(product));

    // Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
    console.log(await productManager.getProducts());

    // Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
    console.log(await productManager.getProductById(1));

})();