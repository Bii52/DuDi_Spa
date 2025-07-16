import { Router } from "express";

const router = Router();

import authRouter from "./auth";
import serviceRouter from "./service";

router.use("/auth", authRouter);
router.use("/service", serviceRouter);

export default router;