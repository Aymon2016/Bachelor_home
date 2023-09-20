
const mongoose = require('mongoose');
const { Schema } = mongoose;

const noticeSchema = new Schema({

    title: {
        type: String,
        trim: true,
    },
    body: {
        type: String,
        trim: true,
    },
},
    {
        timestamps: true,
    }

);

const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;

