import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { facebookCallback } from '../controllers/auth.controller.js';
import verifyToken from '../middleware/verify_token.middleware.js';
import { getMe } from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/me', verifyToken, getMe);

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// [GET] /api/auth/facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// [GET] /api/auth/facebook/callback
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: 'http://localhost:5173/login' }),
  facebookCallback
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, name: req.user.name, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.redirect(`http://localhost:5173/auth/google/success?token=${token}`);
  }
);

export default router;
