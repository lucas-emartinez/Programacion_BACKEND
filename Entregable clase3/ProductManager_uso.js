const ProductManager = require('./ProductManager');
const Product = require('./Product');

const productManager = new ProductManager("./productos.json");

const product1 = new Product(
    title = "producto prueba 1",
    description = 'Este es un producto prueba 1',
    price = 200,
    thumbnail = 'Sin imagen',
    code = 'abc121',
    stock = 25
);

const product2 = new Product(
    title = "producto prueba 2",
    description = 'Este es un producto prueba 2',
    price = 164,
    thumbnail = 'Sin imagen',
    code = 'abc122',
    stock = 543
);

 // Obviamente si queremos actualizar, no deberiamos modificar el codigo del producto, ya que antes habiamos verificado que no deberian existir dos productos con el mismo codigo,
 // por lo tanto, si cambiamos el codigo, el producto no se va a poder actualizar. Si esto pasará, estariamos rompiendo la integridad de los datos ya que el codigo es unico.
const productUpdated = new Product(
    title = "producto prueba ACTUALIZADO",
    description = 'Este es un producto prueba 3',
    price = 240,
    thumbnail = 'Sin imagen',
    code = 'abc121',
    stock = 120
);

const test = async () => {

    // Obtiene un arreglo vacio si no hay productos
    console.log(await productManager.getProducts());

    // Agregamos productos
    console.log(await productManager.addProduct(product1));
    console.log(await productManager.addProduct(product2));
 
    // Obtenemos los productos agregados
    console.log(await productManager.getProducts());

    // Obtenemos un producto por ID (ID 100 suponemos que no existe y deberia devolver un error)
    console.log(await productManager.getProductById(100));

    // Actualizamos un producto
    console.log(await productManager.updateProduct(1, productUpdated));

    // Obtenemos los productos actualizados
    console.log(await productManager.getProducts());

    // Eliminamos un producto con ID 2
    console.log(await productManager.deleteProduct(1));

    // Verificamos la eliminacion
    console.log(await productManager.getProducts());
};

// Ejecución del test
test()