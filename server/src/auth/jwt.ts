import jwt from 'jsonwebtoken';

export type AuthJwtPaylaod = {
  id: string,
  address: string
  role: string
};

export default (auth: AuthJwtPaylaod) => jwt.sign(
  auth,
  process.env.JWT_SECRET || 'test-secret',
  {
    expiresIn: '12h',
    issuer: 'health-chain',
    audience: 'health-chain',
  },
);
