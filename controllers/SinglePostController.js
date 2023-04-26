const posts = require("../models/posts.json");


const getSinglePost = (req, res) => {
    const entry = parseInt(req.params.id) - 1;
    if (entry < posts.length) {
        res.json(posts[entry]);
    }
    else {
        return res.status(400).json({
            "message": "Wrong Entry"
        })
    }
}

module.exports = {
    getSinglePost
}