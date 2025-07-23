import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Profile from '../pages/Profile';
import About from '../pages/About';
import AuthLayout from '../Layout/AuthLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/about" element={<About />} />

    <Route element={<AuthLayout />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
  </Routes>
);

export default AppRoutes;
