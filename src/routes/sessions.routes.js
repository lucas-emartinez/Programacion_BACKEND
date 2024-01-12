import { Router } from "express";
import { sessionController } from "../controllers/sessions.controller.js";
import passport from "passport";

const router = Router();

router.post("/login", sessionController.login);

router.post("/logout", sessionController.logout);

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
    sessionController.githubLogin
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
    sessionController.googleLogin
);

export default router;