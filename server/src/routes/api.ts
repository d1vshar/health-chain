import { Router } from "express";
import patientRouter from "./patient";
import doctorRouter from "./doctor";
import authRouter from "./auth";

const baseRouter = Router();

baseRouter.use("/patient", patientRouter);
baseRouter.use("/doctor", doctorRouter);
baseRouter.use("/user", authRouter);

export default baseRouter;
