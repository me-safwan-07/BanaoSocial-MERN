import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    about: {
        type: String,
        trim: true,
    },
    home: {
        type: String,
        trim: true,
    },
    tags: [
        {
            type: String,
            trim: true,
        }
    ]
});

const User = mongoose.model("User", userSchema);

export default User;