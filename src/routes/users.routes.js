import { Router } from 'express';
import usersController from '../controllers/users.controller.js'
import passport from 'passport';

const router = Router();




router.get('/:userId', usersController.findUserById);

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
        successRedirect: '/products',
        failureRedirect: '/signup'
      })
);



export default router;