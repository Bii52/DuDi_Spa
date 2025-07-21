import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './../pages/Home';
import Contact from '../pages/Contact';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Layout from '../Layout/Layout';
import AuthLayout from '../Layout/AuthLayout';



const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout/>}>
        < Route path='/login' element={<Login/>} />
        < Route path='/register' element={<Register/>} />
      </Route>

      <Route element={<Layout/>}>
        < Route path='/' element={<Navigate to='/home'/>} />
        < Route path='/home' element={<Home/>} />
        < Route path='/contact' element={<Contact/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<div className="text-center p-10">404 Not Found</div>} />
      </Route>
    </Routes>
  )
}

export default AppRoutes