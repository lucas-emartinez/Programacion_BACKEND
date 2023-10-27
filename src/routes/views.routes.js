import { Router } from 'express';
import viewsController from '../controllers/views.controller.js';
import verifySession from '../middlewares/verifySession.js';

const router = Router();

router.get("/", viewsController.redirection)
router.get("/login", viewsController.login)
router.get("/signup", viewsController.signup)
router.get("/carts/:cid", verifySession, viewsController.carts);
router.get("/products", verifySession, viewsController.products);
router.get("/chat", verifySession, viewsController.realTimeChat);
router.get("/realtimeproducts", verifySession, viewsController.realTimeProducts);

export default router;