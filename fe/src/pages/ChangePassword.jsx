import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      return setError('Mật khẩu mới và xác nhận mật khẩu không khớp.');
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const res = await axios.put(
        '/api/auth/change-password',
        {
          currentPassword,
          newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage(res.data.message || 'Đổi mật khẩu thành công.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.error_text || 'Đổi mật khẩu thất bại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-bold text-[#BA7894] mb-4 text-center">Đổi mật khẩu</h2>
      {error && <p className="text-red-600 mb-3">{error}</p>}
      {message && <p className="text-green-600 mb-3">{message}</p>}
      <form onSubmit={handleChangePassword} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Mật khẩu hiện tại</label>
          <input
            type="password"
            className="w-full border rounded-lg px-4 py-2"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Mật khẩu mới</label>
          <input
            type="password"
            className="w-full border rounded-lg px-4 py-2"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Xác nhận mật khẩu mới</label>
          <input
            type="password"
            className="w-full border rounded-lg px-4 py-2"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#BA7894] text-white py-2 rounded-lg font-semibold hover:bg-[#a66680] transition"
          disabled={loading}
        >
          {loading ? 'Đang xử lý...' : 'Cập nhật mật khẩu'}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
