import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    minlength: 6,
  },

  // OAuth Providers
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  facebookId: {
    type: String,
    unique: true,
    sparse: true,
  },

  avatar: {
    type: String,
  },

  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },

  birthdate: {
    type: Date,
  },

  // OTP Verification
  otp: {
    type: String,
  },
  otpExpires: {
    type: Date,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },

  // Email Verification
  isEmailVerified: {
    type: Boolean,
    default: false,
  },

  // User Role
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },

}, { timestamps: true });

// Middleware to hash password if changed and present
userSchema.pre('save', async function (next) {
  if (this.isModified('password') && this.password) {
    try {
      console.log('Hashing password...')
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Instance method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
