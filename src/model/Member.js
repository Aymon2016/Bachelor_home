const { Schema, model } = require('mongoose');

const memberSchema = new Schema(
    {
        name: {
            type: String,
            maxLength: 50,
            minLength: 5,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['Member', 'Admin'],
            default: 'Member',
        },


    },
    {
        timestamps: true,
    }

);

const Member = model('Member', memberSchema);
module.exports = Member;