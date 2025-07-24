import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: function () {
      return this.provider === 'local';
    },
    unique: true,
    trim: true,
    sparse: true // cần nếu có thể null
  },
  password: {
    type: String,
    minlength: 6,
    required: function () {
      return this.provider === 'local';
    }
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    sparse: true
  },
  phonenumber: {
    type: String,
    unique: true,
    sparse: true
  },
  facebookId: {
    type: String,
    unique: true,
    sparse: true
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  provider: {
    type: String,
    enum: ['local', 'facebook', 'google'],
    default: 'local'
  },
  role: {
    type: String,
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to hash password before saving user (only if provider is 'local')
userSchema.pre('save', async function (next) {
  if (this.isModified('password') && this.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model('User', userSchema);
export default User;
