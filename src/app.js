import express from "express";
import session from "express-session";
import config from "./config/env.js";
import Websocket from "./config/socket.js";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import handlebars from "express-handlebars"

import cors from "cors"
import { __dirname } from "./utils.js";
import passport from "passport";
import "./passport.js"
import database from "./db/config.js"


// Rutas
import userRouter  from './routes/users.routes.js'
import viewsRouter from './routes/views.routes.js'
import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import sessionsRouter from './routes/sessions.routes.js'
import { corsOptions } from "./config/cors.js";



// Inicializacion de Express
const app = express();


// Definicion de puerto
const PORT = config.PORT


// Conexion a la base de datos
database.getInstance();

// Inicializacion de motor de plantillas
app.engine("handlebars", handlebars.engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));

// Vistas
app.set("views", __dirname + "/views");

// Indicamos el motor de plantillas a utilizar
app.set("view engine", "handlebars");

// Middlewares

// NO ES NECESARIO COOKIEPARSER AL UTILIZAR EXPRESS-SESSION. ESTE YA LO INCLUYE
app.use(cors(corsOptions))
app.use(cookieParser()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(session(
    {
        secret: "SESSION_SECRET_KEY",
        cookie: {
            maxAge: 60 * 60 * 1000 // 1 hora
        },
        store: new MongoStore(
            {
                mongoUrl: config.mongoDB.url,
            }
        ),
    }
));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Endpoints
app.use('/', viewsRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/users', userRouter) 
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

// Servidor 
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Websocket
export const socketServer = Websocket(httpServer);
