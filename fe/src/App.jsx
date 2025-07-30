import React, { useEffect, useState } from 'react';
import AppRoutes from './routes/Routes';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from './store/slices/authSlice';

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.auth);
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
  const checkAuth = async () => {
    try {
      await dispatch(fetchCurrentUser()).unwrap();
    } catch (err) {
      console.error("Lỗi xác thực:", err);
    } finally {
      setCheckedAuth(true);
    }
  };
  checkAuth();
}, [dispatch]);


if (!checkedAuth || isLoading) {
  return <div>Loading...</div>; // hoặc splash screen
}


  return <AppRoutes />;
}

export default App;
