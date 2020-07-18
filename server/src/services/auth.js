import { body } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user";

export function validateAuthInput(method) {
  switch (method) {
    case "register":
      return [
        body("name", "Name field is required").not().isEmpty(),
        body("email", "Email field is required").not().isEmpty(),
        body("email", "Not a valid email").isEmail(),
        body("password", "Password must be at least 5 characters").isLength({
          min: 5,
        }),
      ];
    case "login":
      return [
        body("email", "Email field is required").not().isEmpty(),
        body("email", "Not a valid email").isEmail(),
        body("password", "Password is incorrect").isLength({ min: 5 }),
      ];
  }
}

export function registerUser(req, res) {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      // Hash password then save in db
      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.status(200).json(user))
            .catch((err) => console.log(err));
        })
      );
    }
  });
}

export function loginUser(req, res) {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(400).json({ email: "Email not found" });
    }

    bcrypt.compare(req.body.password, user.password).then((isMatch) => {
      if (isMatch) {
        // Create JWT payload on match
        const payload = {
          id: user.id,
          name: user.name,
        };

        jwt.sign(
          payload,
          process.env.SECRET,
          { expiresIn: 60 * 60 },
          (err, token) => {
            res.status(200).json({ success: true, token: "Βearer " + token });
          }
        );
      } else {
        return res.status(400).send({ password: "Password is incorrect" });
      }
    });
  });
}
