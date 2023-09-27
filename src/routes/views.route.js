import { Router } from 'express';
import viewsController from '../controllers/viewsController.js';

const router = Router();

router.get("/", viewsController.home);
router.get("/realtimeproducts", viewsController.realTimeProducts);

export default router;