import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { FaShare } from "react-icons/fa6";
import { IoSettings, IoCalendarOutline, IoLockClosedOutline } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import Toast from '../components/ui/Toast';
import useToast from '../hooks/useToast';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state) => state.auth);
  const { toast, showSuccess, showError, hideToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    gender: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    avatar: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  useEffect(() => {
    if (user) {
      const birthDate = user.birthdate ? new Date(user.birthdate) : null;
      console.log(user);
      setFormData({
        fullName: user.name || '',
        phone: user.phone || '',
        email: user.email || '',
        gender: user.gender || '',
        birthDay: birthDate ? birthDate.getDate().toString().padStart(2, '0') : '',
        birthMonth: birthDate ? (birthDate.getMonth() + 1).toString().padStart(2, '0') : '',
        birthYear: birthDate ? birthDate.getFullYear().toString() : '',
        avatar: user.avatar || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      showError('Chỉ chấp nhận file ảnh (JPEG, PNG, GIF)');
      return;
    }

    if (file.size > maxSize) {
      showError('File ảnh không được lớn hơn 5MB');
      return;
    }

    setUploadingAvatar(true);

    const formDataCloud = new FormData();
    formDataCloud.append('file', file);
    formDataCloud.append('upload_preset', 'avatar_unsigned');
    formDataCloud.append('cloud_name', 'dslzlviqm');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dslzlviqm/image/upload', {
        method: 'POST',
        body: formDataCloud,
      });

      const data = await res.json();

      if (data.secure_url) {
        setFormData(prev => ({
          ...prev,
          avatar: data.secure_url
        }));

        // Gọi API cập nhật ngay khi có avatar mới
        const token = localStorage.getItem('token');
        await axios.put('/api/auth/profile', {
          avatar: data.secure_url,
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        await dispatch(fetchCurrentUser()).unwrap();

        showSuccess('Ảnh đại diện đã được cập nhật!');
      } else {
        showError('Không thể upload ảnh. Vui lòng thử lại.');
      }
    } catch (err) {
      console.error("Lỗi khi upload ảnh:", err);
      showError('Lỗi khi upload ảnh. Vui lòng thử lại.');
    } finally {
      setUploadingAvatar(false);
      setShowAvatarMenu(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const { fullName, phone, email, gender, birthDay, birthMonth, birthYear, avatar } = formData;
      const birthdate = `${birthYear}-${birthMonth}-${birthDay}`;

      await axios.put('/api/auth/profile', {
        name: fullName,
        phone,
        email,
        gender,
        birthdate,
        avatar,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await dispatch(fetchCurrentUser()).unwrap();
      console.log("data----", data)

      showSuccess('Cập nhật hồ sơ thành công!');
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      showError('Lỗi khi cập nhật hồ sơ');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <p>Đang tải thông tin...</p>;

  return (
    <div className="min-h-screen w-screen font-sans bg-[#fefefe] relative">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
          duration={toast.duration}
        />
      )}

      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-4 sm:p-6">
        <aside className="col-span-1 bg-white rounded-xl border p-5 shadow-md self-start relative">
          <h3 className="text-2xl font-semibold text-[#BA7894] mb-4 text-center">Thông Tin Cá Nhân</h3>
          <div className="text-center text-[#BA7894] relative">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleAvatarUpload}
              hidden
            />
            <div className="relative inline-block">
              <div className="relative">
                <img
                  src={formData.avatar || 'https://i.pravatar.cc/100?u=dan'}
                  alt="Avatar"
                  className="w-24 h-24 mx-auto rounded-full border-4 border-[#BA7894] p-1 mb-4 cursor-pointer hover:opacity-80 transition-opacity"
                />
                <button
                  onClick={() => setShowAvatarMenu(prev => !prev)}
                  className="absolute bottom-2 right-2 bg-[#BA7894] text-white rounded-full p-2 hover:bg-pink-700 transition-colors"
                >
                  <FaCamera size={12} />
                </button>
              </div>
              {showAvatarMenu && (
                <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-48 bg-white border rounded-md shadow-md z-50 text-sm">
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                    onClick={() => fileInputRef.current.click()}
                  >
                    {uploadingAvatar ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#BA7894]"></div>
                        Đang upload...
                      </>
                    ) : (
                      <>
                        📤 Tải ảnh lên
                      </>
                    )}
                  </div>
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                    onClick={() => setShowAvatarMenu(false)}
                  >
                    ❌ Hủy
                  </div>
                </div>
              )}
            </div>
            <h4 className="font-semibold text-lg">{user?.name || 'Không có tên'}</h4>
            <p className="text-sm text-gray-500">Thành viên từ 2022</p>
            <div className="mt-4 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/BookingHistory')}
                className="w-full text-sm border border-[#BA7894] text-[#BA7894] rounded-xl px-4 py-2 flex items-center justify-center gap-2 hover:bg-pink-50 transition"
              >
                <FaShare /> Lịch sử
              </button>

              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full text-sm border border-[#BA7894] text-[#BA7894] rounded-xl px-4 py-2 flex items-center justify-center gap-2 hover:bg-pink-50 transition"
              >
                <FaEdit /> Chỉnh sửa trang cá nhân
              </button>

              <button
                type="button"
                onClick={() => navigate('/ChangePassword')}
                className="w-full text-sm border border-[#BA7894] text-[#BA7894] rounded-xl px-4 py-2 flex items-center justify-center gap-2 hover:bg-pink-50 transition"
              >
                <IoSettings /> Cài Đặt
              </button>
            </div>
            <div className="mt-6 text-left text-sm space-y-2 text-black">
              <p className="flex items-center gap-2">
                <IoCalendarOutline /> Đã tham gia: 16/01/2022
              </p>
              <p className="flex items-center gap-2">
                <IoLockClosedOutline /> Đã xác thực: {formData.email ? 'Đã xác thực' : 'Chưa xác thực'}
              </p>
            </div>
          </div>
        </aside>

        <form onSubmit={handleSubmit} className="col-span-2 bg-white rounded-lg p-6 shadow-sm border border-[#A7F3D0] space-y-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#BA7894]">Hồ sơ cá nhân</h2>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            disabled={!isEditing}
            className={`p-3 border rounded-2xl w-full transition ${!isEditing
              ? 'bg-indigo-50 text-gray-500 border-indigo-100 cursor-not-allowed'
              : 'border-indigo-200 focus:border-[#6C63FF]'
              }`}
            placeholder="Nhập họ tên của bạn"
          />

          <div className="space-y-3 text-[#BA7894]">
            <h4 className="text-lg font-medium">Số Điện Thoại</h4>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className={`p-3 border rounded-2xl w-full transition ${!isEditing
                ? 'bg-indigo-50 text-gray-500 border-indigo-100 cursor-not-allowed'
                : 'border-indigo-200 focus:border-[#6C63FF]'
                }`}
              placeholder="Nhập số điện thoại"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-3 text-[#BA7894]">
            <h4 className="text-lg font-medium">Gmail</h4>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="p-3 border rounded-2xl w-full bg-indigo-50 text-gray-500 border-indigo-100 cursor-not-allowed"
            />
            <p className="text-sm text-gray-500">Email không thể thay đổi</p>
          </div>
          <div className="space-y-3">
            <h4 className="text-lg font-medium text-[#BA7894]">Giới tính</h4>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              disabled={!isEditing}
              className={`p-3 border rounded-2xl w-full transition ${!isEditing
                ? 'bg-indigo-50 text-gray-500 border-indigo-100 cursor-not-allowed'
                : 'border-indigo-200 focus:border-[#6C63FF]'
                }`}
            >
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>
          <div className="space-y-3">
            <h4 className="text-lg font-medium text-[#BA7894]">Ngày sinh</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <select
                name="birthDay"
                value={formData.birthDay}
                onChange={handleChange}
                disabled={!isEditing}
                className={`p-3 border rounded-2xl text-center transition ${!isEditing
                  ? 'bg-indigo-50 text-gray-500 border-indigo-100 cursor-not-allowed'
                  : 'border-pink-200 focus:border-[#BA7894]'
                  }`}
              >
                <option value="">Ngày</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i} value={String(i + 1).padStart(2, '0')}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
                name="birthMonth"
                value={formData.birthMonth}
                onChange={handleChange}
                disabled={!isEditing}
                className={`p-3 border rounded-2xl text-center transition ${!isEditing
                  ? 'bg-indigo-50 text-gray-500 border-indigo-100 cursor-not-allowed'
                  : 'border-pink-200 focus:border-[#BA7894]'
                  }`}
              >
                <option value="">Tháng</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={String(i + 1).padStart(2, '0')}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
                name="birthYear"
                value={formData.birthYear}
                onChange={handleChange}
                disabled={!isEditing}
                className={`p-3 border rounded-2xl text-center transition ${!isEditing
                  ? 'bg-indigo-50 text-gray-500 border-indigo-100 cursor-not-allowed'
                  : 'border-pink-200 focus:border-[#BA7894]'
                  }`}
              >
                <option value="">Năm</option>
                {Array.from({ length: 100 }, (_, i) => (
                  <option key={i} value={2025 - i}>
                    {2025 - i}
                  </option>
                ))}
              </select>
            </div>
            {errors.birthDate && (
              <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>
            )}
          </div>

          {isEditing && (
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-[#BA7894] text-white rounded-md hover:bg-pink-700 disabled:opacity-50 transition font-medium"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Đang lưu...
                  </div>
                ) : (
                  'Lưu thay đổi'
                )}
              </button>
            </div>
          )}
        </form>
      </main>
    </div>
  );
};

export default Profile;
