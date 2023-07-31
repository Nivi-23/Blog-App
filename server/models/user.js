import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
            required: true,
        },

    },

    { timestamps: true }
)

export default model("User", UserSchema);