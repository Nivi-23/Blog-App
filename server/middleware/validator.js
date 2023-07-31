export const ValidatorForSignUp = async (req) => {

    const { userName, email, password, profilePic } = req;
    const errors = {};
    if (!userName || userName.trim() === "") errors.userName = "User name is required";
    if (!email || email.trim() === "") errors.email = "Email is required";
    if (!password || password.length < 8) errors.password = "Password atleast should contain 8 characters";
    // if (!profilePic || profilePic.trim() === "") errors.profilePic = "Profile is required";
    return errors
};

export const ValidatorForSignin = async (req) => {

    const { email, password } = req;
    const errors = {};

    if (!email || email.trim() === "") errors.message = "Email is required";
    if (!password || password.length < 8) errors.message = "Password atleast should contain 8 characters";

    return errors
};

export const ValidatorForCreateBlog = async (req) => {

    const { title, image, description, author } = req;
    const errors = {};

    if (!title || title.trim() === "") errors.title = "Title is required";
    if (!image || image.trim() === "") errors.image = "Image required";
    if (!description || description.trim() === "") errors.description = "Description required";
    if (!author || author.trim() === "") errors.author = "Author required";

    return errors
};



