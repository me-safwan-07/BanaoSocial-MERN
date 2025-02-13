import { Router } from "express";
import postRouter from "./post.routes.js";
import authRouter from "./auth.routes.js";

const router = Router();

router.use("/post", postRouter);
router.use("/auth", authRouter);


export default router;
