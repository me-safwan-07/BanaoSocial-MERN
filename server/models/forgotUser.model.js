import mongoose from "mongoose";

const forgotUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    }
});

const ForgotUser = mongoose.model("ForgotUser", forgotUserSchema);
export default ForgotUser;