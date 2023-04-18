const posts = require('../models/posts.json');
const fs = require('fs');

let newPosts;
const deletePost = (req, res) => {
    const entry = parseInt(req.params.id) - 1;
    if (entry < posts.length) {
        posts.splice(entry, 1);
        fs.writeFile('././models/posts.json', JSON.stringify(posts), (err) => {
            console.log(err);
        })
        return res.json(posts);
    }
    else {
        return res.status(400).json({
            message: "wrong entry"
        })
    }
}

module.exports = {
    deletePost
}