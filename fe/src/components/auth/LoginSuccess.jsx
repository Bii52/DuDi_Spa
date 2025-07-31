import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from '../../store/slices/authSlice'; 

const LoginSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      localStorage.setItem('token', token);

      dispatch(fetchCurrentUser())
        .unwrap()
        .then(() => {
          navigate('/');
        })
        .catch((err) => {
          console.error('Lỗi xác thực:', err);
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, searchParams]);

  return <div className="text-center mt-10">Đang đăng nhập...</div>;
};

export default LoginSuccess;
