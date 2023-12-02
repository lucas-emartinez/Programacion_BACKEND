import { JWT_SECRET } from "../utils.js";
import jwt from 'jsonwebtoken';

export const verifySession = (req, res, next) => {
    if (req.session) {
        // session valida
        console.log(req.session)
        res.locals.user = req.session.passport?.user.first_name;
        res.locals.admin = req.session.passport?.user.role;
        res.locals.cart = req.session.passport?.user.cart;
        next();
    } else {
        // session invalida, rediccion a pagina de login
        res.redirect('/login');
    }
}

// Se reemplaza por el middleware de passport
export const jwtValidation = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: error });
    }
}

export const authMiddleware = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) return res.status(403).json({ error: "No tiene permisos para realizar esta accion" });
        next();
    }
}


