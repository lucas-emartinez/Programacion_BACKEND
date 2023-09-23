import express from "express";
import path from "path";
import { __dirname } from "./utils.js";


import productsRoute from './routes/productsRoute.js'
import cartsRoute from './routes/cartsRoute.js'

// Instanciacion de Express
const app = express();

// Definicion de puerto
const PORT = 8000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "../public")));

// Endpoints
app.use('/api/products', productsRoute)
app.use('/api/carts', cartsRoute)

app.listen(8000, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

