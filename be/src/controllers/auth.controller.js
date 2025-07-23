import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const facebookCallback = async (req, res) => {
  try {
    const user = req.user;
    const token = generateToken(user);
    res.redirect(`http://localhost:5173/login/success?token=${token}`);
  } catch (err) {
    res.status(500).json({ message: 'Facebook login failed' });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userData.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 1, message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 1, message: 'Server error' });
  }
};



