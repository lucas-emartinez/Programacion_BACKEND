const ProductManager = require('./ProductManager');

// Se creará una instancia de la clase “ProductManager”
const productManager = new ProductManager();

const product = {
    title: 'Producto 1',
    description: 'Descripción del producto',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25
};

// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log(productManager.getProducts());

// Se llamará al método “addProduct” con los campos
// El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
console.log(productManager.addProduct(product))

// Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.log(productManager.getProducts())

// Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
console.log(productManager.addProduct(product))

// Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
console.log(productManager.getProductById(1))

// devolvera not Found ya que no existe
console.log(productManager.getProductById(2));

