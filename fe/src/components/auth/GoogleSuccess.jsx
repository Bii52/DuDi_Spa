// src/pages/GoogleSuccess.jsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice'; 

const GoogleSuccess = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('accessToken', token); 
    
      dispatch(login({ token })); 
      navigate('/'); 
    } else {
      navigate('/login');
    }
  }, [location, dispatch, navigate]);

  return <div>Đang đăng nhập với Google...</div>;
};

export default GoogleSuccess;
