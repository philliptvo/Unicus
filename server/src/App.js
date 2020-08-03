import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';
import morgan from 'morgan';

import Passport from './config/passport';
import { handleError } from './middlewares/error';

import AuthRouter from './routes/auth';
import UsersRouter from './routes/users';

const server = express();

// general middleware
server.use(cors());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(morgan('combined'));

// MongoDB config
const db = process.env.MONGODB_URI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(console.log('MongoDB succesfully connected'))
  .catch((err) => console.warn(err));

// Setup JWT Passports
server.use(passport.initialize());
Passport(passport);

// Routes
server.use('/api/auth', AuthRouter);
server.use('/api/users', passport.authenticate('jwt', { session: false }), UsersRouter);

// Global error handler
server.use((err, req, res, next) => handleError(err, res));

// Get Heroku port
const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server listening on port ${port}`));
