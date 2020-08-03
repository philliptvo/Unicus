import { Strategy, ExtractJwt } from 'passport-jwt';

import User from '../models/user';
import { ErrorHandler } from '../middlewares/error';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

const Passport = (passport) => {
  passport.use(
    new Strategy(opts, async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.id);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        throw new ErrorHandler(401, 'Unauthorized');
      }
    })
  );
};

export default Passport;
