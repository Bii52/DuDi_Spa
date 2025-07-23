import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Profile from '../pages/Profile';
import MainLayout from '../Layout/Layout';
import About from '../pages/About';
import AuthLayout from '../Layout/AuthLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import LoginSuccess from '../pages/LoginSuccess';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} /> {/* "/" sẽ load Home */}
      <Route path="home" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="profile" element={<Profile />} />
    </Route>
    <Route element={<AuthLayout />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/login/success" element={<LoginSuccess />} />
    </Route>
    <Route path="*" element={<div className="text-center p-10">404 Not Found</div>} />
  </Routes>
);

export default AppRoutes;
