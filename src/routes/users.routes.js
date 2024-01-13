import { userController } from '../controllers/users.controller.js'
import { authMiddleware } from '../middlewares/verifiers.js';
import { Router } from 'express';


const router = Router();


router.get('/:userId', authMiddleware(['user', 'admin']), userController.findUserById);
router.post('/signup', userController.signup);


export default router;