import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const facebookAuthCallback = (req, res) => {
  const token = generateToken(req.user);
  res.redirect(`http://localhost:5000/facebook?token=${token}`);
};
