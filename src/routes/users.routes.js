import { Router } from 'express';
import usersController from '../controllers/users.controller.js'
import passport from 'passport';
import { authMiddleware } from '../middlewares/verifiers.js';

const router = Router();


router.get(
    '/:userId', 
    passport.authenticate('jwt', { 
        session: false,
        failureRedirect: "/login"
    }),
    authMiddleware(['user', 'admin']), 
    usersController.findUserById
);


router.post('/logout', usersController.destroySession);

router.post(
    '/login', 
    passport.authenticate(
        'login', 
        {
            successRedirect: '/products',
            failureRedirect: '/login'
        })
);

router.post(
    '/signup', 
    passport.authenticate(
      'signup', 
      {
        successRedirect: '/login',
        failureRedirect: '/signup'
      })
);



export default router;