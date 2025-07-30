import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk để lấy thông tin người dùng hiện tại từ token
export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem("user")
      console.log(user)
      if (!token) throw new Error('No token found');
      
      const response = await axios.get('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },

        data:{
            userData: {
              id: user._id
            }
          }
      });
      console.log(response.data)
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error fetching user');
    }
  }
);

// Khởi tạo state
const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token); 
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload; // ✅ Payload là user trực tiếp
        state.isAuthenticated = true;
        state.isLoading = false;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.payload;
        localStorage.removeItem('token');
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
