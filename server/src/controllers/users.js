import { ErrorHandler } from '../middlewares/error';
import User from '../models/user';

const getAll = async () => {
  const users = await User.find({});
  return users;
};

const getById = async (userId) => {
  const user = await getAccount(userId);
  return userInfo(user);
};

const updateById = async (userId, params) => {
  const user = await getAccount(userId);

  Object.assign(user, params);
  user.updated = Date.now();
  await user.save();

  return userInfo(user);
};

const deleteById = async (userId) => {
  const user = await getAccount(userId);
  await user.remove();

  return userInfo(user);
};

// Helper functions
const getAccount = async (id) => {
  const account = User.findById(id);
  if (!account) throw new ErrorHandler(400, 'Account not found');
  return account;
};

const userInfo = (user) => {
  const { id, firstName, lastName, email, role, created, updated } = user;
  return {
    id,
    firstName,
    lastName,
    email,
    role,
    created,
    updated,
  };
};

export { getAll, getById, updateById, deleteById };
