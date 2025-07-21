import { UserService } from '../services/user.service.js';

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ 
        "error": 400,
        "error_text": "Yêu cầu username và password",
        "data_name": "",
        "data": []
      });
    }
      const requestInfo = {
        ip: req.ip,
        userAgent: req.headers['user-agent'] || ''
    };
    const { user, token } = await UserService.loginUser(username, password, requestInfo);
    if (!user) {
      return res.status(401).json({
        "error": 401,
        "error_text": "Có lỗi xảy ra khi đăng nhập",
        "data_name": "",
        "data": []
      });
    }
    return res.status(200).json({
      "error": 0,
      "error_text": "",
      "data_name": "User data",
      "data": {
        "id": user._id,
        "username": user.username,
        "email": user.email,
        "token": token
      }
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ 
      "error": 500,
      "error_text": error.message || "Lỗi server",
      "data_name": "",
      "data": []
    });
  }
}

const registerController = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      return res.status(400).json({
        "error": 400,
        "error_text": "Email không hợp lệ",
        "data_name": "",
        "data": []
  
      });
    }
  
    if (!username || !password) {
      return res.status(400).json({
        "error": 400,
        "error_text": "Username and password are required",
        "data_name": "",
        "data": []
      });
    }
    const user = await UserService.createUser({ username, password, email });
    if (!user) {
      return res.status(400).json({
        "error": 400,
        "error_text": "Có lỗi khi tạo người dùng",
        "data_name": "",
        "data": []
      });
    }
    res.status(201).json({
      "error": 0,
      "error_text": "Đăng ký thành công",
      "data_name": "",
      "data": {
        "id": user._id,
        "username": user.username,
        "email": user.email,
        "token": user.token
      }
    });
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error.message);
    res.status(500).json({
      "error": 500,
      "error_text": error.message || "Lỗi server",
      "data_name": "",
      "data": []
    });
  }
}

const logoutController = (req, res) => {
  return res.status(400).json({ message: "Logout functionality is not implemented yet" });
  // Invalidate the token on the client side
  res.status(200).json({ message: "Logged out successfully" });
}

export {
  loginController,
  registerController,
  logoutController
};

