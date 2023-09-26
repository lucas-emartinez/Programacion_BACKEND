import { Router } from 'express';
import viewsController from '../controllers/viewsController.js';

const router = Router();

router.get("/", viewsController.home);

export default router;