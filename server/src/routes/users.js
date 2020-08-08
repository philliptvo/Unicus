import express from 'express';

import authorize from '../middlewares/authorize';
import { ErrorHandler } from '../middlewares/error';
import * as UserController from '../controllers/users';

const UsersRouter = express.Router();

UsersRouter.get('/', authorize, getAllUsers);
UsersRouter.get('/:id', getUser);
UsersRouter.put('/:id', updateUser);
UsersRouter.delete('/:id', deleteUser);

function getAllUsers(req, res, next) {
  UserController.getAll()
    .then((user) => res.status(200).json({ status: 'Retrieve success', message: user }))
    .catch(next);
}

function getUser(req, res, next) {
  if (req.user.id !== req.params.id) {
    throw new ErrorHandler(401, 'Unauthorized');
  }

  UserController.getById(req.user.id)
    .then((user) => res.status(200).json({ status: 'Retrieve success', message: user }))
    .catch(next);
}

function updateUser(req, res, next) {
  if (req.user.id !== req.params.id) {
    throw new ErrorHandler(401, 'Unauthorized');
  }

  UserController.updateById(req.user.id, req.body)
    .then((user) => res.status(200).json({ status: 'Update success', message: user }))
    .catch(next);
}

function deleteUser(req, res, next) {
  if (req.user.id !== req.params.id) {
    throw new ErrorHandler(401, 'Unauthorized');
  }

  UserController.deleteById(req.user.id)
    .then((user) => res.status(200).json({ status: 'Delete success', message: user }))
    .catch(next);
}

export default UsersRouter;
