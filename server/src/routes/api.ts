import { Router } from 'express';
import patientsRouter from './patients';

const baseRouter = Router();

baseRouter.use('/patient', patientsRouter);

export default baseRouter;
