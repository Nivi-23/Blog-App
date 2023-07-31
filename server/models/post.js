import mongoose, { model, Schema } from "mongoose";
const PostSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
        author: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);


export default model("Post", PostSchema);