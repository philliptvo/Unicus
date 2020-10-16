import mongoose from 'mongoose';
import { ErrorHandler } from '../middlewares/error';
import User from '../models/user';

let gfs;
mongoose.connection.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });
});

const getAll = async () => {
  const users = await User.find({});
  return users;
};

const getById = async (userId) => {
  const user = await getAccount(userId);
  return userInfo(user);
};

const updateById = async (userId, params, image) => {
  const user = await getAccount(userId);

  Object.assign(user, params);
  if (image) {
    if (user.image) {
      gfs.delete(new mongoose.Types.ObjectId(user.image));
    }
    user.image = image.id;
  }
  user.updated = Date.now();
  await user.save();

  return userInfo(user);
};

const deleteById = async (userId) => {
  const user = await getAccount(userId);
  if (user.image) {
    gfs.delete(new mongoose.Types.ObjectId(user.image));
  }
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
  const { id, firstName, lastName, email, image, role, created, updated } = user;
  return {
    id,
    firstName,
    lastName,
    email,
    image,
    role,
    created,
    updated,
  };
};

export { getAll, getById, updateById, deleteById };
