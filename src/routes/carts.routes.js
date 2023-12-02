import { Router } from 'express';

import cartsController from '../controllers/carts.controller.js';
import { mongoIdRegex } from '../utils.js';
import passport from 'passport';
import { authMiddleware } from '../middlewares/verifiers.js';

const router = Router();

router.route("/")
    .get(
        passport.authenticate('jwt', { 
            session: false,
            failureRedirect: "/login"
        }),
        authMiddleware(['user', 'admin']),  
        cartsController.getCarts
    )
    .post(
        passport.authenticate('jwt', { 
            session: false,
            failureRedirect: "/login"
        }),
        authMiddleware(['user', 'admin']),  
        cartsController.addCarrito
    )

router.route("/:cid")
    .get(
        passport.authenticate('jwt', { 
            session: false,
            failureRedirect: "/login"
        }),
        authMiddleware(['user', 'admin']),  
        cartsController.getProductsFromCart
    )
    .delete(
        passport.authenticate('jwt', { 
            session: false,
            failureRedirect: "/login"
        }),
        authMiddleware(['admin']),  
        cartsController.deleteAllProductsFromCart
    )

router.route("/:cid/products/:pid")
    .put(
        passport.authenticate('jwt', { 
            session: false,
            failureRedirect: "/login"
        }),
        authMiddleware(['user', 'admin']),  
        cartsController.updateProductQuantity
    )
    .post(
        passport.authenticate('jwt', {
            session: false,
            failureRedirect: "/login"
        }),
        authMiddleware(['user', 'admin']),  
        cartsController.addProductToCart
    )
    .delete(
        passport.authenticate('jwt', { 
            session: false,
            failureRedirect: "/login"
        }),
        authMiddleware(['user', 'admin']),  
        cartsController.deleteProductFromCart
    )
    
// route middleware
router.param('cid', (req, res, next, cid) => {
    if (!mongoIdRegex.test(cid)) {
        return res.status(400).send({ error: 'Invalid id' });
    }
    next();
});

router.param('pid', (req, res, next, pid) => {
    if (!mongoIdRegex.test(pid)) {
        return res.status(400).send({ error: 'Invalid id' });
    }
    next();
});

export default router;