const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        userName: {
            type: String,
        },
        email: {
            type: String,
        },
        address: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)


const User = mongoose.model('User', userSchema);

module.exports = User;