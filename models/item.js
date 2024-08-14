const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    taxApplicability: {
        type: Boolean,
        default: function () {
            return this.category ? this.category.taxApplicability : this.subcategory ? this.subcategory.taxApplicability : false;
        },
    },
    tax: {
        type: Number,
        default: function () {
            return this.category ? this.category.tax : this.subcategory ? this.subcategory.tax : 0;
        },
    },
    baseAmount: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: false,
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: false,
    },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
