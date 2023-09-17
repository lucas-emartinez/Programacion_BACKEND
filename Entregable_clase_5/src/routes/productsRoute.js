const uploader = require('../utils');
const { Router } = require('express');

const router = Router();

const productsController = require('../controllers/productsController')

router.get("/products", productsController.getProducts);
router.get("/products/:pid", productsController.getProductById);
router.post("/products", uploader.array('files'), productsController.addProduct);
router.put('/products/:pid', productsController.updateProduct)
router.delete('/products/:pid', productsController.deleteProduct)

module.exports = router;