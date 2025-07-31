import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import login from '../../assets/images/login.png';
import icFb from '../../assets/images/ic-fb.png';
import icGg from '../../assets/images/ic-gg.png';
import logo from '../../assets/images/logo.png';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../../store/slices/authSlice';


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const prefillEmail = query.get('email');
    const prefillPassword = query.get('password');
    if (prefillEmail) setEmail(prefillEmail);
    if (prefillPassword) setPassword(prefillPassword);
  }, [location]);

  const handleLogin = async () => {
    if (!email || !password) {
      return alert('Vui lòng nhập đầy đủ thông tin');
    }

    try {
      const res = await axios.post('/api/auth/login', { email, password });

      const token = res.data.token;
      
      // Luôn lưu token vào localStorage khi đăng nhập thành công
      localStorage.setItem('token', token);

      const meRes = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });

      dispatch(loginAction({ token, user: meRes.data.data }));


      alert('Đăng nhập thành công');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Đăng nhập thất bại');
    }
  };


  return (
    <>
      <div className="content-center ml-3 mt-6 mb-12">
        <img src={logo} alt="Logo" />
      </div>
      <div className="w-[80%] grid grid-cols-1 md:grid-cols-2 mx-auto my-16 gap-12 justify-center">
        <div className="flex flex-col space-y-4 xl:space-y-8 justify-center">
          <div className="text-left">
            <h3 className="font-display font-extrabold text-3xl xl:text-[55px] leading-[100%] mb-1">
              Welcome back!
            </h3>
            <p>Login to access all your data</p>
          </div>

          <div>
            <p className="text-left">Email</p>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full h-12 lg:h-16 rounded-md border pl-2"
            />
          </div>

          <div>
            <p className="text-left">Password</p>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full h-12 lg:h-16 rounded-md border pl-2"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            <label htmlFor="remember" className="text-sm">Remember me</label>
          </div>

          <button
            onClick={handleLogin}
            className="flex justify-center rounded-xl border w-full h-12 lg:h-16 items-center !bg-[#BA7894] text-white text-xl"
          >
            Login
          </button>

          <div className="flex items-center gap-4 w-full">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="text-sm text-gray-500">Continue with</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <div className="flex w-full gap-6 justify-between">
            <button
              className="flex w-1/2 justify-center items-center border border-red-500 rounded-md gap-2 py-2"
              onClick={() => window.location.href = 'http://localhost:5000/api/auth/google'}
            >
              <img src={icGg} alt="Google" className="w-5 h-5" />
              <span>Google</span>
            </button>
            <button
              className="flex w-1/2 justify-center items-center border border-sky-500 rounded-md gap-2 py-2"
              onClick={() => window.location.href = 'http://localhost:5000/api/auth/facebook'}
            >
              <img src={icFb} alt="Facebook" className="w-5 h-5" />
              <span>Facebook</span>
            </button>
          </div>

          <p>Don't have an account? <Link to='/register'>Create</Link></p>
        </div>
        <div className="img__container">
          <img src={login} alt="" className="w-full object-cover hidden md:block" />
        </div>
      </div>
    </>
  );
};

export default Login;
