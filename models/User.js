const { Schema, model } = require('mongoose')

const userSchema = new Schema(
    {
        username: {
            type: String,
            isUnique: true,
            required: true,
            trimmed: true,
        },
        email: {
            type: String,
            required: true,
            isUnique: true,
            verifyIsEmail,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
)

const User = model('user', userSchema)

module.exports = User