import { Router } from "express";
import { signIn, signUp, forgotPassword, verify, resetPassword } from "../../controllers/user.controller.js";

const router = Router();

router.post('/signin', signIn);
router.post('/signup', signUp);
router.post('/forgot-password', forgotPassword);
router.get('/verify', verify);
router.post('/reset-password', resetPassword);

export default router;
