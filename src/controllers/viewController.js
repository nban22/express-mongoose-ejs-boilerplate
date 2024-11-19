import User from "../models/user.js";
import catchAsync from "../utils/catchAsync.js";
import GlobalError from "../utils/GlobalError.js";

export const getHomePage = catchAsync(async (req, res, next) => {
    const users = await User.find();

    if (!users) {
        return next(new GlobalError(404, "No users found!"));
    }

    res.status(200).render("home", {
        users: users,
    });
});

export const getLoginPage = (req, res, next) => {
    res.status(200).render("login");
};

export const getSignupPage = (req, res, next) => {
    res.status(200).render("signup");
}

export const getCreateUserPage = (req, res, next) => { 
    res.status(200).render("create_user");
}
