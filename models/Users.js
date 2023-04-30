const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        roles: {
            User: {
                type: Number,
                default: 3
            }
        },
        refreshToken: String
    }
)

module.exports = mongoose.model('Users',usersSchema);