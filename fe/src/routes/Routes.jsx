import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Profile from '../pages/Profile';
import MainLayout from '../Layout/Layout';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import AuthLayout from '../Layout/AuthLayout';
import About from '../pages/About';
import ServiceDetail from '../pages/ServiceDetail';
import Booking from '../pages/Booking';
import LoginSuccess from '../components/auth/LoginSuccess';
import GoogleSuccess from '../components/auth/GoogleSuccess';
import BookingHistory from '../pages/BookingHistory';
import ChangePassword from '../pages/ChangePassword';


const AppRoutes = () => (
  <Routes>
    

    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} /> {/* "/" sẽ load Home */}
      <Route path="home" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="profile" element={<Profile />} />
      < Route path='/services/:id' element={<ServiceDetail />} />
      < Route path='/booking/:id' element={<Booking />} />
      <Route path="/BookingHistory" element={<BookingHistory />} />
      <Route path= "/ChangePassword" element={<ChangePassword/>}/>
    </Route>
    <Route element={<AuthLayout />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/login/success" element={<LoginSuccess />} />
      <Route path="/login/google/success" element={<GoogleSuccess />} />
    </Route>
    <Route path="*" element={<div className="text-center p-10">404 Not Found</div>} />
  </Routes>
);

export default AppRoutes;
