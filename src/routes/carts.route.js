import { Router } from 'express';

import cartsController from '../controllers/cartsController.js';

const router = Router();

router.route("/:cid")
    .get(cartsController.getProductsFromCart)
    .delete(cartsController.deleteCarrito)
    
router.post("/", cartsController.addCarrito)
router.post("/:cid/products/:pid", cartsController.addProductToCart)
    

export default router;