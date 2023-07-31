import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";


//dotenv.config({path: "./vars/.env"});
dotenv.config();
const app = express();
const port = process.env.PORT;
connectDB();

//middlewares

app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter)

app.listen(port, () => {
    console.log(`Server is connected at ${port}`);
});