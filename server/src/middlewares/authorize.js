import { ErrorHandler } from './error';

const authorize = (req, res, next) => {
  if (req.user.role !== 'Admin') throw new ErrorHandler(401, 'Unauthorized');
  next();
};

export default authorize;
