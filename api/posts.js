const express = require("express");
const router = express.Router();
const AllPostsController = require("../controllers/AllPostsController");
const CreatePostController = require("../controllers/CreatePostController");
const SinglePostController = require("../controllers/SinglePostController");
const UpdatePostController = require("../controllers/UpdatePostController");
const DeletePostController = require("../controllers/DeletePostController");
const verifyRoles = require('../middleware/verifyRoles');
const rolesList = require('../configs/roles');


router.route('/')
    .get(AllPostsController.getAllPost)
    .post(verifyRoles(rolesList.Admin),CreatePostController.createPost)

router.route('/:id')
    .get(SinglePostController.getSinglePost)
    .put(verifyRoles(rolesList.Admin),UpdatePostController.updatePost)
    .delete(DeletePostController.deletePost)
module.exports = router;