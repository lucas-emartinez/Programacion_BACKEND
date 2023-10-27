import { Router } from 'express';
import usersController from '../controllers/users.controller.js';
import verifySession from '../middlewares/verifySession.js';

const router = Router();

router.post('/login', usersController.createSession);
router.post('/signup', usersController.createUser);
router.post('/logout', verifySession, usersController.destroySession); // Debe existir una session para destruirla

export default router;