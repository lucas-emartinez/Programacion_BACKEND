import { Router } from 'express';

import cartsController from '../controllers/cartsController.js';

const router = Router();

router.route("/")
    .get(cartsController.getCarts)
    .post(cartsController.addCarrito)
router.route("/:cid")
    .get(cartsController.getProductsFromCart)
    .delete(cartsController.deleteAllProductsFromCart)
router.route("/:cid/products/:pid")
    .put(cartsController.updateProductQuantity)
    .post(cartsController.addProductToCart)
    .delete(cartsController.deleteProductFromCart)
    

export default router;