import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Comment from "../models/comment.model.js";
import Interaction from "../models/iteraction.model.js";

export const createPost = async (req, res) => {
    try {
        console.log(req.body);
        const post = new Post(req.body);
        post.owner = req.user._id;
        const user = await User.findById(req.user._id);
        user.posts.push(post._id);
        await user.save();
        await post.save();
        res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: {
                post,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const fetchPosts = async (req, res) => {
    try {
        const myPosts = await Post.find({ owner: req.user._id })
            .populate("owner", "name email")
            .populate({
                path: "comments",
                populate: {
                    path: "owner",
                    select: "name email",
                },
            })
            .populate({
                path: "interactions",
            });
        const otherPosts = await Post.find({ owner: { $ne: req.user._id } })
            .populate("owner", "name email") // Populates the owner of the post
            .populate({
                path: "comments", // Populates the comments array
                populate: {
                    path: "owner", // Populates the owner field in each comment
                    select: "name email", // Specifies fields to include from the user who commented
                },
            })
            .populate({
                path: "interactions",
            });

        res.status(200).json({
            success: true,
            message: "Posts fetched successfully",
            data: {
                myPosts,
                otherPosts,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }
        await Comment.deleteMany({ _id: { $in: post.comments } });
        await Interaction.deleteMany({ _id: { $in: post.interactions } });
        await User.updateOne(
            { _id: req.user._id },
            { $pull: { posts: post._id } }
        );
        await Post.deleteOne({ _id: post._id });
        res.status(200).json({
            success: true,
            message: "Post deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }
        Object.keys(req.body).forEach((key) => {
            post[key] = req.body[key];
        });
        await post.save();
        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: {
                post,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const createComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }
        const comment = new Comment({
            ...req.body,
            owner: req.user._id,
            post: post._id,
        });
        await comment.save();
        post.comments.push(comment._id);
        await post.save();
        res.status(201).json({
            success: true,
            message: "Comment created successfully",
            // data: {
            //     comment,
            // },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const createInteraction = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }
        const interaction = await Interaction.findOne({
            owner: req.user._id,
            post: post._id,
        });
        if (interaction) {
            if (interaction.type === req.body.type) {
                await post.interactions.pull(interaction._id);
                await Interaction.deleteOne({ _id: interaction._id });
                if (req.body.type === "like") {
                    post.likes -= 1;
                    await post.save();
                }
                if (req.body.type === "dislike") {
                    post.dislikes -= 1;
                    await post.save();
                }

                return res.status(400).json({
                    success: false,
                    message: "Interaction already exists",
                });
            } else {
                if (req.body.type === "like") {
                    post.likes += 1;
                    post.dislikes -= 1;
                    await post.save();
                } else {
                    post.likes -= 1;
                    post.dislikes += 1;
                    await post.save();
                }
                interaction.type = req.body.type;
                await interaction.save();
                return res.status(201).json({
                    success: true,
                    message: "Interaction updated successfully",
                    // data: {
                    //     interaction,
                    // },
                });
            }
        }
        if(req.body.type === "like") {
            post.likes += 1;
        } else {
            post.dislikes += 1;
        }
        await post.save();
        const newInteraction = new Interaction({
            ...req.body,
            owner: req.user._id,
            post: post._id,
        });
        await newInteraction.save();
        post.interactions.push(newInteraction._id);
        await post.save();
        res.status(201).json({
            success: true,
            message: "Interaction created successfully",
            // data: {
            //     interaction,
            // },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
