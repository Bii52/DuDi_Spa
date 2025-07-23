import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import User from '../models/user.model.js';
import dotenv from 'dotenv';
dotenv.config()

console.log('FB_APP_ID:', process.env.FACEBOOK_APP_ID);
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'emails', 'name', 'displayName', 'photos']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ facebookId: profile.id });

      if (!user) {
        user = await User.create({
          facebookId: profile.id,
          email: profile.emails?.[0]?.value || '',
          name: profile.displayName || `${profile.name.givenName} ${profile.name.familyName}`,
          avatar: profile.photos?.[0]?.value || ''
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
export default passport;