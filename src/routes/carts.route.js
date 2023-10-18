import { Router } from 'express';

import cartsController from '../controllers/cartsController.js';

const router = Router();

router.route("/")
    .get(cartsController.getCarts)
    .post(cartsController.addCarrito)
router.route("/:cid")
    .get(cartsController.getProductsFromCart)
    .delete(cartsController.deleteCarrito)
router.post("/:cid/products/:pid", cartsController.addProductToCart)
    

export default router;