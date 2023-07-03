const mongoose = require('mongoose')

var userSchema = mongoose.Schema(
    {
        schemas : {
            type:Array,
            default:["urn:ietf:params:scim:schemas:core:2.0:User"]
        },
        id :{
            type:String
        },
        userName: {
            type: String,
        },
        name: {
            formatted: String,
            familyName: String,
            givenName: String
        },
        meta: {
            resourceType:{
                type:String,
                default:"User"
            },
        },
            Resources: {
                type:Array,
        },

        // groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
    },
    { versionKey: false }
)


const User = mongoose.model('User', userSchema);

module.exports = User;