const path = require("path");

// Manager requerido
const CarritoManager = require("../impl/CarritoManager");
// Instanciacion de Manager
const carritoManager = new CarritoManager(path.resolve(__dirname, "../db/carritos.json"));

const addCarrito = async (req, res) => {

    const result = await carritoManager.addCarrito();

    if (result === "Carrito añadido correctamente") {
        res.status(201).json({ message: result });
    } else {
        res.status(400).json({ error: result });
    }
};

const addProductToCarrito = async (req, res) => {
    const { cid, pid } = req.params;

    if (!cid || !pid) {
        res.status(400).json({error: 'Debe ingresar un id'});
    }

    const result = await carritoManager.addProductToCarrito(cid, pid);

    if (result === "Producto añadido correctamente al carrito") {
        res.status(201).json({ message: result });
    } else {
        res.status(400).json({ error: result });
    }
};



const getProductsCarritoById = async (req, res) => {

    const { cid } = req.params;

    const products = await carritoManager.getProductsByCarritoId(cid);

    if (products) {
        res.status(200).json({products});
    } else {
        res.status(400).json({ error: 'Error al obtener los productos del carrito' });
    }
};


const deleteCarrito = async (req, res) => {
    const { cid } = req.params;

    if (!cid) {
        res.status(400).json({error: 'Debe ingresar un id'});
    }

    const result = await carritoManager.deleteCarrito(cid);

    if (result) {
        res.status(200).json({ result });
    } else {
        res.status(400).json({ error: result });
    } 
}; 


module.exports = { addCarrito, addProductToCarrito, getProductsCarritoById, deleteCarrito };