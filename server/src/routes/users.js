import express from 'express';

import authorize from '../middlewares/authorize';
import upload from '../middlewares/upload';
import * as UserController from '../controllers/users';

const UsersRouter = express.Router();

UsersRouter.get('/all', authorize, getAllUsers);
UsersRouter.get('/', getUser);
UsersRouter.put('/', upload.single('image'), updateUser);
UsersRouter.delete('/', deleteUser);

function getAllUsers(req, res, next) {
  UserController.getAll()
    .then((user) => res.status(200).json({ message: 'Retrieve success', user }))
    .catch(next);
}

function getUser(req, res, next) {
  UserController.getById(req.user.id)
    .then((user) => res.status(200).json({ message: 'Retrieve success', user }))
    .catch(next);
}

function updateUser(req, res, next) {
  UserController.updateById(req.user.id, req.body, req.file)
    .then((user) => res.status(200).json({ message: 'Update success', user }))
    .catch(next);
}

function deleteUser(req, res, next) {
  UserController.deleteById(req.user.id)
    .then((user) => res.status(200).json({ message: 'Delete success', user }))
    .catch(next);
}

export default UsersRouter;
