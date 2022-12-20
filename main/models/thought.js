const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema (
    {   
        reactId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId
        },

        reactionBody: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 280
        },

        username: {
            type: String,
            required: true,
        },

        createAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
         },
    },
    {
        toJSON: {
            getters: true
        },
    }
);

const thoughtSchema = new Schema (
    {   
        thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
        },

        createAt: {
           type: Date,
           default: Date.now,
           get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },

        username: {
            type: String,
            required: true,
            ref: 'User'
        },

        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtual: true,
            getters: true
        },
            id: false
    }
);

const Thought = model('Thought', thoughtSchema);

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

module.exports = Thought;