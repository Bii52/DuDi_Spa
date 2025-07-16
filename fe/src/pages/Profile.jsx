import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { FaShare } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";

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
    <div className="min-h-screen w-screen font-sans bg-[#fefefe]">
      {/* Main Content */}
      <main className="max-w-full md:max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 p-4 sm:p-6">
        {/* Thông tin cá nhân */}
        <aside className="w-full col-span-1 bg-white rounded-xl border border-gray-200 p-6 shadow-xl self-start">
          <h3 className="text-2xl font-semibold text-[#BA7894] mb-4 text-center">Thông Tin Cá Nhân</h3>
          <div className="text-center text-[#BA7894]">
            <img
              src="https://i.pravatar.cc/100?u=dan"
              alt="Avatar"
              className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500 p-1 mb-4"
            />
            <h4 className="font-semibold text-lg">Trịnh Tuấn Đan</h4>
            <p className="text-sm text-gray-500">Thành viên từ 2022</p>

            <div className="mt-4 flex flex-col items-center gap-3 w-full">
              <button className="w-full max-w-xs text-sm border border-[#BA7894] text-[#BA7894] rounded-xl px-4 py-2 flex items-center justify-center gap-2 bg-white hover:bg-pink-50">
                <FaShare /> Chia sẻ trang của bạn
              </button>
              <button className="w-full max-w-xs text-sm border border-[#BA7894] text-[#BA7894] rounded-xl px-4 py-2 flex items-center justify-center gap-2 bg-white hover:bg-pink-50">
                <FaEdit /> Chỉnh sửa trang cá nhân
              </button>
              <button className="w-full max-w-xs text-sm border border-[#BA7894] text-[#BA7894] rounded-xl px-4 py-2 flex items-center justify-center gap-2 bg-white hover:bg-pink-50">
                <IoSettings /> Cài Đặt
              </button>
            </div>

            <div className="mt-6 text-left text-sm space-y-2 text-black">
              <p className="flex items-center gap-2">
                <IoCalendarOutline /> Đã tham gia: 16/01/2022
              </p>
              <p className="flex items-center gap-2">
                <IoLockClosedOutline /> Đã xác thực: Chưa xác thực
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt /> Địa chỉ: Chưa cung cấp
              </p>
            </div>
          </div>
        </aside>

        {/* Hồ sơ cá nhân */}
        <form onSubmit={handleSubmit} className="col-span-1 md:col-span-3 bg-white rounded-lg p-6 shadow-sm border border-[#A7F3D0] space-y-6">
          <h2 className="text-2xl font-semibold text-[#BA7894]">Hồ sơ cá nhân</h2>

          {/* THÔNG TIN LIÊN HỆ */}
          <div className="space-y-3 text-[#BA7894] ">
            <h4 className="text-lg font-medium ">Họ Tên</h4>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
              className="p-2 border border-pink-200 rounded-2xl w-full" />
            <h4 className="text-lg font-medium ">Số Điện Thoại</h4>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange}
              className="p-2 border border-pink-200 rounded-2xl w-full" />
            <h4 className="text-lg font-medium ">Gmail</h4>
            <input type="email" name="email" value={formData.email} onChange={handleChange}
              className="p-2 border border-pink-200 rounded-2xl w-full" />
          </div>

          {/* GIỚI TÍNH */}
          <div className="space-y-3">
            <h4 className="text-lg font-medium text-[#BA7894]">Giới tính</h4>
            <input type="text" name="gender" value={formData.gender} onChange={handleChange}
              className="p-2 border border-pink-200 rounded-2xl w-full bg-white" />
          </div>
          {/*NGÀY SINH */}
          <div className="space-y-3">
            <h4 className="text-lg font-medium text-[#BA7894]">Ngày sinh</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <select name="birthDay" value={formData.birthDay} onChange={handleChange}
                className="w-full p-2 text-sm border rounded-2xl border-pink-200 bg-white text-center">
                <option value="">Ngày</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>

              <select name="birthMonth" value={formData.birthMonth} onChange={handleChange}
                className="w-full p-2 text-sm border rounded-2xl border-pink-200 bg-white text-center">
                <option value="">Tháng</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>

              <select name="birthYear" value={formData.birthYear} onChange={handleChange}
                className="w-full p-2 text-sm border rounded-2xl border-pink-200 bg-white text-center">
                <option value="">Năm</option>
                {Array.from({ length: 100 }, (_, i) => (
                  <option key={i} value={2025 - i}>{2025 - i}</option>
                ))}
              </select>
            </div>
          </div>

          {/* MẬT KHẨU */}
          <div className="space-y-3">
            <h4 className="text-lg font-medium text-[#BA7894]">Mật khẩu</h4>
            <input type="password" name="password" value={formData.password} onChange={handleChange}
              className="p-2 border border-pink-200 rounded-2xl w-full" />
            <h4 className="text-lg font-medium text-[#BA7894]">Nhập lại mật khẩu</h4>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
              className="p-2 border border-pink-200 rounded-2xl w-full" />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-[#BA7894] text-white rounded-md hover:bg-pink-700 text-sm"
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
