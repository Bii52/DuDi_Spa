// src/services/auth.service.js
import axios from './axios';

const AuthService = {
  async login(data) {
    const res = await axios.post('/auth/login', data);
    return res.data;
  },

  async getCurrentUser() {
    const res = await axios.get('/auth/me');
    return res.data.data;
  },

  async updateProfile(data) {
    const res = await axios.put('/auth/profile', data);
    return res.data.user;
  }
};

export default AuthService;
