import express from 'express';
import { body, validationResult } from 'express-validator';

import validateRequest from '../middlewares/validateRequest';
import { register, login } from '../controllers/auth';

const AuthRouter = express.Router();

AuthRouter.post('/register', registerSchema(), validateRequest, registerUser);
AuthRouter.post('/login', loginSchema(), validateRequest, loginUser);

function registerSchema() {
  return [
    body('firstName', 'First Name field is required').not().isEmpty(),
    body('lastName', 'Last Name field is required').not().isEmpty(),
    body('email', 'Email field is required').not().isEmpty(),
    body('email', 'Not a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({
      min: 5,
    }),
  ];
}

function registerUser(req, res, next) {
  register(req.body)
    .then((user) => res.status(200).json({ message: 'Register success', user }))
    .catch(next);
}

function loginSchema() {
  return [
    body('email', 'Email field is required').not().isEmpty(),
    body('email', 'Not a valid email').isEmail(),
    body('password', 'Password must be greater 5 characters').isLength({ min: 5 }),
  ];
}

function loginUser(req, res, next) {
  login(req.body)
    .then(({ user, jwtToken }) => res.status(200).json({ message: 'Login success', user, jwtToken }))
    .catch(next);
}

export default AuthRouter;
