import { Router } from "express";
import { forgotPassword, resetPassword, signIn, signUp } from "../controllers/auth.controller.js";
import { check } from "express-validator";
const router = Router();

// Email and password Authentication
router.post("/signup", 
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Please include a valid email").isEmail(),
        check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 })
    ],
    signUp
);

router.post("/signin", 
    [
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password is required").exists()
    ],
    signIn
);

router.post(
    "/forgot-password", 
    [
        check("email", "Please include a valid email").isEmail()
    ],
    forgotPassword
);

router.post(
    "/reset-password", 
    [
        check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 })
    ],
    resetPassword
)


export default router;