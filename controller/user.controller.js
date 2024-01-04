const models = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Validator = require('fastest-validator');

const signUp = (req, res) => {
    models.User.findOne({ where: { email: req.body.email } }).then((result) => {
        if (result) {
            return res.status(409).json({
                message: "User Already Exists"
            });
        } else {
            bcryptjs.genSalt(10, (err, salt) => {
                bcryptjs.hash(req.body.Password, salt, (err, hash) => {
                    const user = {
                        firstName: req.body.firstName,
                        lastName : req.body.lastName,
                        email: req.body.email,
                        MobileNo: req.body.MobileNo,
                        Password: hash,
                    };
                    const schema = {
                        firstName: { type: "string", optional: false, max: 100 },
                        lastName: { type: "string", optional: false, max: 100 },
                        email: { type: "email", optional: false },
                        MobileNo: { type: "number", optional: false},
                        Password: { type: "string", optional: false},
                    };
                    const v = new Validator();
                    const validationResponse = v.validate(user, schema);
                    if (validationResponse !== true) {
                        return res.status(400).json({
                            message: "Validation failed",
                            errors: validationResponse
                        });
                    }
                    models.User.create(user).then(result => {
                        console.log("This is result" + result);
                        res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500'); // Set your frontend URL here
                        res.header('Access-Control-Allow-Methods', 'POST');
                        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
                        res.status(201).json({
                            message: "User Created Successfully"
                        });

                    }).catch(error => {
                        res.status(500).json({
                            message: "Something went wrong"
                        });
                    });
                });
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong"
        });
    });
};

const login = (req, res) => {
    models.User.findOne({ where: { email: req.body.email } }).then((user) => {
        if (!user) {
            res.status(409).json({
                message: "Invalid Credentials"
            });
        } else {
            bcryptjs.compare(req.body.Password, user.Password, (err, result) => {
                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                    }, process.env.JWT_KEY, (err, token) => {
                        res.status(200).json({
                            message: "Authentication Successful",
                            token: token
                        });
                    });
                } else {
                    res.status(409).json({
                        message: "Invalid Credentials"
                    });
                }
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something Went Wrong"
        });
    });
};

module.exports = {
    signUp: signUp,
    login: login
};
