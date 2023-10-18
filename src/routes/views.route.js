import { Router } from 'express';
import viewsController from '../controllers/viewsController.js';

const router = Router();

router.get("/", viewsController.home);
router.get("/chat", viewsController.realTimeChat);
router.get("/realtimeproducts", viewsController.realTimeProducts);

export default router;