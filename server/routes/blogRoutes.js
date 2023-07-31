import { Router } from 'express';
import { createPost, getAllBlogs, getSingleBlog, updateBlog } from "../controllers/blogController.js"
import VerifyToken from '../middleware/verifyToken.js';

const blogRouter = Router();


blogRouter.get("/", getAllBlogs); //http://localhost:3001/api/blog
blogRouter.get("/:id", getSingleBlog);
blogRouter.post("/createPost", VerifyToken, createPost);
blogRouter.put("/updateBlog/:id", VerifyToken, updateBlog);

export default blogRouter;