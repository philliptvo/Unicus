import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import { ErrorHandler } from '../middlewares/error';

const register = async (params) => {
  const foundUser = await User.findOne({ email: params.email });
  // Validate
  if (foundUser) {
    throw new ErrorHandler(400, 'Email already exists');
  }

  // Create user object
  const newUser = new User(params);

  // First user is admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  newUser.role = isFirstAccount ? 'Admin' : 'User';

  // Hash password
  const passwordHash = hash(newUser.password);
  newUser.password = passwordHash;

  // Save to db
  const user = await newUser.save();
  return user;
};

const login = async (params) => {
  const user = await User.findOne({ email: params.email });
  // Validate
  if (!user) {
    throw new ErrorHandler(400, 'Email not found');
  }

  const isMatch = await bcrypt.compare(params.password, user.password);
  if (isMatch) {
    // Credentials match so generate jwt token
    const jwtToken = generateJwtToken(user);

    return {
      user,
      jwtToken,
    };
  }
  throw new ErrorHandler(400, 'Password is incorrect');
};

// Helper functions
const hash = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const generateJwtToken = (user) => {
  const token = jwt.sign({ sub: user.id, id: user.id }, process.env.SECRET, { expiresIn: '5m' });
  return `Bearer ${token}`;
};

const generateRefreshToken = () => {
  // TODO: generate refresh token
};

export {
  register, login
};
