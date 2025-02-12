import { Router } from "express";
import { createPost, getallposts } from "../controllers/post.controller.js";
import { verifyToken } from "../middleware/validator.middleware.js";

const router = Router();

router.post("/create", verifyToken, createPost);
router.get("/getposts", getallposts);
export default router;