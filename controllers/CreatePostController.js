const posts = require("../models/Posts");


const createPost = async (req, res) => {
    const { title, body } = await req.body;
    if (!title || !body) {
        return res.status(400).json(
            {
                "message": "Emplty Field"
            }
        )
    }

    const newPost = await posts.create(
        {
            title: title,
            body: body
        }
    );

    console.log(await newPost);

    return res.status(201).json({
        newPost
    })

}

module.exports = {
    createPost
}