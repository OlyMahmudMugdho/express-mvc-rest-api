const express = require("express");
const AllPostsController = require("../ controllers/AllPostsController");
const CreatePostController = require("../ controllers/CreatePostController");
const SinglePostController = require("../ controllers/SinglePostController");
const UpdatePostController = require("../ controllers/UpdatePostController");
const DeletePostController = require("../ controllers/DeletePostController");
const router = express.Router();

router.route('/')
    .get(AllPostsController.getAllPost)
    .post(CreatePostController.createPost)

router.route('/:id')
    .get(SinglePostController.getSinglePost)
    .put(UpdatePostController.updatePost)
    .delete(DeletePostController.deletePost)
module.exports = router;