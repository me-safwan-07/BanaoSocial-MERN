import mongoose from "mongoose";

const interactionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ["like", "dislike"]
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Post"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
});

const Interaction = mongoose.model("Interaction", interactionSchema);

export default Interaction;