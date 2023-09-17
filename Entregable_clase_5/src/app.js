const express = require("express");
const path = require("path");


const productsRoute = require('./routes/productsRoute')
const cartsRoute = require('./routes/cartsRoute')

// Instanciacion de Express
const app = express();


// Definicion de puerto
const PORT = 8000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));


// Endpoints
app.use('/api', productsRoute)
app.use('/api', cartsRoute)



app.listen(8000, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

