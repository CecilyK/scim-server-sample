const mongoose = require('mongoose')
const User = require('./User')

const groupSchema = mongoose.Schema(
    {
        displayName: {
            type: String,
        },
        members: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
          }
    },
    {
        timestamps: true
    }
)


const Group = mongoose.model('Group', groupSchema);

module.exports = Group;