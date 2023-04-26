const posts = require("../models/posts.json");
const fs = require("fs");
const uuid = require("uuid");


let newPost, dbPost;
const createPost = (req, res) => {
    if (!req.body.title || !req.body.body) {
        return res.status(400).json(
            {
                "message": "Emplty Field"
            }
        )
    }

    newPost = {
        id: uuid.v4(),
        title: req.body.title,
        body: req.body.body
    }
    dbPost =
        [
            ...posts,
            newPost
        ]

    fs.writeFile('././models/posts.json', JSON.stringify(dbPost), (err) => {
        console.log(err)
    });
    res.json({
        newPost
    })

}

module.exports = {
    createPost
}