import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import login from '../../assets/images/login.png';
import icFb from '../../assets/images/ic-fb.png';
import icGg from '../../assets/images/ic-gg.png';
import logo from '../../assets/images/logo.png';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
  });
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async () => {
    if (!form.email) return alert('Vui lòng nhập email');
    try {
      const res = await axios.post('/api/auth/send-otp', { email: form.email });
      alert(res.data.message || 'Gửi OTP thành công');
      setOtpSent(true);
    } catch (err) {
      alert(err.response?.data?.message || 'Gửi OTP thất bại');
    }
  };


  const handleRegister = async () => {
    const { name, email, password, confirmPassword, otp } = form;

    if (!name || !email || !password || !confirmPassword || !otp) {
      return alert('Vui lòng nhập đầy đủ thông tin');
    }

    if (password !== confirmPassword) {
      return alert('Mật khẩu không khớp');
    }

    try {
      const res = await axios.post('/api/auth/verify-otp', {
        name,
        email,
        password,
        otp,
      });

      alert(res.data.message || 'Đăng ký thành công');
      navigate(`/login?email=${email}&password=${password}`);
    } catch (err) {
      alert(err.response?.data?.message || 'Đăng ký thất bại');
    }
  };


  return (
    <>
      <div className="content-center ml-3 mt-6 mb-12">
        <img src={logo} alt="" />
      </div>
      <div className="w-[80%] grid grid-cols-1 md:grid-cols-2 mx-auto gap-12 justify-center">
        <div className="flex flex-col space-y-4 xl:space-y-8 justify-center">
          <div className="text-left">
            <h3 className="font-display font-extrabold text-3xl xl:text-[55px] leading-[100%] mb-1">
              Welcome to Stylicle!
            </h3>
            <p>Kindly fill in your details below to create an account</p>
          </div>

          <div>
            <p className="text-left">Full Name</p>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full h-12 lg:h-16 pl-2 rounded-md border"
            />
          </div>

          <div>
            <p className="text-left mb-1">Email*</p>
            <div className="flex gap-2">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="flex-grow h-12 lg:h-16 pl-2 rounded-md border"
              />
              <button
                onClick={handleSendOtp}
                className="px-4 h-12 lg:h-16 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
              >
                Gửi mã
              </button>
            </div>
          </div>

          {otpSent && (
            <div>
              <p className="text-left">Nhập mã OTP</p>
              <input
                type="text"
                name="otp"
                value={form.otp}
                onChange={handleChange}
                placeholder="OTP đã gửi qua email"
                className="w-full h-12 lg:h-16 pl-2 rounded-md border"
              />
            </div>
          )}

          <div>
            <p className="text-left">Password*</p>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full h-12 lg:h-16 pl-2 rounded-md border"
            />
          </div>

          <div>
            <p className="text-left">Confirm password*</p>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Enter your confirm password"
              className="w-full h-12 lg:h-16 pl-2 rounded-md border"
            />
          </div>

          <button
            onClick={handleRegister}
            className="flex justify-center rounded-md border w-full h-12 lg:h-16 items-center !bg-[#BA7894] text-white text-xl"
          >
            Register
          </button>

          <div className="flex items-center gap-4 w-full">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="text-sm text-gray-500">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <div className="flex w-full gap-6 justify-between">
            <button
              className="flex w-1/2 justify-center items-center border border-red-500 rounded-md gap-2 py-2"
              onClick={() => {
                window.location.href = 'http://localhost:5000/api/auth/google';
              }}
            >
              <img src={icGg} alt="Google" className="w-5 h-5" />
              <span>Google</span>
            </button>
            <button
              className="flex w-1/2 justify-center items-center border border-sky-500 rounded-md gap-2 py-2"
              onClick={() => {
                window.location.href = 'http://localhost:5000/api/auth/facebook';
              }}
            >
              <img src={icFb} alt="Facebook" className="w-5 h-5" />
              <span>Facebook</span>
            </button>
          </div>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>

        <div className="img__container content-center">
          <img
            src={login}
            alt=""
            className="w-full object-cover hidden md:block max-h-[888px]"
          />
        </div>
      </div>
    </>
  );
};

export default Register;
