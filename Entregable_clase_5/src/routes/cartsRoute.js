const { Router } = require('express');

const router = Router();

const carritoController = require('../controllers/carritosController')

router.route("/carts/:cid")
    .get(carritoController.getProductsCarritoById)
    .delete(carritoController.deleteCarrito)
    
router.post("/carts", carritoController.addCarrito)
router.post("/carts/:cid/products/:pid", carritoController.addProductToCarrito)
    

module.exports = router;