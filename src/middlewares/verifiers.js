
import jwt from 'jsonwebtoken';
import config from '../config/env.js';


// Se reemplaza por el middleware de passport
export const jwtValidation = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: error });
    }
}

export const authMiddleware = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user?.role)) return res.status(403).json({ error: "No tiene permisos para realizar esta accion" });
        res.locals.user = req.user.email;
        res.locals.role = req.user.role;
        res.locals.cart = req.user.cart;
        next();
    }
}


