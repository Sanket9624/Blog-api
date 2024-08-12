const crypto = require("crypto");
const models = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");  
const Validator = require('fastest-validator');

//For Create a New User
const signUpUser = async (req, res) => {
    try {
        const existingUser = await models.User.findOne({ where: { email: req.body.email } });

        if (existingUser) { 
            return res.status(409).json({
                message: "User Already Exists"
            }); 
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(req.body.Password, salt);

        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            MobileNo: req.body.MobileNo,
            Password: hashedPassword,
        };

        const schema = {
            firstName: { type: "string", optional: false, max: 100 },
            lastName: { type: "string", optional: false, max: 100 },
            email: { type: "email", optional: false },
            MobileNo: { type: "string", optional: false },
            Password: { type: "string", optional: false },
        };

        const v = new Validator();
        const validationResponse = v.validate(user, schema);

        if (validationResponse !== true) {
            return res.status(400).json({
                message: "Validation failed",
                errors: validationResponse
            });
        }

        const createdUser = await models.User.create(user);

        res.status(201).json({
            message: "User Created Successfully",
            user: createdUser // Return the created user if needed
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating user",
            error: error.message || "Something went wrong"
        });
    }
};

//TO login  User
const loginUser = async (req, res) => {
    try {
        const user = await models.User.findOne({ where: { email: req.body.email } });

        if (!user) {
            return res.status(409).json({
                message: "User Doesn't exist"
            });
        }

        bcryptjs.compare(req.body.Password, user.Password, (err, result) => {
            if (result) {
                const token = jwt.sign({
                    email: user.email,
                    userId : user.id
                }, process.env.JWT_KEY, (err, token) => {
                    res.status(200).json({
                        message: "Authentication Successful",
                        token: token
                    });
                });
            } else {
                res.status(409).json({
                    message: "Invalid Password"
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error: " + error.message
        });
    }
};

//get a user By id
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await models.User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            user: user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error: " + error.message,
        });
    }
};

//update a user
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            MobileNo: req.body.MobileNo,
        };

        const user = await models.User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const updatedUser = await user.update(updatedData);
        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error: " + error.message,
        });
    }
};

//function for delete the user 
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await models.User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        await user.destroy();

        res.status(200).json({
            message: "User deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong: " + error,
        });
    }
};

const changePassword = async (req, res) => {
    try {
        const userId = req.params.id;
        const { Password, newPassword, confirmPassword } = req.body;

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                message: "New password and confirm password do not match"
            });
        }

        const user = await models.User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const passwordMatch = await bcryptjs.compare(Password, user.Password);

        if (passwordMatch) {
            const salt = await bcryptjs.genSalt(10);
            const hash = await bcryptjs.hash(newPassword, salt);

            await user.update({ Password: hash });

            res.status(200).json({
                message: "Password changed successfully",
            });
        } else {
            res.status(409).json({
                message: "Current password is incorrect",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error: " + error,
        });
    }
};


module.exports = {
    signUpUser: signUpUser,
    loginUser: loginUser,
    changePassword: changePassword,
    getUserById: getUserById,
    updateUser: updateUser,
    deleteUser: deleteUser,
};
