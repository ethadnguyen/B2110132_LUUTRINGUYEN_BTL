const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        let foundUser = await User.findOne({
            email: req.body.email
        });
        if (!foundUser) {
            res.status(403).json({
                success: false,
                message: "Authentication failed, User not found"
            });
        }
        else {
            if (foundUser.comparePassword(req.body.password)) {
                let token = jwt.sign(foundUser.toJSON(), process.env.SECRET, {
                    expiresIn: 604800 //1 week
                });

                res.json({
                    success: true,
                    token: token
                });
            }
            else {
                res.status(401).json({
                    success: false,
                    message: "Authentication failed, wrong password!"
                });
            }
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const signup = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({
            success: false,
            message: "Please enter email or password",
        });
    }
    else {
        try {
            let newUser = new User();
            newUser.name = req.body.name;
            newUser.email = req.body.email;
            newUser.password = req.body.password;
            await newUser.save();
            let token = jwt.sign(newUser.toJSON(), process.env.SECRET, {
                expiresIn: 604800 // 1 week
            });

            res.json({
                success: true,
                token: token,
                message: "Successfully created a new user",
            });
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    }
};

const getUserProfile = async (req, res) => {
    try {
        let foundUser = await User.findOne({
            _id: req.decoded._id
        }).populate(
            "address"
        );
        if (foundUser) {
            res.json({
                success: true,
                user: foundUser,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        let foundUser = await User.findOne({
            _id: req.decoded._id
        });

        if (foundUser) {
            foundUser.name = req.body.name || foundUser.name;
            foundUser.email = req.body.email || foundUser.email;
            foundUser.password = req.body.password || foundUser.password;
            await foundUser.save();

            res.json({
                success: true,
                message: "Successfully updated the user profile"
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json({
            success: true,
            users: users
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    login,
    signup,
    getUserProfile,
    updateUserProfile,
    getAllUsers,
};