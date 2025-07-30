import express from 'express';
import passport from 'passport';
import {
  sendOtp,
  verifyOtp,
  login,
  getMe,
  googleCallback,
  facebookCallback,
} from '../controllers/auth.controller.js';
import {
  updateProfile,
  changePassword 
} from '../controllers/user.controller.js';
import verifyToken from '../middleware/verify_token.middleware.js';


const router = express.Router();
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);
router.get('/me', verifyToken, getMe);
router.put('/profile', verifyToken, updateProfile);
router.put('/change-password', verifyToken, changePassword);


//Facebook authentication routes  
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: 'http://localhost:5173/login' }),
  facebookCallback
);

// Google authentication routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  googleCallback
);


export default router;
