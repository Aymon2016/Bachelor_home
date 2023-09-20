



const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 1, // Minimum price should be 0 or greater
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500, // Maximum description length of 500 characters
    },

},
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;