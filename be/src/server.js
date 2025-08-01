import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import routers from './routes/index.js'; 
import categoryRoute from './routes/category.route.js';
import uploadRoute from './routes/upload.route.js';
import serviceRoute from './routes/services.route.js';
import reviewRoute from './routes/reviews.route.js';

import './config/passport.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  origin: 'http://localhost:5174',
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
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/service', serviceRoute)
app.use('/api/v1/review', reviewRoute)
app.use('/api/v1/uploading', uploadRoute)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

