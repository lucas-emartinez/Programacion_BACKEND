import { Router } from 'express';

import cartsController from '../controllers/carts.controller.js';

const router = Router();

router.route("/")
    .get(cartsController.getCarts)
    .post(cartsController.addCarrito)
router.route("/:cid")
    //.put(cartsController.updateCart)
    .get(cartsController.getProductsFromCart)
    .delete(cartsController.deleteAllProductsFromCart)
router.route("/:cid/products/:pid")
    .put(cartsController.updateProductQuantity)
    .post(cartsController.addProductToCart)
    .delete(cartsController.deleteProductFromCart)
    

export default router;