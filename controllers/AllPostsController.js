const Posts = require('../models/Posts');

const getAllPost = async (req, res) => {
    const allposts = await Posts.find();
    return res.status(201).json(
        {
            allposts
        }
    );
}

module.exports = { getAllPost }