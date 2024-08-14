const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    taxApplicability: {
        type: Boolean,
        default: function () {
            return this.category ? this.category.taxApplicability : false;
        },
    },
    tax: {
        type: Number,
        default: function () {
            return this.category ? this.category.tax : 0;
        },
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
});

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;
