import { Router } from 'express';
import { viewController } from '../controllers/views.controller.js';
import { authMiddleware } from '../middlewares/verifiers.js';
import passport from 'passport';
import { mongoIdRegex } from '../utils.js';

const router = Router();

router.get("/login", viewController.login)
router.get("/signup", viewController.signup)

router.get("/carts/:cid", 
    passport.authenticate('jwt', 
    { 
        session: false,
        failureRedirect: "/login",
    }),
    authMiddleware(['user', 'admin']),
    viewController.carts
);

router.get("/products", 
    passport.authenticate('jwt', { 
        session: false,
        failureRedirect: "/login"
    }),
    authMiddleware(['user', 'admin']),
    viewController.products
);

router.get("/chat",
    passport.authenticate('jwt', { 
        session: false,
        failureRedirect: "/login",
    }),
    authMiddleware(['user', 'admin']),
    viewController.realTimeChat
);

router.get("/realtimeproducts", 
    passport.authenticate('jwt', { 
        session: false,
        failureRedirect: "/login",
    }),
    authMiddleware(['admin']),
    viewController.realTimeProducts
);

router.param('cid', (req, res, next, cid) => {
    if (!mongoIdRegex.test(cid)) {
        return res.status(400).send({ error: 'Invalid id' });
    }
    next();
});

export default router;