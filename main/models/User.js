
const { Schema, model } = require('mongoose');

const userSchema = new Schema (
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },

        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]

        },
         
        thoughts: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
            }
        ],

        friends: [
            {
            type: Schema.Types.ObjectId,
            ref: 'friends'
            }
        ],
    },
        {
            toJSON: {
             virtuals: true 
            },
             id: false,
        }
);

const User = model ('User', userSchema);

userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });


module.exports = User
