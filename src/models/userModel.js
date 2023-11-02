import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: [true, 'Username already exists'],
  },
  email: {
    type: String,
    required: [true, 'Please provide a email'],
    unique: [true, 'Email already exists'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifiedToken: String,
  verifiedTokenExpiry: String,
});

const userModel = mongoose.models.User || mongoose.model('User', UserSchema);
export default userModel;
