const express = require("express");
const path = require("path");

// Manager requerido
const ProductManager = require("./impl/ProductManager");

// Instanciacion de Express
const app = express();

// Instanciacion de Manager
const productManager = new ProductManager(path.resolve(__dirname, "products.json"));

// Definicion de puerto
const PORT = 8000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Endpoints
app.get("/", (req, res) => {
    res.send(
    `
    <h1>Bienvenido al servidor.<h1>\n
    <h2>Endpoints disponibles:</h2>\n
    <h3>GET /products</h3>\n
    <h3>GET /products/:pid</h3>\n

    `);
});

app.get("/products", async (req, res) => {
    let products = await productManager.getProducts();
        
    const { limit } = req.query;

    if (limit) {
        products = products.slice(0, limit);
        res.status(200).json({products});
    } else {
        res.status(200).json({products});
    }
});

app.get("/products/:pid", async (req, res) => {

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

});


app.listen(8000, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

