const express = require("express")
const userController = require("../controller/user.controller")
const checkAuthMiddleware = require("../middleware/check-auth")
const router = express.Router();

//Create a user
router.post("/sign-up",userController.signUpUser);

//Login user
router.post("/login",userController.loginUser);

// Get user by ID
router.get('/:id',checkAuthMiddleware.checkAuth,userController.getUserById);
            
// Update user details
router.put('/:id', checkAuthMiddleware.checkAuth ,userController.updateUser);

// Delete user
router.delete('/:id', checkAuthMiddleware.checkAuth ,userController.deleteUser);

// Change user password
router.put('/change-password/:id', checkAuthMiddleware.checkAuth ,userController.changePassword);

module.exports = router;