import express from "express";
import { validationResult } from "express-validator";

import { validateAuthInput, registerUser, loginUser } from "../services/auth";

const UsersRouter = express.Router();

// @route POST api/users/register
// @desc Register user
// @access Public
UsersRouter.post("/register", validateAuthInput("register"), (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  return registerUser(req, res);
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
UsersRouter.post("/login", validateAuthInput("login"), (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  return loginUser(req, res);
});

export default UsersRouter;
