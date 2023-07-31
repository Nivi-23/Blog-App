import { Router } from 'express';
import { signup, signin } from "../controllers/userController.js"

const userRouter = Router();

//route for signingup
userRouter.post("/signup", signup); //http://localhost:3001/api/user/signin
userRouter.post("/signin", signin);

export default userRouter;