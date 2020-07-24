import express from 'express';
import { body } from 'express-validator';

import validateRequest from '../middlewares/validateRequest';
import * as AuthController from '../controllers/auth';

const AuthRouter = express.Router();

AuthRouter.post('/register', registerSchema(), validateRequest, register);
AuthRouter.post('/login', loginSchema(), validateRequest, login);
AuthRouter.post('/refresh-token', tokenSchema(), validateRequest, refreshToken);
AuthRouter.post('/revoke-token', tokenSchema(), validateRequest, revokeToken);

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

function loginSchema() {
  return [
    body('email', 'Email field is required').not().isEmpty(),
    body('email', 'Not a valid email').isEmail(),
    body('password', 'Password must be greater 5 characters').isLength({ min: 5 }),
  ];
}

function tokenSchema() {
  return [body('refreshToken', 'Invalid refresh token').not().isEmpty()];
}

// Calls to controller
function register(req, res, next) {
  AuthController.register(req.body)
    .then((user) => {
      res.status(201).json({
        message: 'Register success',
        user,
      });
    })
    .catch(next);
}

function login(req, res, next) {
  AuthController.login(req.body)
    .then(({ user, jwtToken, refreshToken }) => {
      res.status(200).json({
        message: 'Login success',
        user,
        jwtToken,
        refreshToken,
      });
    })
    .catch(next);
}

function refreshToken(req, res, next) {
  AuthController.refreshToken(req.body.refreshToken)
    .then(({ jwtToken, refreshToken }) => {
      res.status(201).json({
        message: 'Refresh token success',
        jwtToken,
        refreshToken,
      });
    })
    .catch(next);
}

function revokeToken(req, res, next) {
  AuthController.revokeToken(req.body.refreshToken)
    .then(() =>
      res.status(200).json({
        message: 'Revoke token success',
      })
    )
    .catch(next);
}

export default AuthRouter;
