import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import axios from 'axios';

const LoginSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('token', token);

      axios.get('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          dispatch(login(res.data));
          navigate('/');
        })
        .catch(err => {
          console.error('Lỗi lấy profile:', err);
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, searchParams]);

  return <div className="text-center mt-10">Đang đăng nhập...</div>;
};

export default LoginSuccess;
