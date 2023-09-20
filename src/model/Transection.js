
const mongoose = require('mongoose');
const { Schema } = mongoose;

const transectionSchema = new Schema({

    member_id: {
        type: Schema.Types.ObjectId,
        ref: 'Member',
    },
    deposit_amount: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
}
);

const Transection = mongoose.model('Transection', transectionSchema);

module.exports = Transection;
