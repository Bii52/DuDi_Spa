import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import sendMail from '../utils/send_mail.js';
import dotenv from 'dotenv';

dotenv.config();

// Lưu OTP tạm thời
const otpStore = {};

// Tạo JWT token
export const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

/**
 * Gửi OTP (chỉ gửi thôi, chưa tạo user)
 */
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email là bắt buộc' });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email đã được sử dụng' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 5 * 60 * 1000; // 5 phút

    otpStore[email] = { otp, otpExpires };

    await sendMail({
      to: email,
      subject: 'Mã xác minh OTP',
      text: `Mã xác minh của bạn là: ${otp}. Mã có hiệu lực trong 5 phút.`,
    });

    return res.status(200).json({ message: 'OTP đã được gửi thành công' });
  } catch (err) {
    return res.status(500).json({ message: 'Lỗi gửi OTP', error: err.message });
  }
};

/**
 * Xác thực OTP và tạo tài khoản
 */
export const verifyOtp = async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;

    const stored = otpStore[email];
    if (!stored) return res.status(400).json({ message: 'OTP chưa được gửi hoặc đã hết hạn' });
    if (stored.otp !== otp) return res.status(400).json({ message: 'Mã OTP không chính xác' });
    if (stored.otpExpires < Date.now()) return res.status(400).json({ message: 'Mã OTP đã hết hạn' });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email đã được sử dụng' });


    const newUser = await User.create({
      name,
      email,
      password,
      isEmailVerified: true,
    });

    delete otpStore[email];

    return res.status(201).json({ message: 'Tạo tài khoản thành công', userId: newUser._id });
  } catch (err) {
    return res.status(500).json({ message: 'Lỗi tạo tài khoản', error: err.message });
  }
};

/**
 * Đăng nhập
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: 'Email không tồn tại' });
    if (!user.isEmailVerified) return res.status(403).json({ message: 'Email chưa được xác minh' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Sai mật khẩu' });

    const token = generateToken(user);
    console.log(user);
    return res.json({ token, user: { id: user._id, email: user.email, role: user.role , phone: user.phone, gender: user.gender, birthdate: user.birthdate } });
  } catch (err) {
    return res.status(500).json({ message: 'Lỗi đăng nhập', error: err.message });
  }
};

/**
 * Lấy thông tin người dùng hiện tại
 */
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userData.id).select('name username email avatar role phone gender birthdate ');
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
    console.log("user ff", user)
    return res.status(200).json({
      id: user._id,
      name: user.name,
      username: user.username,
      phone: user.phone,
      email: user.email,
      gender: user.gender,
      birthdate: user.birthdate,
      avatar: user.avatar,
      role: user.role,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};


/**
 * Cập nhật hồ sơ người dùng
 */
export const updateProfile = async (req, res) => {
  try {
    const userId = req.userData.id;
    const { name, phone, gender, birthdate, avatar } = req.body;

    const updated = await User.findByIdAndUpdate(
      userId,
      {
        name,
        phone,
        gender,
        birthdate: birthdate ? new Date(birthdate) : undefined,
        avatar,
      },
      { new: true }
    ).select('-password');

    if (!updated) return res.status(404).json({ message: 'Người dùng không tồn tại' });

    return res.status(200).json({ message: 'Cập nhật thành công', user: updated });
  } catch (err) {
    return res.status(500).json({ message: 'Lỗi cập nhật hồ sơ', error: err.message });
  }
};

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.userData.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error_text: 'Không tìm thấy người dùng' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error_text: 'Mật khẩu hiện tại không đúng.' });
    }

    user.password = newPassword; 
    console.log(`isModified: ${user.isModified('password')}`);
    await user.save(); 

    res.json({ message: 'Đổi mật khẩu thành công.' });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ error_text: 'Lỗi server khi đổi mật khẩu.' });
  }
};


export const googleCallback = async (req, res) => {
  try {
    const user = req.user;
    const token = generateToken(user);
    res.redirect(`http://localhost:5173/login/google/success?token=${token}`);
  } catch (err) {
    res.status(500).json({ message: 'Google login failed' });
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
