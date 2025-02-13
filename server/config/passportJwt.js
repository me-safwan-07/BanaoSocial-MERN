import passport from "passport";
import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}

passport.use(new Strategy(options, async (payload, done) => {
    try {
        const user = await User.findById(payload.id);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    } catch (error) {
        console.log("jwt error: " + error)
        console.log(error);
        return done(error, false);
    }
}));