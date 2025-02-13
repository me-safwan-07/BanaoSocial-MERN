import mongoose from "mongoose";
import Comment from "./comment.model.js";
import Interaction from "./iteraction.model.js";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    tags: [
        {
            type: String,
            trim: true
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    interactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Interaction"
        }
    ]
}, {
    timestamps: true
});


const Post = mongoose.model("Post", postSchema);

export default Post;
