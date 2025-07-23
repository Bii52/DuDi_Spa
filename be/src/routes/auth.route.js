import { Router } from 'express';
import passport from 'passport';
import { facebookAuthCallback } from '../controllers/auth.controller.js';

const router = Router();

// Khởi tạo xác thực Facebook
router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

// Callback sau khi xác thực thành công
router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  facebookAuthCallback
);

export default router;
