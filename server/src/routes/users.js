import express from 'express';

import {
  getAll, getById, updateById, deleteById
} from '../controllers/users';
import { ErrorHandler } from '../middlewares/error';

const UsersRouter = express.Router();

UsersRouter.get('/', getAllUsers);
UsersRouter.get('/:id', getUser);
UsersRouter.put('/:id', updateUser);
UsersRouter.delete('/:id', deleteUser);

function getAllUsers(req, res, next) {
  getAll()
    .then((user) => res.status(200).json({ status: 'Retrieve success', message: user }))
    .catch(next);
}

function getUser(req, res, next) {
  if (req.user.id !== req.params.id) {
    throw new ErrorHandler(401, 'Unauthorized');
  }

  getById(req.user.id)
    .then((user) => res.status(200).json({ status: 'Retrieve success', message: user }))
    .catch(next);
}

function updateUser(req, res, next) {
  if (req.user.id !== req.params.id) {
    throw new ErrorHandler(401, 'Unauthorized');
  }

  updateById(req.user.id, req.body)
    .then((user) => res.status(200).json({ status: 'Update success', message: user }))
    .catch(next);
}

function deleteUser(req, res, next) {
  if (req.user.id !== req.params.id) {
    throw new ErrorHandler(401, 'Unauthorized');
  }

  deleteById(req.user.id)
    .then((user) => res.status(200).json({ status: 'Delete success', message: user }))
    .catch(next);
}

export default UsersRouter;
