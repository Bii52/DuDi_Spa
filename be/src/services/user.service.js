import UserModel from '../models/user.model.js';
import UserTokenModel from '../models/user_token.model.js';
import jsonwebtoken from 'jsonwebtoken';
const jwtExpirySeconds = 3600;

const createUser = async ({ username, password }) => {
  try {
    const user = await UserModel.find({username})
    console.log(user)
    if (user.length > 0) {
      throw new Error("Username already exists");
    }
    const newUser = new UserModel({
      username,
      password
    });
    await newUser.save();
    return { id: newUser._id, username: newUser.username };
  } catch (error) {
    console.error("(UserService) Error creating user:", error.message);
    throw new Error("Lỗi khi tạo User: " + error.message);
  }
}

const loginUser = async (username, password, requestInfo) => {
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const token = await generateAndSaveToken(user, requestInfo);
    return { user, token };
  } catch (err) {
    console.error("Lỗi đăng nhập:", err.message);
    throw new Error("Lỗi đăng nhập: " + err.message);
  }
}

const generateAndSaveToken = async (user, requestInfo) => {
    try {
      const token = jsonwebtoken.sign(
          { user: { _id: user._id, email: user.email, role: user.role } },
          process.env.JWT_SECRET,
          { expiresIn: jwtExpirySeconds }
      );

      await UserTokenModel.create({
          user_id: user._id,
          token,
          device_info: requestInfo.userAgent || '',
          ip_address: requestInfo.ip,
          expires_at: new Date(Date.now() + jwtExpirySeconds * 1000)
      });

      return token;
  } catch (error) {
      console.error("Lỗi khi tạo token:", error.message);
      throw error;
  }
}

export const UserService = {
  createUser,
  loginUser
}