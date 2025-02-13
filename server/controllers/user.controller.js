import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import ForgotUser from "../models/forgotUser.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            ...req.body,
            password: hashedPassword,
        });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.status(200).json({
            success: true,
            message: "User created successfully",
            data: {
                user: newUser,
                token
            }
        })
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};

export const signIn = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (user.password === req.body.password) {
                return res.status(200).json({
                    success: true,
                    message: "User signed in successfully",
                    data: {
                        user,
                        token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" }),
                    }
                });
            }
            return res.status(400).json({message: "Invalid credentials"});
        } else {
            return res.status(400).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "User not found!" });
        } else {
            console.log("hello");
            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "10m" });
            await ForgotUser.deleteMany({ email: user.email });
            await ForgotUser.create({ email: user.email, token });
            const forgotUser = await ForgotUser.findOne({ email: user.email });
            console.log(forgotUser);
            res.status(200).json({
                success: true,
                message: "Reset token created successfully",
                data: {
                    name: user.name,
                    email: user.email,
                    token,
                }
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const verify = async (req, res) => {
    try {
        const token = req.query.token;
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: "Invalid or expired token" });
            }
            const forgotUser = ForgotUser.findOne({ email: decoded.email });
            if (!forgotUser) {
                return res.status(400).json({ message: "Invalid token" });
            } else {
                forgotUser.varified = true;
                res.status(200).json({
                    success: true,
                    message: "Token verified successfully"
                })
            }
        });
    } catch {
        res.status(500).json({ message: error.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const forgotUser = await ForgotUser.findOne({ email: req.body.email });
        let email;
        jwt.verify(forgotUser.token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: "Invalid or expired token" });
            }
            email = decoded.email;
        });
        const user = await User.findOne({ email: email });
        user.password = req.body.newPassword;
        await user.save();
        await ForgotUser.deleteOne({ email: req.body.email });
        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.log(error);
        console.log("jwt errrors")
        res.status(500).json({ message: error.message });
    }
};