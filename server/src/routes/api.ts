import { Router } from 'express';
import patientRouter from './patient';
import doctorRouter from './doctor';

const baseRouter = Router();

baseRouter.use('/patient', patientRouter);
baseRouter.use('/doctor', doctorRouter);

export default baseRouter;
