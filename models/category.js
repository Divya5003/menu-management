const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    taxApplicability: Boolean,
    tax: Number,
    taxType: String,
    subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }],
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
