import { ErrorHandler } from './error';

import User from '../models/user';

const authorize = (req, res, next) => {
  if (req.user.role === 'Admin' || req.user.id !== req.params.id) throw new ErrorHandler(401, 'Unauthorized');
  next();
};

export default authorize;
