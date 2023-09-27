import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars"
import __dirname from "./utils.js";

// Rutas
import viewsRouter from './routes/views.route.js'
import productsRouter from './routes/products.route.js'
import cartsRouter from './routes/carts.route.js'
import WebSocketServer from "./config/socket.js";


// Inicializacion de Express
const app = express();

// Definicion de puerto
const PORT = process.env.PORT || 8080;

// Inicializacion de motor de plantillas
app.engine("handlebars", handlebars.engine());

// Vistas
app.set("views", __dirname + "/views");

// Indicamos el motor de plantillas a utilizar
app.set("view engine", "handlebars");

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// Endpoints
app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

// Servidor 
const httpServer = app.listen(8000, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Websocket
export const socketServer = WebSocketServer(httpServer);
