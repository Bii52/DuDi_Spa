import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';

import Profile from '../pages/Profile';
import About from '../pages/About';
import Contact from '../pages/Contact';
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/about" element={<About />} />
    <Route path="*" element={<div className="text-center p-10">404 Not Found</div>} />
  </Routes>
);

export default AppRoutes;
