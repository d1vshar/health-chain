import { Router } from 'express';
import passport from 'passport';
import patientRouter from './patient';
import doctorRouter from './doctor';
import recordRouter from './record';
import authRouter from './auth';
import auditRouter from './auditEvents';

const baseRouter = Router();

baseRouter.use('/patient', passport.authenticate('jwt', { session: false }), patientRouter);
baseRouter.use('/doctor', passport.authenticate('jwt', { session: false }), doctorRouter);
baseRouter.use('/record', recordRouter);
baseRouter.use('/auth', authRouter);
baseRouter.use('/audit', auditRouter);

export default baseRouter;
