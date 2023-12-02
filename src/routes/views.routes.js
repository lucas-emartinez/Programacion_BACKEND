import { Router } from 'express';
import viewsController from '../controllers/views.controller.js';
import { authMiddleware } from '../middlewares/verifiers.js';
import passport from 'passport';
import { mongoIdRegex } from '../utils.js';

const router = Router();

router.get(
    "/",
    passport.authenticate('jwt', { 
        session: false, 
        failureRedirect: "/login",
        successRedirect: "/products"
     })
)
router.get("/login", viewsController.login)

router.get("/signup", viewsController.signup)

router.get(
    "/carts/:cid", 
    passport.authenticate('jwt', 
    { 
        session: false,
        failureRedirect: "/login",
    }),
    authMiddleware(['user', 'admin']),
    viewsController.carts
);

router.get(
    "/products", 
    passport.authenticate('jwt', { 
        session: false,
        failureRedirect: "/login"
    }),
    authMiddleware(['user', 'admin']),
    viewsController.products
);

router.get(
    "/chat",
    passport.authenticate('jwt', { 
        session: false,
        failureRedirect: "/login",
    }),
    authMiddleware(['user', 'admin']),
    viewsController.realTimeChat);

router.get(
    "/realtimeproducts", 
    passport.authenticate('jwt', { 
        session: false,
        failureRedirect: "/login",
    }),
    authMiddleware(['admin']),
    viewsController.realTimeProducts);

router.param('cid', (req, res, next, cid) => {
    if (!mongoIdRegex.test(cid)) {
        return res.status(400).send({ error: 'Invalid id' });
    }
    next();
});

export default router;