import { validationResult } from 'express-validator';
import { ErrorHandler } from './error';

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  throw new ErrorHandler(400, errors.array());
};

export default validateRequest;
