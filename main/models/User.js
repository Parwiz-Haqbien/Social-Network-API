
const { Schema, model } = require('mongoose');
const moment = require('moment')

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
             virtual: true 
            },
             id: false,
        }
);

userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

const User = model ('user', userSchema);

module.exports = User
