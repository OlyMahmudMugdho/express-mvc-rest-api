const posts = require("../models/posts.json");
const fs = require("fs");

let newPost;
const updatePost = (req, res) => {
    const entry = parseInt(req.params.id) - 1;
    if (entry < posts.length) {
        if (!req.body.title || !req.body.body) {
            return res.status(400).json(
                {
                    message: "Fields are empty"
                }
            )
        }
        else {
            posts[entry].title = req.body.title;
            posts[entry].body = req.body.body;
            newPost = {
                id: posts[entry].id,
                title: req.body.title,
                body: req.body.body
            }
            fs.writeFile("././models/posts.json", JSON.stringify(posts), (err) => {
                console.log(err)
            })
            return res.json(newPost);
        }
    }
    else {
        return res.status(400).json({
            message: "wrong entry"
        })
    }
}

module.exports = {
    updatePost
}