import express from 'express';
import passport from 'passport';
import { facebookCallback } from '../controllers/auth.controller.js';
import verifyToken from '../middleware/verify_token.middleware.js';
import { getMe } from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/me', verifyToken, getMe);

// [GET] /api/auth/facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// [GET] /api/auth/facebook/callback
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  facebookCallback
);

export default router;
