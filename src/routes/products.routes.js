import uploader from '../multer.js';
import { Router } from 'express';
import { productController } from '../controllers/products.controller.js';
import passport from 'passport';
import { authMiddleware } from '../middlewares/verifiers.js';

const router = Router();

router.get(
    "/",
    passport.authenticate('jwt', { 
        session: false,
    }),
    authMiddleware(['user', 'admin']),  
    productController.getProducts
);
router.get(
    "/:pid", 
    passport.authenticate('jwt', { 
        session: false,
        failureRedirect: "/login"
    }),
    authMiddleware(['user', 'admin']),  
    productController.getProductById
);
router.post(
    "/", 
    passport.authenticate('jwt', { 
        session: false,
        failureRedirect: "/login"
    }),
    authMiddleware([ 'admin']),  
    uploader.single('file'), 
    productController.addProduct
    );

router.put(
    '/:pid', 
    passport.authenticate('jwt', { 
        session: false,
        failureRedirect: "/login"
    }),
    authMiddleware(['admin']),  
    productController.updateProduct
)

router.delete(
    '/:pid', 
    passport.authenticate('jwt', { 
        session: false,
        failureRedirect: "/login"
    }),
    authMiddleware(['admin']),  
    productController.deleteProduct
)

router.param(
    'pid', (req, res, next, pid) => {
    if (!mongoIdRegex.test(pid)) {
        return res.status(400).send({ error: 'Invalid id' });
    }
    next();
});

export default router;