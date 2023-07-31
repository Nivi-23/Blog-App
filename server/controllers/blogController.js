import { ValidatorForCreateBlog } from "../middleware/validator.js";
import Post from "../models/post.js";
import User from "../models/user.js";


//Get all Blogs
export const getAllBlogs = async (req, res) => {
    try {
        const result = await Post.find();
        return res.status(200).json({ data: result })

    } catch (err) {
        return res.status(500).json({ err: err });
    }
}

//Create Blog
export const createPost = async (req, res) => {

    const { author, email } = req.body;

    //validation
    const error = await ValidatorForCreateBlog(req.body);
    if (error && Object.keys(error).length > 0) return res.status(400).json({ error: error })

    //check whether a user is authenticated or not
    const existingUser = await User.findOne({ email: email });
    // console.log(existingUser);
    if (existingUser && existingUser.userName != author) {
        return res.status(401).json({ error: 'You need to be authenticated' });
    }
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        return res.status(201).json({ message: "Blog successfully created", data: savedPost });
    } catch (err) {
        return res.status(500).json({ err: err });
    }
};

//Get singleBlog
export const getSingleBlog = async (req, res) => {
    let post;
    try {
        post = await Post.findById(req.params.id);
        // console.log(post);
        return res.status(200).json(post);
    } catch (err) {
        return res.status(500).json({ err: err });
    }

};

//Update a singleblog by id
export const updateBlog = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // console.log(post.userName,)
        if (post.author === req.body.author) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can update only your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}