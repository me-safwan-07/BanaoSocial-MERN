import Post from "../models/post.model.js";
import User from "../models/user.model.js";


/**
 * @route POST/ api/post/create
 */
export const createPost = async (req, res) => {
    try {
        const userId = req.userId;
        const { title, content } = req.body;

        // Check if user exists and has the required permissions to create a post.
        const userAvailable = await User.findById(userId);
        if (!userAvailable) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Validate the title and content
        if (!title || title.trim().length === 0) {
            return res.status(400).json({ success: false, message: "Title is required" });
        }
        if (!content || content.trim().length === 0) {
            return res.status(400).json({ success: false, message: "Content is required" });
        }

        // Create a new post and save it to the database.
        const post = new Post({
            ...req.body,
            owner: userId
        });
        await post.save();

        res.status(201).json({
            success: true,
            message: "Post created successfully",
            post
        });
    } catch (err) {
        console.error(err);
        // Return more specific error message
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the post",
            error: err.message || "Unknown error",
        });
    }
};

/**
 * @route GET/api/post/:postId
 */	
export const getallposts = async (req, res) => {
    try {
        const posts = await Post.find().populate("owner", ["name", "email"]);
        res.json({
            success: true,
            posts
        });
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "An error occurred while retrieving posts",
            error: err.message || "Unknown error",
        });
    }
}
