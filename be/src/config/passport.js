import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth20';
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

    let user = await User.findOne({ facebookId: profile.id });

    if (!user) {
      user = await User.create({
        facebookId: profile.id,
        email: profile.emails?.[0]?.value || '',
        name: profile.displayName || '', 
        avatar: profile.photos?.[0]?.value || '',
        provider: 'facebook'
      });
    } else {
      if (!user.name && profile.displayName) {
        user.name = profile.displayName;
        await user.save();
      }
    }

    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = await User.create({
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        avatar: profile.photos[0].value,
        provider: 'google'
      });
    }
    done(null, user);
  } catch (error) {
    done(error, null);
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
