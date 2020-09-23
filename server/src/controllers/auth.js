import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import { ErrorHandler } from '../middlewares/error';
import User from '../models/user';
import RefreshToken from '../models/refreshToken';

const register = async (params) => {
  const foundUser = await User.findOne({ email: params.email });
  // Validate
  if (foundUser) {
    throw new ErrorHandler(400, 'Email already exists');
  }

  // Create user object
  const newUser = new User(params);

  // First user is admin
  const isFirstUser = (await User.countDocuments({})) === 0;
  newUser.role = isFirstUser ? 'Admin' : 'User';

  // Hash password
  const passwordHash = hash(newUser.password);
  newUser.password = passwordHash;

  // Save to db
  const user = await newUser.save();
  return userInfo(user);
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
    const refreshToken = generateRefreshToken(user);

    await refreshToken.save();

    return {
      user: userInfo(user),
      jwtToken,
      refreshToken: refreshToken.token,
    };
  }
  throw new ErrorHandler(400, 'Password is incorrect');
};

const refreshToken = async (token) => {
  const refreshToken = await getRefreshToken(token);
  const { user } = refreshToken;

  // replace old token with new one and save
  const newRefreshToken = generateRefreshToken(user);
  refreshToken.revoked = Date.now();
  refreshToken.replacedByToken = newRefreshToken.token;
  await refreshToken.save();
  await newRefreshToken.save();

  // Generate new jwt token
  const jwtToken = generateJwtToken(user);

  return {
    jwtToken,
    refreshToken: newRefreshToken.token,
  };
};

const revokeToken = async (token) => {
  const refreshToken = await getRefreshToken(token);

  refreshToken.revoked = Date.now();
  await refreshToken.save();
};

// Helper functions
const hash = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const getRefreshToken = async (token) => {
  const foundToken = await RefreshToken.findOne({ token }).populate('user');
  if (!foundToken || !foundToken.isActive) throw new ErrorHandler(403, 'Invalid refresh token');
  return foundToken;
};

const generateJwtToken = (user) => {
  const token = jwt.sign({ sub: user.id, id: user.id }, process.env.SECRET, { expiresIn: '5m' });
  return `Bearer ${token}`;
};

const generateRefreshToken = (user) =>
  new RefreshToken({
    user: user.id,
    token: randomTokenString(),
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

const randomTokenString = () => crypto.randomBytes(40).toString('hex');

const userInfo = (user) => {
  const { id, firstName, lastName, email, profile, role, created, updated } = user;
  return {
    id,
    firstName,
    lastName,
    email,
    profile,
    role,
    created,
    updated,
  };
};

export { register, login, refreshToken, revokeToken };
