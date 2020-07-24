import express from 'express';

import authorize from '../middlewares/authorize';
import RefreshToken from '../models/refreshToken';

const AdminRouter = express.Router();

AdminRouter.get('/', authorize, getTokens);
AdminRouter.post('/clear', authorize, clearTokens);

async function getTokens(req, res, next) {
  const tokens = await RefreshToken.find({});
  res.status(200).json({ status: 'Retrieve success', message: tokens });
}

async function clearTokens(req, res, next) {
  await RefreshToken.deleteMany({});
  res.status(200).json({ status: 'Delete success' });
}

export default AdminRouter;
