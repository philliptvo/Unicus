import { Strategy, ExtractJwt } from "passport-jwt";

import User from "../models/user";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

const Passport = (passport) => {
  passport.use(
    new Strategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};

export default Passport;
