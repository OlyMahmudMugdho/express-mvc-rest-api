const Posts = require('../models/Posts');

let newPosts;
const deletePost = async (req, res) => {
    const id = await req.params.id;
    if(!id){
        return res.status(403).json(
            {
                "error" : "ID is required"
            }
        )
    }

    const foundPost = await Posts.findOne({ _id : id });

    if(!foundPost){
        return res.status(404).json(
            {
                "error" : "post not found"
            }
        )
    }
    else{
        const result = await Posts.deleteOne({ _id : id });
        
        console.log(result);
        
        return res.status(201).json(
            {
                foundPost
            }
        )
    }

}

module.exports = {
    deletePost
}