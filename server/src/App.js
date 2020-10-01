import express from 'express';
import cors from 'cors';
import passport from 'passport';
import morgan from 'morgan';

import connectDB from './config/db';
import Passport from './config/passport';
import { handleError, ErrorHandler } from './middlewares/error';

import AdminRouter from './routes/admin';
import AuthRouter from './routes/auth';
import UsersRouter from './routes/users';
import FilesRouter from './routes/files';
import CollectionsRouter from './routes/collections';

const server = express();

// general middleware
server.use(cors());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(morgan('combined'));

// Connect to mongodb
connectDB();

// Setup JWT Passports
server.use(passport.initialize());
Passport(passport);

// Routes
server.use('/api/auth', AuthRouter);
server.use(
  '/api/admin',
  passport.authenticate('jwt', { session: false, failureRedirect: '/forbidden' }),
  AdminRouter
);
server.use(
  '/api/users',
  passport.authenticate('jwt', { session: false, failureRedirect: '/forbidden' }),
  UsersRouter
);
server.use(
  '/api/files',
  passport.authenticate('jwt', { session: false, failureRedirect: '/forbidden' }),
  FilesRouter
);
server.use(
  '/api/collections',
  passport.authenticate('jwt', { session: false, failureRedirect: '/forbidden' }),
  CollectionsRouter
);

// Global error handler
server.get('/forbidden', (req, res) => {
  throw new ErrorHandler(403, 'Forbidden');
});
server.use((req, res) => {
  throw new ErrorHandler(404, 'Resource not found');
});
server.use((err, req, res, next) => handleError(err, res));

// Get Heroku port
const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server listening on port ${port}`));
