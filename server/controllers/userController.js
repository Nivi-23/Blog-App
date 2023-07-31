import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { ValidatorForSignUp, ValidatorForSignin } from "../middleware/validator.js";
import jwt from "jsonwebtoken";
const saltRounds = 10;

//signup method
export const signup = async (req, res, next) => {
    const { userName, email, password, confirmPassword, profilePic } = req.body;
    // console.log(req.body)
    //validation
    const error = await ValidatorForSignUp(req.body);
    if (error && Object.keys(error).length > 0) return res.status(400).json({ error: error })

    if (password !== confirmPassword) return res.status(400).json({ error: "Password does not match" })

    //if user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        return res.status(400).json({ error: 'That user already exisits!' });
    }

    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    let user;
    try {
        user = new User({ userName, email, password: hashedPassword, profilePic });
        await user.save();
    } catch (err) {
        return res.status(400).json({ error: err });
    }

    // if (!user) {
    //     return res.status(500).json({ message: "Unexpected Error Occured" });
    // }

    return res.status(201).json({ user, message: "Successfully created" });
};


//siginin method
export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    // console.log(req.body)
    const error = await ValidatorForSignin(req.body);
    if (error && Object.keys(error).length > 0) return res.status(400).json({ message: error.message });


    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return console.log(err);
    }
    if (!existingUser) {
        return res.status(400).json({ message: "No user found" });
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect Password" });
    }

    const token = jwt.sign({ email }, process.env.JWT_KEY, {
        expiresIn: "3h",
    });


    return res
        .status(200)
        .json(
            {
                auth: true, token: token,
                user: { id: existingUser._id, userName: existingUser.userName, email: existingUser.email, profilePic: existingUser.profilePic, date: existingUser.createdAt },
                message: "Login Successfull",
            });
};