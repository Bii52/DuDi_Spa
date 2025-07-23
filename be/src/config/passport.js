import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import User from '../models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  profileFields: ['id', 'displayName', 'photos', 'email']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({ facebookId: profile.id });
    if (existingUser) return done(null, existingUser);

    const newUser = new User({
      facebookId: profile.id,
      username: profile.displayName,
      avatar: profile.photos?.[0]?.value,
      email: profile.emails?.[0]?.value,
      provider: 'facebook'
    });

    await newUser.save();
    done(null, newUser);
  } catch (err) {
    done(err, null);
  }
}));

// Session support (optional)
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
