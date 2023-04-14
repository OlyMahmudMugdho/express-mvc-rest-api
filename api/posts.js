const express = require("express");
const AllPostsController = require("../ controllers/AllPostsController");

const router = express.Router();

router.route('/')
    .get(AllPostsController.getAllPost)


module.exports = router;