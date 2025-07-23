import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import dotenv from 'dotenv';
import UserModel from '../models/user.model.js';

dotenv.config();

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,              
    clientSecret: process.env.FACEBOOK_APP_SECRET,       
    callbackURL: 'http://localhost:5000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await UserModel.findOne({ facebookId: profile.id });

      if (existingUser) return done(null, existingUser);

      const newUser = new UserModel({
        facebookId: profile.id,
        username: profile.displayName,
        email: profile.emails?.[0]?.value || null,
        avatar: profile.photos?.[0]?.value || null,
        provider: 'facebook'
      });

      await newUser.save();
      done(null, newUser);

    } catch (err) {
      done(err, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id); 
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
