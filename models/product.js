// models/product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    images: [
        {
            imageUrl: String,
        },
    ],
    price: String,
    trend: Boolean,
    new: Boolean,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
