const mongoose = require('mongoose');
const Schema = new mongoose.Schema;

const postsSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model('Posts', postsSchema);