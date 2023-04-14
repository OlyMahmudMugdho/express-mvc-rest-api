const allPosts = require("../models/posts.json");

const getAllPost = (req, res) => {
    res.json(allPosts);
}

module.exports = { getAllPost }