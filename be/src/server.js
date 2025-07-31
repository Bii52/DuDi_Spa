import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import routers from './routes/index.js'; 

import './config/passport.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: 'facebook_secret_key',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routers); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
