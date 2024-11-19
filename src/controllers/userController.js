import User from "../models/user.js";
import catchAsync from "../utils/catchAsync.js";
import GlobalError from "../utils/GlobalError.js";

export const getAllUsers = catchAsync(async (req, res) => {
    const users = await User.find();

    if (!users) {
        return next(new GlobalError(404, "No users found!"));
    }

    res.status(200).json({
        status: "success",
        results: users.length,
        data: {
            users,
        },
    });
});

export const createUser = catchAsync(async (req, res) => {
    const { name, email, password, role} = req.body;
    console.log({user: req.body});
    
    const newUser = await User.create({
        name,
        email,
        password,
        role
    });

    if (!newUser) {
        return next(new GlobalError(400, "Invalid data provided!"));
    }

    // res.status(201).json({
    //     status: "success",
    //     data: {
    //         user: newUser,
    //     },
    // });

    res.status(201).redirect("/");

});

export const getUser = catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new GlobalError(404, "No user found with that ID!"));
    }

    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
});

export const updateUser = catchAsync(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!user) {
        return next(new GlobalError(404, "No user found with that ID!"));
    }

    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
});

export const deleteUser = catchAsync(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        return next(new GlobalError(404, "No user found with that ID!"));
    }

    res.status(204).json({
        status: "success",
        data: {
            user: null,
        }
    });
});

