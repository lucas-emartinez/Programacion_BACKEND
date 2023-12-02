import { Router } from "express";
import sessionsController from "../controllers/sessions.controller.js";
import passport from "passport";

const router = Router();

router.post("/login", sessionsController.login);

router.post("/logout", sessionsController.logout);

router.get(
    '/auth/github', 
    passport.authenticate(
        'github', 
        { scope: ['user:email'] })
);

router.get(
    '/auth/github/callback', 
    passport.authenticate(
        'github',
        { 
            session: false,
            failureRedirect: '/login',
        }
    ),
        sessionsController.githubLogin
)

router.get(
    '/auth/google', 
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
    '/auth/google/callback', 
    passport.authenticate(
        'google', 
        { 
            session: false,
            failureRedirect: '/login',
        }
    ),
    sessionsController.googleLogin
);

export default router;