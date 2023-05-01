const Posts = require('../models/Posts');

let newPost;
const updatePost = async (req, res) => {
    const id = await req.params.id;
    if (!id) {
        return res.status(403).json(
            {
                "error": "ID is required"
            }
        )
    }
    else {
        const foundPost = await Posts.findOne({ _id: id });
        if (!foundPost) {
            return res.status(404).json(
                {
                    "error": "post not found"
                }
            )
        }
        else {
            if (req.body.title) {
                foundPost.title = await req.body.title;
            }

            if (req.body.body) {
                foundPost.body = await req.body.body;
            }

            const result = await foundPost.save();
            console.log(result);

            return res.status(201).json(
                {
                    foundPost
                }
            )
        }
    }
}

module.exports = {
    updatePost
}