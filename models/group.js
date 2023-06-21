const mongoose = require('mongoose')
const User = require('./User')

const groupSchema = mongoose.Schema(
    {
        displayName: {
            type: String,
        },
        resourceType:{
            type:String,
            default:"Group"
        },
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    {
        timestamps: true
    }
)


const Group = mongoose.model('Group', groupSchema);

module.exports = Group;