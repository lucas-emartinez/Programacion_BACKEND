import { Router } from 'express';
import usersController from '../controllers/users.controller.js'
import passport from 'passport';
import { authMiddleware, jwtValidation } from '../middlewares/verifiers.js';

const router = Router();




router.get(
    '/:userId', 
    passport.authenticate('jwt', { session: false }),
    authMiddleware(['user', 'admin']), 
    usersController.findUserById
);

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get(
    '/auth/github/callback', 
    passport.authenticate(
        'github', 
        { 
            successRedirect: '/products', 
            failureRedirect: '/login'
        }
    )
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