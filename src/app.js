import express from "express";
import session from "express-session";
import Websocket from "./config/socket.js";
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars"
import __dirname from "./utils.js";
import "./db/config.js"

// Rutas
import loginRouter from './routes/login.routes.js'
import viewsRouter from './routes/views.routes.js'
import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'

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
const secret = "123456" // Solo para TESTING. Luego pasaremos esto a una variable de entorno ,env
app.use(cookieParser(secret));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));


// Endpoints
app.use('/', viewsRouter)
app.use('/login', loginRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

// Servidor 
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Websocket
export const socketServer = Websocket(httpServer);
