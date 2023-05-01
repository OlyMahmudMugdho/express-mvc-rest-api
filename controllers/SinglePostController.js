const Posts = require('../models/Posts');


const getSinglePost = async (req, res) => {
    const id = await req.params.id;
    const post = await Posts.findOne({ _id: id });
    if (!post) {
        return res.status(404).json(
            {
                "error": "not found"
            }
        )
    }
    else {
        return res.status(201).json(
            {
                post
            }
        )
    }
}

module.exports = {
    getSinglePost
}