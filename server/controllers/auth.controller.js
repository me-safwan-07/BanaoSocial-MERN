import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

/** 
 * @route POST /api/auth/signup
*/
export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const errors = validationResult(req);

        // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password before storing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        user = new User({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ success: true, message: "User registered successfully", token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

/** 
 * @route POST /api/auth/signin
*/

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const errors = validationResult(req);

        // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if the user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        
        res.status(200).json({ success: true, message: "User signed in successfully", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/** 
 * @route POST /api/auth/forgot-password
*/
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }

        // check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Generate Password Reset Token
        const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "15m" });

        res.status(200).json({
            success: true,
            message: "Password reset token generated successfully!",
            resetToken,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/** 
 * @route POST /api/auth/reset-password
*/
export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        // Verify Reset Token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Update user password
        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            return res.status(400).json({ message: "User not found!" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.status(200).json({ success: true, message: "Password reset successfully!", user});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message});
    }
};