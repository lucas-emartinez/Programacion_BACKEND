import { Router } from 'express';

import carritoController from '../controllers/carritosController.js';

const router = Router();

router.route("/:cid")
    .get(carritoController.getProductsCarritoById)
    .delete(carritoController.deleteCarrito)
    
router.post("/", carritoController.addCarrito)
router.post("/:cid/products/:pid", carritoController.addProductToCarrito)
    

export default router;