const path = require("path");

// Manager requerido
const ProductManager = require("../impl/ProductManager");
// Instanciacion de Manager
const productManager = new ProductManager(path.resolve(__dirname, "../db/products.json"));

const addProduct = async (req, res) => {
    const product = req.body;
    const files = req.files;

    if (files) {
        const images = files.map((file) => {
            return file.path;
        });

        product.thumbnails = images;
    }

    const result = await productManager.addProduct(product);

    if (result === "Producto añadido correctamente") {
        res.status(201).json({ message: result });
    } else {
        res.status(400).json({ error: result });
    }
};

const getProducts = async (req, res) => {
    let products = await productManager.getProducts();

    const { limit } = req.query;

    if (limit) {
        products = products.slice(0, limit);
        res.status(200).json({ products });
    } else {
        res.status(200).json({ products });
    }
};

const getProductById = async (req, res) => {
    const { pid } = req.params;

    if (!pid) {
        res.status(400).json({error: 'Debe ingresar un id'});
    }

    // Ya se controla si existe o no el producto en el Manager
    const product = await productManager.getProductById(pid);

    if (product === "Not found"){
        res.status(404).json({error: "No encontramos el producto"})
    } else {
        res.status(200).json({product})
    }
};

const updateProduct = async (req, res) => {
    const { pid } = req.params;

    if (!pid) {
        res.status(400).json({error: 'Debe ingresar un id'});
    }

    const product = req.body;
   
    const result = await productManager.updateProduct(pid, product);

    if (result === "El producto que intenta actualizar no existe") {
        res.status(404).json({error: result})
    } else if (result === "No se puede modificar el código del producto") {
        res.status(400).json({error: result})
    } else {
        res.status(200).json({message: result})
    }
};


const deleteProduct = async (req, res) => {
    const { pid } = req.query;

    if (!pid) {
        res.status(400).json({error: 'Debe ingresar un id'});
    }

    const product = await productManager.deleteProduct(pid);

    if (product === "Not found"){
        res.status(404).json({error: "No encontramos el producto"})
    } else {
        res.json(204).json({message: "Producto eliminado"})
    }
};


module.exports = { getProducts, getProductById, addProduct, updateProduct, deleteProduct };