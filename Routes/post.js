const express  = require('express')
const postController = require('../controller/post.controller')
const checkAuthMiddleware =require('../middleware/check-auth')

const router = express.Router();

router.post("/",checkAuthMiddleware.checkAuth,postController.save)

router.get("/userId",checkAuthMiddleware.checkAuth,postController.showByUserId)

router.get("/:id",checkAuthMiddleware.checkAuth,postController.showById)

router.get("/",postController.showAll)

router.put("/:id",checkAuthMiddleware.checkAuth,postController.update)

router.delete("/:id",checkAuthMiddleware.checkAuth,postController.destroy)

module.exports = router