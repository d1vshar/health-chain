import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import passport from 'passport';
import LoginService from '../services/AuthService';

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'test-secret',
  issuer: 'health-chain',
  audience: 'health-chain',
};

const jwtStrategy = new JwtStrategy(opts, (jwt, done) => {
  console.log(jwt);
  LoginService.getAuthByPublicAddress(jwt.address)
    .then((result) => {
      if (result.data) {
        done(null, {
          id: result.data.userId,
          address: result.data.publicAddress,
        });
      } else {
        done(null, false);
      }
    }).catch((error) => {
      done(error, false);
    });
});

passport.use(jwtStrategy);
