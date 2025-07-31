import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AuthService = {
  facebookAuth: async (accessToken) => {
    const res = await axios.post(`${API}/auth/facebook/token`, {
      access_token: accessToken
    });
    return res.data;
  },
};

export default AuthService;
