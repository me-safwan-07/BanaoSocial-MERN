import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Post"
    }
}, {
    timestamps: true
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;