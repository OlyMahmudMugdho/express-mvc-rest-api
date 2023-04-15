const express = require("express");
const AllPostsController = require("../ controllers/AllPostsController");
const CreatePostController = require("../ controllers/CreatePostController");
const SinglePostController = require("../ controllers/SinglePostController");
const router = express.Router();

router.route('/')
    .get(AllPostsController.getAllPost)
    .post(CreatePostController.createPost)

router.route('/:id')
    .get(SinglePostController.getSinglePost)

module.exports = router;