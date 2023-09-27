import uploader from '../multer.js';
import { Router } from 'express';

import productsController from '../controllers/productsController.js';

const router = Router();

router.get("/", productsController.getProducts);
router.get("/:pid", productsController.getProductById);
router.post("/", uploader.array('files'), productsController.addProduct);
router.put('/:pid', productsController.updateProduct)
router.delete('/:pid', productsController.deleteProduct)

export default router;