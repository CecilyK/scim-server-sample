const mongoose = require('mongoose')

var userSchema = mongoose.Schema(
    {
        userName: {
            type: String,
        },
        externalId: {
            type: String,
        },
        name: {
            formatted: String,
            familyName: String,
            givenName: String
        },
        resourceType:{
            type:String,
            default:"User"
        },
        groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
    },
    {
        timestamps: true
    }
)


const User = mongoose.model('User', userSchema);

module.exports = User;