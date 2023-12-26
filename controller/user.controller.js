const models = require("../models")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Validator = require('fastest-validator')

const signUp = (req, res) => {
            models.User.findOne({ where: { email: req.body.email } } ).then((result) => {
                        if (result) {
                                    res.status(409).json({
                                                message: "User Already Exist"
                                    })
                        } else {
                                    bcryptjs.genSalt(10, (err, salt) => {
                                                bcryptjs.hash(req.body.password, salt, (err, hash) => {
                                                            const user = {
                                                                        name: req.body.name,
                                                                        email: req.body.email,
                                                                        password: hash
                                                            }
                                                            const schema = {
                                                                        name:{type:"string",optional:false,max:"100"},
                                                                        email:{type:"email",optional:false},
                                                                        password:{type:"string",optional:false}
                                                            }
                                                            const v = new Validator()
                                                            const validationResponse = v.validate(user, schema)
                                                            if(validationResponse !== true){
                                                                        return res.status(400).json({
                                                                                    message:"validate failed",
                                                                                    errors:validationResponse
                                                                        })
                                                            } 
                                                            models.User.create(user).then(result => {
                                                                        res.status(201).json({
                                                                                    message: "User Created Succesfully"
                                                                        })
                                                            })
                                                                        .catch(error => {
                                                                                    res.status(500).json({
                                                                                                message: "Something went wrong"
                                                                                    })
                                                                        })
                                                })
                                    })

                        }
            })  
}
const login = (req, res) => {
            models.User.findOne({ where: { email: req.body.email } }).then((user) => {
                        if (user === null) {
                                    res.status(409).json({
                                                message: "Invalid Credentials"
                                    })
                        }
                        else {
                                    bcryptjs.compare(req.body.password, user.password, (err, result) => {
                                                if (result) {
                                                            const token = jwt.sign({
                                                                        email: user.email,
                                                            }, process.env.JWT_KEY, (err, token) => {
                                                                        res.status(200).json({
                                                                                    message: "Authentication Sucessful",
                                                                                    token:token
                                                                        })
                                                            })
                                                }else{
                                                            res.status(409).json({
                                                                        message: "Invalid Credentials"
                                                            })
                                                }
                                    })
                        }
            }).catch(error=>{
                        res.status(500).json({
                                    message:"Something Went Wrong"
                        })
            })
}
module.exports = {
            signUp: signUp,
            login : login
}