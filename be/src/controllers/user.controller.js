import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';


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

