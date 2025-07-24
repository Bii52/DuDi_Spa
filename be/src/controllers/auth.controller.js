import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ message: 'Email đã tồn tại' });

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
      role: 'user'
    });

    return res.status(201).json({ message: 'Đăng ký thành công' });
  } catch (err) {
    return res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

export const loginNormal = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Email không tồn tại' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Sai mật khẩu' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
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
    console.log("🔥 [GET ME] user:", user);
    if (!user) {
      return res.status(404).json({ error: 1, error_text: 'User không tồn tại' });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: 1, error_text: 'Lỗi server', err });
  }
};



