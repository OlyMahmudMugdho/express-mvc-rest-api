const express = require("express");
const router = express.Router();
const AllPostsController = require("../controllers/AllPostsController");
const CreatePostController = require("../controllers/CreatePostController");
const SinglePostController = require("../controllers/SinglePostController");
const UpdatePostController = require("../controllers/UpdatePostController");
const DeletePostController = require("../controllers/DeletePostController");



router.route('/')
    .get(AllPostsController.getAllPost)
    .post(CreatePostController.createPost)

router.route('/:id')
    .get(SinglePostController.getSinglePost)
    .put(UpdatePostController.updatePost)
    .delete(DeletePostController.deletePost)
module.exports = router;