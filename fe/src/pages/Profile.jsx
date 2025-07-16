import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    fullName: '',
    phone: '',
    email: '',
    gender: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (value.toLowerCase() === 'script') {
      navigate('/script-page');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }
    console.log(formData);
  };

  return (
    <div className="min-h-screen font-sans bg-[#fefefe]">
      {/* Main Content */}
      <main className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 p-6 ">
        {/* Thông tin cá nhân */}
        <aside className="col-span-1 bg-white rounded-lg border p-6 shadow-sm self-start">
          <h3 className="text-xl font-semibold text-pink-800 mb-4">Thông Tin Cá Nhân</h3>
          <div className="text-center">
            <img
              src="https://i.pravatar.cc/100?u=dan"
              alt="Avatar"
              className="w-24 h-24 mx-auto rounded-full border mb-4"
            />
            <h4 className="font-semibold text-lg">Trịnh Tuấn Đan</h4>
            <p className="text-sm text-gray-500">Thành viên từ 2022</p>
            <div className="mt-4 flex flex-col items-center gap-2">
              <button className="text-sm border rounded px-3 py-1">📤 Chia sẻ trang của bạn</button>
              <button className="text-sm border rounded px-3 py-1">⚙️ Chỉnh sửa trang cá nhân</button>
            </div>
            <div className="mt-6 text-left text-sm space-y-1">
              <p>📅 Đã tham gia: 16/01/2022</p>
              <p>✔️ Đã xác thực: <span className="text-red-500">Chưa xác thực</span></p>
              <p>📍 Địa chỉ: Chưa cung cấp</p>
            </div>
          </div>
        </aside>

        {/* Hồ sơ cá nhân */}
        <form onSubmit={handleSubmit} className="col-span-1 md:col-span-3 bg-white rounded-lg p-6 shadow-sm border space-y-6">
          <h2 className="text-2xl font-semibold text-pink-800">Hồ sơ cá nhân</h2>

          {/* THÔNG TIN LIÊN HỆ */}
          <div className="space-y-3">
            <h4 className="text-lg font-medium text-gray-700">Họ Tên</h4>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Họ Tên"
              className="p-2 border border-pink-200 rounded-md w-full" />
            <h4 className="text-lg font-medium text-gray-700">Số Điện Thoại</h4>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Số Điện Thoại"
              className="p-2 border border-pink-200 rounded-md w-full" />
            <h4 className="text-lg font-medium text-gray-700">Gmail</h4>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Gmail"
              className="p-2 border border-pink-200 rounded-md w-full" />
          </div>

          {/* GIỚI TÍNH */}
          <div className="space-y-3">
            <h4 className="text-lg font-medium text-gray-700">Giới tính</h4>
            <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender"
              className="p-2 border border-pink-200 rounded-md w-full bg-white" />
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-medium text-gray-700">Ngày sinh</h4>
            <div className="grid grid-cols-3 gap-4 justify-center place-items-center">
              <select
                name="birthDay"
                value={formData.birthDay}
                onChange={handleChange}
                className="w-40 p-2 text-sm border rounded-2xl border-pink-200 bg-white text-center"
              >
                <option value="">Ngày</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>

              <select
                name="birthMonth"
                value={formData.birthMonth}
                onChange={handleChange}
                className="w-40 p-2 text-sm border rounded-2xl border-pink-200 bg-white text-center"
              >
                <option value="">Tháng</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>

              <select
                name="birthYear"
                value={formData.birthYear}
                onChange={handleChange}
                className="w-40 p-2 text-sm border rounded-2xl border-pink-200 bg-white text-center"
              >
                <option value="">Năm</option>
                {Array.from({ length: 100 }, (_, i) => (
                  <option key={i} value={2025 - i}>{2025 - i}</option>
                ))}
              </select>
            </div>
          </div>

          {/* MẬT KHẨU */}
          <div className="space-y-3">
            <h4 className="text-lg font-medium text-gray-700">Mật khẩu</h4>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Nhập Mật Khẩu"
              className="p-2 border border-pink-200 rounded-md w-full" />
            <h4 className="text-lg font-medium text-gray-700">Nhập lại mật khẩu</h4>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Nhập lại Mật Khẩu"
              className="p-2 border border-pink-200 rounded-md w-full" />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 text-sm"
            >
              Lưu thay đổi
            </button>
          </div>

        </form>

      </main>
    </div >
  );
};

export default Profile;
