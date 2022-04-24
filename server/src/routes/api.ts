import { Router } from 'express';
import passport from 'passport';
import patientRouter from './patient';
import doctorRouter from './doctor';
import authRouter from './auth';

const baseRouter = Router();

baseRouter.use('/patient', passport.authenticate('jwt', { session: false }), patientRouter);
baseRouter.use('/doctor', passport.authenticate('jwt', { session: false }), doctorRouter);
baseRouter.use('/auth', authRouter);

export default baseRouter;
