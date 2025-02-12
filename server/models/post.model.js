import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 5000,
        trim: true,
    },
    tags: [
        {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 20,
            trim: true,
            validate: {
                validator: (value) => /^[a-zA-Z0-9, ]*$/.test(value),
                message: "Tags should only contain alphanumeric characters and commas."
            }
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    views: {
        type: Number,
        default: 0,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        }
    ],
}, {
    timestamps: true,
});

const Post = mongoose.model("Post", postSchema);

export default Post;