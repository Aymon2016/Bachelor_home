

const mongoose = require('mongoose');
const { Schema } = mongoose;

const mealSchema = new Schema({

    member_id: {
        type: Schema.Types.ObjectId,
        ref: 'Member',
    },
    date: {
        type: Date,

    },
    type: {
        type: String,
        enum: ['breakfast', 'lunch', 'dinner'],

    },
    price: {
        type: Number,

    },
    description: {
        type: String,
        trim: true,
        maxlength: 500,
    },

},
    {
        timestamps: true,
    }
);

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
