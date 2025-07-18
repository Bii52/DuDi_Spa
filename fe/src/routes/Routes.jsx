import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Profile from '../pages/Profile';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="*" element={<div className="text-center p-10">404 Not Found</div>} />
  </Routes>
);

export default AppRoutes;
