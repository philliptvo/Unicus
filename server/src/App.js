import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import morgan from "morgan";

import Passport from "./config/passport";

import UsersRouter from "./routes/users";
import User from "./models/user"; // for testing get, post, delete users

const server = express();

// middleware
server.use(cors());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(morgan("dev"));

// MongoDB config
const db = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(console.log("MongoDB succesfully connected"))
  .catch((err) => console.log(err));

server.use(passport.initialize());
Passport(passport);

// Routes
// server.use((req, res, next) => console.log(req, res));
server.use("/api/users", UsersRouter);

// Get Heroku port
const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server listening on port ${port}`));
