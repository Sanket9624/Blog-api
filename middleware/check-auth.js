const jwt = require('jsonwebtoken')

const checkAuth = (req,res,next) => {
            try{
                        const token = req.headers.authorization.split(" ")[1] 
                        //split method is used because the req.headers.authorization return "bearer token "so we want only token
                        const decodeToken = jwt.verify(token,process.env.JWT_KEY)
                        req.userData = decodeToken
                        next()

            }catch(error){
                         res.status(500).json({
                                    message:"Invalid or expire token",
                                    error:error
                        })
            }
}

module.exports = {
            checkAuth:checkAuth
}