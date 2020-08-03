import { ErrorHandler } from '../middlewares/error';
import User from '../models/user';

const getAll = async () => {
  const users = await User.find({});
  return users;
};

const getById = async (userId) => {
  const user = await getAccount(userId);
  return user;
};

const updateById = async (userId, params) => {
  const user = await getAccount(userId);

  Object.assign(user, params);
  user.updated = Date.now();
  await user.save();

  return user;
};

const deleteById = async (userId) => {
  const user = await getAccount(userId);
  await user.remove();
};

// Helper functions
const getAccount = async (id) => {
  const account = User.findById(id);
  if (!account) throw new ErrorHandler(400, 'Account not found');
  return account;
};

export {
  getAll, getById, updateById, deleteById
};
